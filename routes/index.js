var express = require('express');
var router = express.Router();

var Movie = require('../models/Movie');// 引入模型

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/movieDetail', function(req, res) {
  Movie.find({ //查找
    id: req.query.id
    },(err, data)=>{
        if(err){
            res.send('server or db error');
        }else{
            console.log('查询成功：'+ data);
            if(data.length==0){
                res.send({status: 200, result:data, message: '无数据'});
            }else{
                res.send({
                  status: 200,
                  result: data,
                  message: ''
                });
            }
        }
    });
});

router.get('/movieList', function(req, res) {
    var pageNum = req.query.pageNum || 1
	var pageSize = parseInt(req.query.pageSize) || 10
  Movie.paginate({
    },{page: pageNum, limit: pageSize}, function(err, data){
        if(err){
            res.send('server or db error');
        }else{
            console.log('查询成功：'+ data);
            if(data.length==0){
                res.send({status: 200, result:data, message: '无数据'});
            }else{
                res.send({
                  status: 200,
                  pageNum: parseInt(data.page),
                  pageSize: data.limit,
                  total: data.total,
                  pages: data.pages,
                  result: data.docs,
                  message: '查询成功'
                });
            }
        }
    });
});

router.get('/movieHot', function(req, res) {
  Movie.find({
    hot: true
  }).limit(6).then((data, err)=>{
        if(err){
          console.log(err)
            res.send('server or db error');
        }else{
            console.log('查询成功：'+ data);
            if(res.length==0){
                res.send({status: 200, result:res, message: '无数据'});
            }else{
                res.send({
                  status: 200,
                  result: data,
                  message: ''
                });
            }
        }
    });
});


module.exports = router;
