function start(){
	//使用日期选择插件
//		$('#birthday').fdatepicker({
//		    format: 'yyyy-mm-dd'
//		});
//	
		//自定义验证语法
//		$.validator.addMethod('isMobile',function(value, ele){
//			console.log(value.length);
//			//正则语法
//			var reg = /^1[3,5,7,8](\d{9})$/;
//			//匹配用户输入的内容
//			if(reg.test(value)){
//				return true;
//			}else{
//				return false;
//			}
//		});
//	
//		$("#studentRegister").validate({
//			submitHandler: function(){
//				//判断两次输入的密码是否一样
//				if($('#rePWD').val()!=$('#password').val()){
//					alert('两次输入的密码不一致');
//					return;
//				}
//				$.ajax({
//					url:"/register",
//					type:'post',
//					data: $("#studentRegister").serialize(),
//					dataType: 'json',
//					success: function(res){
//						alert(res.msg);
//						if(res.status == 200){
//							//跳转到登录页面
//							location.href = '/login'
//						}else{
//							return false;
//						}
//					},
//					error: function(err){
//						console.dir(err);
//					},
//				});
//			},
//			
//			rules:{
//				userName: {
//					required: true,
//					minlength:3
//				},
//				password:{
//					required: true,
//					minlength: 6
//				},
//				name:'required',
//				phone:{
//					required: true,
//					isMobile: true
//				},
//				mail: {
//					required: true,
//					email: true
//				}
//			}
//		})
}
