# 转变 MySQL 存储

## 创建 test table 

```
 CREATE TABLE IF NOT EXISTS `todo_tbl`(
        `todo_id` INT UNSIGNED AUTO_INCREMENT,
        `todo` VARCHAR(256) NOT NULL,
        PRIMARY KEY ( `todo_id` )
     )ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

## 结果

![result.png](./result.png)