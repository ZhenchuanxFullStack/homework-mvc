const should = require("should");
const util = require("util");
const fs = require("fs");
const path = require("path");

const mysql = require("mysql");
const sinon = require("sinon");
// 使用sinon.stub接管mysql.createPool函数
const stub = sinon.stub(mysql, "createPool");
// 另外创建一个匿名函数，取名为query
const query = sinon.stub();
// mysql.createPool因为被接管，后续无法使用到pool.query方法，因此把新创建的query函数传给stub
// 关于yields的使用方法，详见下边的测试用例
stub.returns({ query });
query.yields(null, 233);

const app = require("../index.js");
const request = require("supertest").agent(app);

const readFile = util.promisify(fs.readFile);

describe("HTTP", () => {
  after(function(done) {
    app.close();
    stub.restore();
    done();
  });
  it("should return home page", async () => {
    await request.get("/").expect(/<html.*/);
  });
  it("should return js file", async () => {
    var jsFile = await readFile(path.join(__dirname, "../static/app.js"));
    await request.get("/static/app.js").expect(jsFile.toString());
  });

  describe("API", async () => {
    describe("when not logged in", async () => {
      it("POST /api/todo should require to auth", async () => {
        var res = await request.post("/api/todo").send({
          todo: "一条新的todo"
        });
        should(res.statusCode).equal(401);
      });

      it("GET /api/todo should require to auth", async () => {
        var res = await request.get("/api/todo");
        should(res.statusCode).equal(401);
      });
    });

    describe("when logged in", async () => {
      it("should login and redirect to home page", async () => {
        var res = await request.post("/login").send({
          user: "eric",
          password: "asdfghjkl;"
        });
        // fake code
        should(res.statusCode).equal(302);
      });

      it("POST /api/todo should return success", async () => {
        // query为自定义的方法，在上边代码中，和pool.query关联，
        // 调用yields方法，实际上是调用mysql.js中pool.query的回调函数
        // pool.query("select * from user limit 1", function(err, results, fields) {})
        // null 对应上边的err, 1 对应results
        query.yields(null, 1);
        // 判断参数是否符合预期
        var res = await request
          .post("/api/todo")
          .send({
            todo: "一条新的todo"
          })
          .expect(/\d+/);
      });

      it("GET /api/todo should return all the data", async () => {
        var res = await request.get("/api/todo");
        should(res.body).be.Array();
      });

      it("GET /api/todo/id should return only one todo", async () => {
        query.yields(null, [{ name: "一条新的todo" }]);
        var res = await request.get("/api/todo/1").expect("一条新的todo");
      });

      it("GET /api/todo/id should return 404 if id not exists", async () => {
        query.yields(null, []);
        var res = await request.get("/api/todo/x");
        should(res.statusCode).equal(404);
      });
    });
  });
});
