window.onload = function() {
  // 轮播图播放
  goAuto();
 
}

//  轮播图
function goAuto(){
	var mySwiper = new Swiper('.swiper-container', {
			direction: 'horizontal', // 水平切换选项
			loop: true, // 循环模式选项
	
			// 切换效果
			// effect: 'fade', 默认是左右切换
			cubeEffect: {
				slideShadows: true,
				shadow: true,
				shadowOffset: 40,
				shadowScale: 0.6
			},
	
			//自动播放
			autoplay: {
				delay: 3000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
	
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
			},
	
			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	
	//鼠标覆盖停止自动切换
	mySwiper.el.onmouseover = function(){
	  mySwiper.autoplay.stop();
	}
	
	//鼠标离开开始自动切换
	mySwiper.el.onmouseout = function(){
	  mySwiper.autoplay.start();
	}
}

// 导航栏图片
$(".nav-center ul li").mouseover(function(){
	$("#nav").css({
		background:"#ffffff",
	})
	$(".nav-left>.iconfont").css({
		color:"#16BFF3"
	})
	$(".nav-right>.iconfont").css({
		color:"#c3c3c3"
	})
	$(".nav-center ul li a").css({
		color:"#9c9c9c"
	})

})

$(".nav-center ul li").mouseout(function(){
	$("#nav").css({
		background:"none"
	})
	$(".nav-left>.iconfont").css({
		color:"#ffffff"
	})
	$(".nav-center ul li a").css({
		color:"#ffffff"
	})
})

// 鼠标放入手机区域的li 出现背景阴影
$(".phone-wrap ul li").mouseover(function(){
	$(this).css({
		"box-shadow":"0 0 12px #c9c9c9"
	})
})
$(".phone-wrap ul li").mouseout(function(){
	$(this).css({
		"box-shadow":"none"
	})
})

// 鼠标放入section的区域li 出现背景阴影
$(".section-show ul li").mouseover(function(){
	$(this).css({
		"box-shadow":"0 0 12px #c9c9c9"
	})
})
$(".section-show ul li").mouseout(function(){
	$(this).css({
		"box-shadow":"none"
	})
})

// Flyme
$(".fly-show ul li").mouseover(function(){
	$(this).css({
		"box-shadow":"0 0 18px #c9c9c9"
	})
})
$(".fly-show ul li").mouseout(function(){
	$(this).css({
		"box-shadow":"none"
	})
})


// 精彩视频
$(".video-show ul li").mouseover(function(){
	$(this).css({
		"box-shadow":"0 0 18px #c9c9c9"
	})
})
$(".video-show ul li").mouseout(function(){
	$(this).css({
		"box-shadow":"none"
	})
})



	
	