//导入express模块
const express=require('express')
//导入路由对象
const router=express.Router()
const router_handler=require('../router_handler/article.js')

router.post('/add',router_handler.addArticle)
//向外共享路由对象
module.exports=router