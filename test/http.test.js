const should = require('should')
const util = require('util')
const fs = require('fs')
const path = require('path')
const app = require('../index.js')
const request = require("supertest").agent(app);

const readFile = util.promisify(fs.readFile)

describe('HTTP', () => {
  after(function (done) {
    app.close();
    done();
  });
  it('should return home page', async () =>  {
    await request
      .get('/')
      .expect(/<html.*/)
  });
  it('should return js file', async () =>  {
    var jsFile = await readFile(path.join(__dirname, '../static/app.js'))
    await request
      .get('/static/app.js')
      .expect(jsFile.toString())
  })

  describe('API', async () => {
    describe('when not logged in', async () => {
      /*
      it('POST /api/todo should require to auth', async () => {
        var res = await request
          .post('/api/todo')
          .send({
            todo: "一条新的todo"
          })
        should(res.statusCode).equal(401)
      })

      it('GET /api/todo should require to auth', async () => {
        var res = await request.get('/api/todo')
        should(res.statusCode).equal(401)
      })
      */

    });

    describe('when logged in', async () => {
      it('should login and redirect to home page', async () => {
        var res = await request
          .post('/login')
          .send({
              user: 'eric',
              password: 'asdfghjkl;'
          })
        // fake code
        should(res.statusCode).equal(302)
      });

      it('POST /api/todo should return success', async () => {
        var res = await request
          .post('/api/todo')
          .send({
            todo: "一条新的todo"
          })
          .expect(/\d+/)
      })

      it('GET /api/todo should return all the data', async () => {
        var res = await request
          .get('/api/todo')
        should(res.body).be.Array();
      })

      it('GET /api/todo/id should return only one todo', async () => {
        var res = await request
          .get('/api/todo/1')
          .expect('一条新的todo')
      })

      it('GET /api/todo/id should return 404 if id not exists', async () => {
        var res = await request
          .get('/api/todo/x')
        should(res.statusCode).equal(404)
      })
    })
  })
})
