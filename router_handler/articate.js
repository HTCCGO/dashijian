const { result } = require('@hapi/joi/lib/base.js')
const db = require('../db/index.js')
//导入对应的文章模块

//作用是返回对应的文章内容
exports.getArticleCates = (req, res) => {
    const mysqlStr = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(mysqlStr, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: results,
        })
    })
}

//查询分类名称和分类别名是否已经被占用了
exports.addArticleCate = (req, res) => {
    //查找名字或者是别名
    const mysqlStr = 'select * from ev_article_cate where name=? or alias=?'
    db.query(mysqlStr, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)

        if (results.length === 2) res.cc('分类名称与别名已经被占用')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名已经被占用')

        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用')

        //插入名字或者是别名
        const sqlStr = 'insert into ev_article_cate set ?'
        db.query(sqlStr, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
        })
        res.send({
            status: 0,
            message: '分类名称和分类别名都没有被占用',
            data: results[0]
        })
    })
}

//根据ID删除对应的文章分类
exports.deleteCateByid = (req, res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?'

    //第二个参数的params的值为在router中的;id,它可以动态的确定相对应的值
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败')
        res.cc('删除文章分类成功！', 0)
    })
}

//开发根据id获取文章分类的接口
exports.getArtCateByid = (req, res) => {
    const mysqlStr = 'select * from ev_article_cate where id=?'
    db.query(mysqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类失败')
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results[0]
        })
    })
}

//根据id更新文章分类数据
exports.updataCate = (req, res) => {
    //查询name和alias是否被占用,排除ID及<>的作用
    const mysqlStr = 'select * from ev_article_cate where Id<>? and (name=? or alias=?)'
    db.query(mysqlStr, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)

        if (results.length === 2) res.cc('名称和别名都被占用')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('名称和别名都被占用')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('别名被占用')

        //更新文章分类表
        const sqlStr = 'update ev_article_cate set ? where id=?'
        db.query(sqlStr, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('更新时出现错误')
            res.send({
                status: 0,
                message: '更新文章分类表成功',
            })
        })
    })
}

