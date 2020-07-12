$(function(){
	verify();
})

// 正则验证用户名和密码是否符合格式
	// 定义一有四个字符的字符串，每一个元素表示一项验证
	let isRight = [0,0,0,0,0];

// 1)验证用户名是否正确
$("#username").blur(function(){
	// 1)前端验证
	isUsername($(this));
	if(isUsername($(this)) == false){
		return;
	}
	// 2)后端验证
	$.get("./php/checkUser.php",{
		"username":$("#username").val()
	},(data)=>{
		if(data == "1"){
			isRight[4] = 1;
			$(this).parent().prev().addClass("visiblility-visible");
			$(this).parent().prev().css("background","green");
			$(this).parent().prev().find("i").css("display","none");
			$(this).parent().prev().find("span").css("color","#fff").html("用户名不存在，可以使用");
		}else{
			isRight[4] = 0;
			$(this).parent().prev().addClass("visiblility-visible");
			$(this).parent().prev().find("span").html("用户名存在，不可以使用，请重新注册");
		}
	})

	
})
function isUsername(dom){
	// Flyme 账号(不能数字开头,账号长度为2~10)
	var reg= /^\D[a-zA-Z0-9\u4e00-\u9fa5@%$_]{1,9}$/;
	if(reg.test(dom.val())){
		isRight[0] = 1;
		dom.parent().prev().addClass("visiblility-visible");
		dom.parent().prev().css("background","green");
		dom.parent().prev().find("i").css("display","none");
		dom.parent().prev().find("span").css("color","#fff").html("√	请继续注册");
		return  true;
	}else{
		isRight[0] = 0;
		dom.parent().prev().addClass("visiblility-visible");
		verify();
		return false;
	}
}

// 2)验证密码是否正确
$("#userpass").blur(function(){
	isUserpass($(this))
})
function isUserpass(dom){
   var reg= /^[a-zA-Z][a-zA-Z0-9@$%^&*_]{5,11}$/;
   if(reg.test(dom.val())){
	   isRight[1] = 1;
	   dom.parent().prev().addClass("visiblility-visible");
	   dom.parent().prev().css("background","green");
	   dom.parent().prev().find("i").css("display","none");
	   dom.parent().prev().find("span").css("color","#fff").html("√	请继续注册");
   }else{
	   isRight[1] = 0;
	   dom.parent().prev().addClass("visiblility-visible");
	   verify()
   }
}

// 3)验证手机号是否正确
$("#telNumber").blur(function(){
	istelNumber($(this))
})
function istelNumber(dom){
   var reg= /^[1][3,4,5,7,8,9][0-9]{9}$/ ;
   if(reg.test(dom.val())){
	   isRight[2] = 1;
	   dom.parent().prev().addClass("visiblility-visible");
	   dom.parent().prev().css("background","green");
	   dom.parent().prev().find("i").css("display","none");
	   dom.parent().prev().find("span").css("color","#fff").html("√	请继续注册");
   }else{
	   isRight[2] = 0;
	   dom.parent().prev().addClass("visiblility-visible");
	   verify();
   }
}

// 4)验证 验证码是否填写正确
$("#verify-text").blur(function(){
	if($(this).val() == $(this).next().html()){
		isRight[3] = 1;
		$(this).parent().prev().addClass("visiblility-visible");
		$(this).parent().prev().css("background","green");
		$(this).parent().prev().find("i").css("display","none");
		$(this).parent().prev().find("span").css("color","#fff").html("√ 请继续注册");
	}else{
		isRight[3] = 0;
		$(this).parent().prev().addClass("visiblility-visible");
		verify();
	}

})


// 点击注册按钮
$("#btnReg").click(function(){
	let sum = 0;
	isRight.forEach(function(item){
        sum += item;
    });
	if(sum !=5){
		return;
	}
	$.post("./php/addUser.php",{
		"username":$("#username").val(),
		"userpass":$("#userpass").val(),
		"tel":$("#telNumber").val(),
	},function(data){
		if(data == "success"){
			let i = 5;
			let mytime = setInterval(()=>{
				i--;
				if(i==0){
					window.clearInterval(mytime);
					location.href = "./login.html"
				}
				$(".reg-success").addClass("visiblility-visible");
				$(".reg-success").css("background","green");
				$(".reg-success").find("i").css("display","none");
				$(".reg-success").find("span").css("color","#fff").html(`√ 注册成功，${i}秒后跳转到登入页面`);
			},1000)
		}else if(data == "fail"){
			$(".reg-success").find("span").css("color","#fff").html("注册失败，请重新注册");
		}
	})
})



// 验证码
function verify(){
	// 获取 验证码
	let vfy = getMath(4)
	$(".user-name").find("span").html(vfy);
}


// 封装一个四位数随机数函数
function getMath(n){
	let str = "";
	for(let i=0;i<n;i++){
		str += parseInt(Math.random()*10);
	}
	return str;
}
