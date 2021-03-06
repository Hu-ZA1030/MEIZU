 // 类：放大镜
 function Mirror(oBox, obj) {
    // DOM相关的属性：
    this.oBox = oBox;

    //属性的默认值：
    let defaultObj = {
        width: 80,
        height: 120,
        multiple: 3,
        color: "#ccc",
        opacity: 0.3,
        left: 0, //镜子的位置
        top: 0,
        img:"./img/Blist01.jpg",
        imgs:["./img/Blist01.jpg","./img/Blist01.jpg"]
    }

    // 先把传入的数据（obj）赋给defaultObj; 这是最终的对象的属性值；
    for (let key in obj) {
        defaultObj[key] = obj[key];
    }

    // 把defaultObj里的所有的属性赋给this
    for (let key in defaultObj) {
        this[key] = defaultObj[key];
    }

    this.createDom();
    this.addEvent();
}

// 方法
// 1、创建dom的方法（就是HTML和CSS代码）
Mirror.prototype.createDom = function () {
    let htmlStr="";
    // 创建下面的小图列表
    // 1）、创建 图片的盒子
    htmlStr += `<ul style="
        position:absolute;
		left: 149px;
		top: 691px;
       
        height: 90px ;
    ">`;                  
 // top:${this.oBox.offsetHeight+10}px; 
    // 2）、通过循环创li(有几张图片，就创建几个li)
    for(let i=0;i<this.imgs.length;i++){
        htmlStr += `
            <li style="
                    float: left;
                    margin-left: 5px;
                    width: ${this.oBox.offsetWidth/this.imgs.length-10}px;
                    height: 90px;                
            ">
                <img style="
                            width: 100%;
                            height: 100%;
                " src="${this.imgs[i]}">
            </li>
        `;
    }
    htmlStr += "</ul>";
  
    // 1、放大镜的html代码；
    htmlStr += `
        <div style="
                    position: absolute;
					left: {${this.left}+20}px;
					top: {${this.top}+130}px;
                    width: ${this.width}px;
                    height:${this.height}px;
                    background-color: ${this.color};
                    opacity: ${this.opacity};
                    display:none;
        ">
        </div>
    `;
	// left: ${this.left}+30 px;
	// top: ${this.top}+140 px;
    // 2、可视（放大的效果）
    let boxWidth = this.oBox.offsetWidth;
    let boxHeight = this.oBox.offsetHeight;
    htmlStr += `
        <div style="
		    
                    position: absolute;
					left: 500px;
					top: 220px;
					width: 250px;
					height: 300px;
                    border: 1px solid #333;
                    background-image: url(${this.img});
                    background-size: ${boxWidth*this.multiple}px ${boxHeight*this.multiple}px;
                    background-position: -${this.left*this.multiple}px -${this.top*this.multiple}px;
                    display:none;
					
        ">
        </div>        
    `;
	
    /*  left: ${boxWidth+20}px;
		top: 0;
		width: ${this.width*this.multiple}px;
		height: ${this.height*this.multiple}px;*/
    // 把拼接好的html字符串放到盒子里
    this.oBox.innerHTML = htmlStr;

}


// 2、绑定事件（给盒子绑定onmousemove事件）
Mirror.prototype.addEvent = function(){
     //放大镜： 倒数第二个孩子
     let oMirrorBox = this.oBox.lastElementChild.previousElementSibling;
    // 可视div：倒数第一个孩子
    let oShowBox = this.oBox.lastElementChild;

    // 1、给大盒子增加事件
    this.oBox.onmouseover = function(){
        oMirrorBox.style.display = "block";
        oShowBox.style.display = "block";
    }
    
    this.oBox.onmouseout = function(){
        oMirrorBox.style.display = "none";
        oShowBox.style.display = "none";
    }

    // 2、放大效果       
    
    let boxOffsetLeft = this.oBox.offsetLeft;
    let boxOffsetTop = this.oBox.offsetTop;
    let boxWidth = this.oBox.offsetWidth;
    let boxHeight = this.oBox.offsetHeight;

    this.oBox.onmousemove = (event)=>{
        let e = event || window.event;
        // 一、数据处理
        // 1、计算oMirrorBox应该出现的位置(基于父盒子oBox的left和top)
        // 鼠标距离页面的坐标的距离-大盒子距离页面的距离-放大镜的宽度的一半
        this.left = e.pageX - boxOffsetLeft - this.width / 2;
        this.top = e.pageY - boxOffsetTop - this.height / 2;

        // 2、处理边界
        if (this.left < 0) {
            this.left = 0;
        } else if (this.left + this.width > boxWidth) {
            this.left = boxWidth - this.width;
        }

        if (this.top < 0) {
            this.top = 0;
        } else if (this.top + this.height >boxHeight ) {
            this.top = boxHeight - this.height;
        }

        // 二、外观呈现
        // 1、移动放大镜
        oMirrorBox.style.left = this.left + "px";
        oMirrorBox.style.top = this.top + "px";

        // 2、改变show-box的背景图片的位置
        oShowBox.style.backgroundPosition = `-${this.left * this.multiple}px -${this.top * this.multiple}px`;
    }

    // 3、给下面的每个li增加onmouseover事件

    let oLis = this.oBox.firstElementChild.children; //
    for(let i=0;i<oLis.length;i++){
        oLis[i].onmouseover = (event)=>{
            this.img = oLis[i].firstElementChild.src;
            this.oBox.style.backgroundImage = `url(${this.img})`;
            oShowBox.style.backgroundImage = `url(${this.img})`;
            // 阻止事件冒泡
            let e = event || window.event;
            e.stopPropagation();
        }
        oLis[i].onmousemove = (event)=>{
             // 阻止事件冒泡
             let e = event || window.event;
             e.stopPropagation();
        } 
    }

}