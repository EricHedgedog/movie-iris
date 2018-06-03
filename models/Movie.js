var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var MovieSchema = require('../schemas/MovieSchema');
MovieSchema.plugin(mongoosePaginate)
//创建model，这个地方的moviedetail对应mongodb数据库中moviedetail的conllection。
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var Movie = mongoose.model('moviedetail',MovieSchema);
module.exports = Movie;