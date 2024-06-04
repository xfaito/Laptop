var db = require('../models/database');
var express = require('express');
var router = express.Router();

//san pham moi
router.get('/spmoi/:sosp', function(req, res) {
  if (isNaN(req.params.sosp) == true){
    res.json({'thongbao':'Sai du lieu'});
    return;
  }
  let sosp = req.params.sosp;
  if (sosp<=0) sosp=10;
  let  sql = `SELECT id, ten, gia, gia_km, hinh, xem FROM san_pham 
  WHERE an_hien=1 ORDER BY ngay desc limit 0,${sosp}`;
db.query(sql,(err, data) => {
  if(err) res.json(err);
  else res.json(data);
});
})

//san pham xem nhieu
router.get('/spxemnhieu/:sosp', function(req, res) {
  if (isNaN(req.params.sosp) == true){
    res.json({'thongbao':'Sai du lieu'});
    return;
  }
  let sosp = req.params.sosp;
  if (sosp<=0) sosp=10;
  let  sql = `SELECT id, ten, gia, gia_km, hinh, xem FROM san_pham 
  WHERE an_hien=1 ORDER BY xem desc limit 0,${sosp}`;
db.query(sql,(err, data) => {
  if(err) res.json(err);
  else res.json(data);
});
})

//san pham hot
router.get('/sphot/:sosp', function(req, res) {
  if (isNaN(req.params.sosp) == true){
    res.json({'thongbao':'Sai du lieu'});
    return;
  }
  let sosp = req.params.sosp;
  if (sosp<=0) sosp=10;
  let  sql = `SELECT id, ten, gia, gia_km, hinh, xem FROM san_pham 
  WHERE an_hien=1 AND hot=1 ORDER BY ngay desc limit 0,${sosp}`;
db.query(sql,(err, data) => {
  if(err) res.json(err);
  else res.json(data);
});
})

// chi tiet san pham
router.get('/sp/:id', function(req, res) {
  let  id = req.params.id;
  let  sql = `
  SELECT id, id_nhasx, ten, gia,gia_km, hinh, ngay, hot, an_hien, tinh_chat,mau_sac, can_nang 
  FROM san_pham WHERE id = ${id};
  SELECT id_sp, ram, cpu, dia, man_hinh, thong_tin_pin, cong_nghe_man_hinh, cong_ket_noi
  FROM thuoc_tinh WHERE id_sp = ${id};
  `;
  db.query(sql, function(err, arr) {
    if (err) throw err;
    let sp = arr[0][0];
    let tt = arr[1][0];
    let obj = Object.assign(sp, tt);
    res.json(obj)
  })
});

// san pham theo nha san xuat
router.get('/sp_nhasx/:id', function(req, res) {
  let id = req.params.id;
  let sql = `
  SELECT * FROM san_pham WHERE an_hien = 1 AND id_nhasx = ${id} ORDER BY ngay desc
  `;
  db.query(sql, function(err, data) {
    if(err) throw err;
    res.json(data);
  })
})

// danh sach nha san xuat
router.get ('/list_nhasx', function(req, res) {
  let sql = `SELECT * FROM nha_sx WHERE an_hien=1 ORDER BY thu_tu asc`;
  db.query(sql, function(err, data) {
    if(err) throw err;
    res.json(data);
  })
})
module.exports = router;
