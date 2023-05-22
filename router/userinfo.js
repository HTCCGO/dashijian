//初始化路由函数
const express = require('express')
//导入验证数据合法性的中间件
const expressJoi=require('@escook/express-joi')
const joi=require('@hapi/joi')
//导入需要的验证规则对象
const {up_data_user_schema}=require('../schema/user.js')
const {up_data_pwd_schema}=require('../schema/user.js')
const db=require('../db/index.js')

//创建路由对象
const path=require('path')
const router = express.Router()
const main='C:/Users/HP/Desktop/dashijian'

//导入用户处理函数模块
const userinfoHandler=require(path.join(main,'/router_handler/userinfo.js'))

//获取用户的基本信息
router.get('/userinfo',userinfoHandler.getUserInfo)
//在此处调用所需的中间件
router.post('/userinfo',expressJoi(up_data_user_schema),userinfoHandler.upDataUser)
router.post('/updata/pwd',expressJoi(up_data_pwd_schema),userinfoHandler.upDataPassword)
router.post('/updata/avatar',expressJoi(),userinfoHandler.upDataAvatar)
//向外共享路由函数
module.exports=router