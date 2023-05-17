const express = require('express')
//创建路由对象
const path=require('path')
const router = express.Router()
const main='C:/Users/HP/Desktop/dashijian'

//导入用户处理函数模块
const userHandler=require(path.join(main,'/router_handler/user.js'))
//注册新用户
router.post('/regUser', userHandler.regUser)
router.post('/login',userHandler.login)

//将路由对象共享出去
module.exports = router