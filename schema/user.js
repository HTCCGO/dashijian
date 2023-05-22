//用于验证规则的函数

//导入定义验证规则的包
const joi = require('joi')

//定义用户和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi
.string()
.pattern(/^[\S] {6,12}$/)
.required()

//定义id,nickname,email的验证规则
const user_id = joi.number().integer().min(1).required()
const user_nickname = joi.string().required()
const user_email = joi.string().email().required()

//验证规则对象-更新用户的基本信息
exports.up_data_user_schema = {
    body: {
            id:user_id,
            nickname:user_nickname,
            email:user_email,
    }
}

//验证规则对象-重置密码
exports.up_data_pwd_schema={
    body:{
        oldpwd: password,
        newpwd: joi.not(joi.ref('oldpwd')).concat(password),
    }
}