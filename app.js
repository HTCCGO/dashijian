//导入express模块
const express=require('express');
//创建一个express服务器实例
const app=express();

///配置cors中间件
const cors=require('cors');
//将cors注册为中间件
app.use(cors());

//配置解析表单数据的中间件 ，注，这种格式的只能解析其中一种中间件
app.use(express.urlencoded({extended:false}))
//使用用户路由模块

//调用用户路由模块
const userRouter=require('./router/user')
app.use('/api',userRouter)

//启动web服务器
app.listen(3007,()=>{
console.log('http://127.0.0.1:3007');
})