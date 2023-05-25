const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()
exports.add_cate_schema = {
    body: {
        name, alias
    }
}
exports.delete_cate_Byid_schema = {
    params: {
        id
    }
}

exports.get_cates_Byid_schema={
    params:{
        id
    }
}

exports.updata_cate_Byid_schema={
    body:{
        Id:id,
        name,
        alias,
    }
}