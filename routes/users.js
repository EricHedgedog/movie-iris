var express = require('express');
var router = express.Router();
var token = require('../common/token.js');

var User = require('../models/User');// 引入模型

/* users auth. */
router.post('/auth', function(req, res, next) {
  User.find({
    username: req.body.username
  },(err, data)=>{
    if(err){
        res.send('server or db error');
    }else{
       console.log(req.body)
        if (!req.body.username || !req.body.password){
          res.json({ status: 200, message: '认证失败，用户名和密码不能为空' });
        } else if(data.length === 0){
            res.json({ status: 200, message: '认证失败，用户名找不到' });
        }else{
           console.log(data)
            if (data[0].password != req.body.password)  {
              res.json({ status: 200, message: '认证失败，密码错误' });
            } else {
                var tokenData = token.createToken(data[0]);
                res.json({
                  status: 200,
                  result: {
                    isAdmin: data[0].isadmin,
                    token: tokenData
                  },
                  message: '用户登录成功'
                });
            }
        }
    }
});
})

module.exports = router;
