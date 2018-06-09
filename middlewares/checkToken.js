var token = require('../common/token.js');

module.exports = function(req, res, next) {
    console.log('检查post的信息或者url查询参数或者头信息');
    //检查post的信息或者url查询参数或者头信息
    var usertoken = req.body.token || req.query.token || req.headers['x-access-token'];
    // 解析 token
    if (usertoken) {
      // 确认token
      var checkToken = token.checkToken(usertoken);
      console.log(checkToken);
        if (checkToken) {
            // console.dir(req.api_user);
            next();
        } else {
            return res.json({ status: 200, message: 'token信息错误.' });
        }
    } else {
      // 如果没有token，则返回错误
      return res.send({
          statuse: 401,
          message: '没有提供token！'
      });
    }
  };
  