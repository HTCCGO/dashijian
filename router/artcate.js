const express=require('express')
const joi=require('@escook/express-joi')
const {
    add_cate_schema,
    delete_cate_Byid_schema,
    get_cates_Byid_schema,
    updata_cate_Byid_schema,
}=require('../schema/articate.js')
//创建路由对象
const router=express.Router()
const router_Handler=require('../router_handler/articate.js')
router.get('/cate',router_Handler.getArticleCates)
router.post('/addcates',joi(add_cate_schema),router_Handler.addArticleCate)
router.get('/deletecate/:id',joi(delete_cate_Byid_schema),router_Handler.deleteCateByid)
router.get('/cates/:id',joi(get_cates_Byid_schema),router_Handler.getArtCateByid)
router.post('/updatacate',joi(updata_cate_Byid_schema),router_Handler.updataCate)
//向外共享路由对象
module.exports=router