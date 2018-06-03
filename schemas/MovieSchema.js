var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var movieSchema = new Schema({
    id: Number,
    name: String,
    introduce: String,
    detail: String,
    watchable: Boolean,
    hot:Boolean
});
module.exports = movieSchema;