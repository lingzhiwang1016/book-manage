//引入express框架
const express = require('express');
const route = express.Router();

const db = require('../../model/db');
//获取图书模型
var Book = db.Book;
//获取学生图书模型
var StudentBook = db.StudentBook;


//图书借阅路由设置(写在/:page?上方是为了避免路由冲突,还有一个方法是,直接给此路由加一级路由,如/book/borrow)
route.get('/borrow',function(req,res){
	//获取当前用户的id
//	console.log(req.query) 

	var uid = req.session.userId;
	var bid = req.query.bookId;
	//获取当前时间
	var now = Date.now();
	//查询条件
	var filter = {sId: uid, bId:bid};
	//更新内容
	var update = {sId: uid, bId:bid, borrowDate: now};
	StudentBook.findOneAndUpdate(filter,update,{upsert:true}).then(function(data){
		if(data){
			res.json({status: 400, msg: '你已借过此书'})
		}else{
			res.json({status: 200, msg: '借阅成功,请注意查收'})
		}
	}).catch(function(err){
		console.log(err);
	})
})


//用户中心路由
route.get('/info',function(req,res){
	//获取用户ID
	var uid = req.session.userId;
	//populate表关联操作   sort方法用来排序(默认从小到大),负号使其从大到小排序,
	StudentBook.find({sId: uid}).populate('bId').sort('-borrowDate').then(function(data){
		console.log(data+"我的");
		res.render('user/person',{data:data, userId: uid});
	}).catch(function(err){
		console.log(err);
	})
})


//取消借阅路由设置
route.get('/cancel',function(req,res){
	var uid = req.session.userId;
	//query 问号传参方式的参数值
	var bid = req.query.bid;
	StudentBook.findOneAndRemove({sId: uid, bId: bid}).then(function(data){
		if(data){
			res.json({status: '200'});
		}else{
			res.json({status: '400'})
		}
	}).catch(function(err){
		console.log(err);
	})
})

//主页展示路由
route.get('/:page?',function(req,res){
	var currentPage = 1;
	//获取当前的页码数
	if(req.params.page){
		//*1是将其转为number类型
		currentPage = req.params.page*1;
	}
	
	var uid = null;
	//判断用户是否登录
	if(req.session.userId){
		uid = req.session.userId;
	}
	Book.count({}).then(function(total){
		var totalPage = Math.ceil(total/12);
		Book.find({}).limit(12).skip((currentPage-1)*12).then(function(data){
			res.render('user/index',{userId: uid, books: data, cPage: currentPage, totalPage: totalPage});
		}).catch(function(err){
			console.log(err);
		})
	})
});


//路由模块导出
module.exports = route;


