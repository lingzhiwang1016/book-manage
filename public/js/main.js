//给引入模块写别名
requirejs.config({
	paths:{
		//直接引用网上文件时,也要注意不要加后缀名js,系统会自动加上(不能大写,网上引用的,大写改为小写)
		jquery: 'https://cdn.bootcss.com/jquery/3.1.1/jquery.min',
		datepicker:'../plugin/datepicker/foundation-datepicker',
		validate: "../plugin/validate/dist/jquery.validate.min",
		messages_zh:"../plugin/validate/dist/localization/messages_zh",
		myjs: '01'
	}
})

requirejs(['jquery','datepicker','validate','messages_zh','myjs'],function(){
//	start();
//	id1 = >start(this)
//	id2 => start(this)
});
