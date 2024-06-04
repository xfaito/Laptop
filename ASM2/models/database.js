var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laptop',
    multipleStatements: true
});
db.connect(function(err)
{
    if(err){
        console.log('Ko kết nối CSDL ' + err);
        db.end();
    }else{
        console.log('Kết nối CSDL thành công');
    }
})
module.exports = db