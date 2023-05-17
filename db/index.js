const mysql=require('mysql')

//创建数据库连接对象
const db=mysql.createPool({
    host:'127.0.0.1',//数据库网络地址
    user:'root',//用户名
    password:'Meet1234',//用户密码
    database:'new_1',//数据库的名字
})

//向外传输db数据库连接对象
module.exports=db;