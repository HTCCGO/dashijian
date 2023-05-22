//获取用户信息的基本函数



//导入path模块，以保证能够使用db模块
const path = require('path')
const main = 'C:/Users/HP/Desktop/dashijian'

//导人db中的index.js
const db = require(path.join(main, 'db/index.js'))
//mysql语句，为了能够使用mysql
const jwt = require('jsonwebtoken')
const config = require(path.join(main, 'config.js'))
//向外扩展对应的函数，目的地址是router/userinfo
exports.getUserInfo = (req, res) => {
  const mysqlStr = ' select id,username,nickname,email,user_pic  from ev_user where id=?'
  //在这之上的user属性，是在解析完token之后，由express-jwt对req进行挂载所得到的
  db.query(mysqlStr, req.user.id, (err, results) => {
    //当执行操作语句失败时,返回错误消息
    if (err) return res.cc(err)
    //当返回的结果不等于1时，说明在执行mysql语句时出现了错误，返回错误消息
    if (results.length !== 1) return res.send('数据库操作出现错误')
    //向客户端返回对应的信息
    res.send({
      status: 0,
      message: '获取用户的信息成功',
      data: results[0],
    })
  })
}

exports.upDataUser = (req, res) => {
  const mysqlStr = 'updata ev_user set ? where id=?'
  db.query(mysqlStr, [req.body, req.body.id], (err, results => {
    if (err) return res.cc;
    if (results.affectedRows !== 1) return res.cc('修改用户的基本信息失败')
    return res.send('修改用户的基本信息成功', 0)
  }))
}

exports.upDataPassword = (req, res) => {
      const mysqlStr='select * from ev_user where id=?'
      ///在进行初始化的时候user。id已经被挂载完成
      db.query(mysqlStr,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length!==1) return res.cc('用户不存在')
        
      })
}

exports.upDataAvatar=(req,res)=>{

}