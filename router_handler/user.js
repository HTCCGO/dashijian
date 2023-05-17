//这里定义和用户相关的路由处理函数，方便route/user.js来调用

//导入bcryptjs模块，以保证能对其中的模块进行加密
const bcryptjs = require('bcryptjs')
//导入path模块，以保证能够使用db模块
const path = require('path')
const main = 'C:/Users/HP/Desktop/dashijian'

//导人db中的index.js
const db = require(path.join(main, 'db/index.js'))
//mysql语句，为了能够使用mysql
const sql = 'select * from ev_user where username=?'


//用于处理用户注册的处理函数
exports.regUser = (req, res) => {

    const userinfo = req.body;
    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            message: '用户名或者密码不能为空'
        })
    }
    //对数据库内信息进行比较
    db.query(sql, [userinfo.username], (err, result) => {
        //当结果错误时，返回错误信息
        if (err) {
            return res.send({ status: 1, messagee: err.message })
        }

        //判断用户名是否被占用，如果被占用的话，结果的长度为0
        if (result.length > 0) {
            return res.send({ status: 1, message: '用户名被占用' })
        }
    })

    //利用bcrypt中的hashSync方法来对原文密码进行加密，格式如下
    //hashSync(明文密码，随机盐的长度)
    userinfo.username = bcryptjs.hashSync(userinfo.username, 10)
    //添加用户的信息的mysql语句
    const addUserSqlStr = 'insert into ev_user set ?'
    db.query(addUserSqlStr, { username: userinfo.username, password: userinfo.password }, (err, result) => {
        //注册时发生错误
        if (err) {
            return res.send('注册出现错误。' + { status: 1, message: err.message })
        }
        //当在执行sql语句时，影响的行数大于1
        if (result.affectedRows !== 1) {
                return res.send({ status: 1, message: '注册时出现错误' })
        }
        res.send({status:0,message:'注册成功'})
    })
}

//登录的处理函数
exports.login = (req, res) => {
    res.send('login OK')
}
