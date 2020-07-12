
$("#nameLogin").mouseover(function(){
	$(this).css({
		"color":"#000"
	})
	$("#codeLogin").css({
		"color":"#ccc"
	})
	$(".user-login").css({
		"display" : "block"
	})
	$(".two-code").css({
		"display" : "none"
	})
	

})
$("#codeLogin").mouseleave(function(){
	$(this).css({
		"color":"#000"
	})
	$("#nameLogin").css({
		"color":"#ccc"
	})
	$(".user-login").css({
		"display" : "none"
	})
	$(".two-code").css({
		"display" : "block"
	})
	
})

// 点击登入按钮，登入网页
$("#btnLogin").click(function(){
	$.post("./php/login.php",{
		"username":$("#username").val(),
		"userpass":$("#usepass").val()
	},function(data){
		if(data == "success"){
			let i = 5;
			let mytime = setInterval(()=>{
				i--;
				if(i==0){
					window.clearInterval(mytime);
					location.href = "./index.html"
				}
				$(".login-success").addClass("visiblility-visible");
				$(".login-success").css("background","green");
				$(".login-success").find("i").css("display","none");
				$(".login-success").find("span").css("color","#fff").html(`√ 登入成功，${i}秒后跳转到主页`);
			},1000)
		}else if(data == "fail"){
			$(".login-success").css({})
		}
	})
})