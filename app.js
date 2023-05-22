//导入express模块
const express = require('express');
//创建一个express服务器实例
const app = express();

///配置cors中间件
const cors = require('cors');
const express_jwt = require('express-jwt')
const config = require('../dashijian/config')
//将cors注册为中间件
app.use(cors());
app.use(express_jwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))
//定义错误级别的中间件

//配置解析表单数据的中间件 ，注，这种格式的只能解析其中一种中间件
app.use(express.urlencoded({ extended: false }))
//使用用户路由模块

//全局中间件，函数的封装
app.use((req, res, next) => {
    //设置status的值为错误（默认），以方便在这之后调用这个函数
    res.cc = (err, status = 1) => {
        res.send({
            status,
            //对状态进行描述，判断err是错误对象或者是字符串
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
app.use((err, req, res, next) => {
  //  if(err instanceof expressJoi.ValidationError) return res.cc(err)
    //验证失败的错误时
    if (err.name === 'unauthorizeError') return res.cc('身份认证失败')
})
//调用用户路由模块
const userRouter = require('./router/user.js')
const userinfoRouter=require('./router/userinfo.js')
app.use('/api', userRouter)
app.use('/my',userinfoRouter)

//启动web服务器
app.listen(3007, () => {
    console.log('http://127.0.0.1:3007');
})