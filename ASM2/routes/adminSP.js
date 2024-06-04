var db = require('../models/database');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
 let limit =``;
 //http://localhost:3000/admin/sp?_limit=10
 if (req.query._limit!=undefined && isNaN(req.query._limit)==flase){
     let sosp = Number(req.query._limit);
     if (sosp<=0) sosp=10;
     limit = ` limit 0,${sosp}`;
     
 }
 let sort =``;
 //http://localhost:3000/admin/sp?_sort=(ngay,xem,...)
 if (req.query._sort!=undefined){
    let str  = req.query._sort;
    sort = ` ORDER BY ${str} asc`;
 }

let sql = `
 SELECT id, ten, gia,gia_km, hinh, ngay, hot, an_hien, tinh_chat,mau_sac, can_nang
 FROM san_pham ${sort} ${limit}`;
 db.query(sql, function(err, arr) {
     if(err) throw err;
     else res.json(arr);
 })

})

router.get('/:id', function(req, res) {
    let id =req.params.id;
    if (isNaN(id) == true){
        res.json({'thongbao':'Sản phẩm ${id} không tìm thấy'});
        return;
    }
    let sql = `SELECT id, id_nhasx, ten,gia,gia_km, hinh, date_format(ngay,'%d-%m-%Y') as ngay, hot, an_hien, tinh_chat,mau_sac, can_nang
    FROM san_pham WHERE id = ?`;
    db.query(sql, [id], function(err, arr) {
        if(err) throw err;
        else if (arr.length==0) res.json({'thongbao':'Sản phẩm ${id} không tìm thấy'}); 
        else res.json(arr[0]);
    })
})

router.post(`/`, function(req, res) {
    let sql ='INSERT INTO san_pham SET ?';
    let data= req.body;
    db.query(sql, data, function(err, data) {
        if (err) throw err;
        else res.json({"thongbao":"Đã chèn xong sản phẩm"});
    })
})

router.put(`/:id`, function(req, res) {
    let id = req.params.id;
    if (isNaN(id)==true){
        res.json({'thongbao':'Sản phẩm ${id} không tìm thấy'});
        return;
    }
    let data =req.body;
    let sql = `UPDATE san_pham SET ? WHERE id = ?`;
    db.query(sql, [data, id], function(err, data) {
        if(err) throw err;
        else res.json({"thongbao":"Đã cập nhật xong sản phẩm"});
    })
})

router.delete(`/:id`, function(req, res) {
    let id = req.params.id;
    if (isNaN(id)==true){
        res.json({'thongbao':'Sản phẩm ${id} không tìm thểa'});
        return;
    }
    let sql = `DELETE FROM san_pham WHERE id = ?`;
    db.query(sql, [id], function(err, data) {
        if(err) throw err;
        else res.json({"thongbao":"Đã xóa sản phẩm"});
    })
})

module.exports = router