var mysql=require('mysql');
var connection=mysql.createPool({

host:'137.59.106.65',
user:'levantuy',
password:'fgma@231',
database:'noticer'
//Server=137.59.106.65;Database=noticer;Uid=levantuy;Pwd=fgma@231;sslmode=None;Charset=utf8;

});
module.exports=connection;