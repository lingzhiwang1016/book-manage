const express = require('express');
const route = express.Router();
const db = require('../../model/db');
//引入学生表模型
var Student = db.Student;
//引入学生图书模型
var StudentBook = db.StudentBook;


//管理员主页面设置
route.get('/*',function(req,res,next){
	var uid = req.session.userId || null;
	if(!uid || uid != '1'){
		res.redirect('/user/');
	}else{
		next();
	}
})

route.get('/',function(req,res){
	Student.find({}).then(function(data){
		res.render('admin/list',{data: data})
	}).catch(function(err){
		console.log(err);
	})
});


//用户详情路由
route.get('/detail',function(req,res){
	var uid = req.query.uid;
	Student.findById(uid).then(function(data){
		StudentBook.find({sId: uid}).populate('bId').then(function(bData){
			res.render('admin/detail',{user:data, books: bData});
		}).catch(function(err){
			console.log(err);
		});
	}).catch(function(err2){
		console.log('外层错误信息: ' + err2)
	})
})



//路由模块导出
module.exports = route;