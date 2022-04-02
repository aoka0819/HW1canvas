var options = "painting";

function buttonOnClick (id) {
	if(id == "brush") {
		options = "painting";
		let display = document.getElementById("brush").style.display;
		document.getElementById("brush").style.display = (display == "block") ? "none" : "block";
		document.getElementById("eraser").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
	} else if(id == "eraser") {
		options = "erasing";
		let display = document.getElementById("eraser").style.display;
		document.getElementById("eraser").style.display = (display == "block") ? "none" : "block";
		document.getElementById("brush").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
	} else if(id == "text") {
		options = "typing";
		let element = document.getElementById("page");
		element.classList.remove("default");
		element.classList.add("text");
		let display = document.getElementById("fontSetting").style.display;
		document.getElementById("fontSetting").style.display = (display == "block") ? "none" : "block";
		document.getElementById("brush").style.display = "none";
		document.getElementById("eraser").style.display = "none";
	}
}

window.addEventListener("load", () => {
	// get color and size selected
	const color = document.querySelector("#color");
	const brush = document.querySelector("#brush");
	const eraser = document.querySelector("#eraser");
	// 设置初始的画笔颜色和粗细 画图时用的
	let colorValue = color.value,
		brushSize = brush.value,
		eraserSize = eraser.value;
	// 给颜色选择器加onchange事件 以此来更新颜色
	color.addEventListener("change", () => {
		// 变化之后就会改变value值
		colorValue = color.value;
	});
	// 同理来改变画笔粗细
	brush.addEventListener("change", () => {
		brushSize = brush.value;
	});
	eraser.addEventListener("change", () => {
		eraserSize = eraser.value;
	});
	// ok现在开始画图了
	// 先获取画布
	const cvs = document.querySelector("canvas");
	// 再返回一个2d的绘图环境
	const ctx = cvs.getContext("2d");
	// 给画布添加鼠标按下事件
	let flag = false;
	cvs.addEventListener("mousedown", (e) => {
		// 按下之后让flag变成true
		flag = true;
		// 这里我们要获取鼠标的坐标来确定画布里面的初始位置
		// 先获取画布距离浏览器可视区的顶部和左部的大小
		// getBoundingClientRect这个方法内有六个值 分别是 left top  right bottom 和 width height 代表当前元素的宽度和高度
		const top = cvs.getBoundingClientRect().top;
		const left = cvs.getBoundingClientRect().left;
		// 然后求出鼠标在画布内容的位置
		// 计算方式依然是 鼠标距离整个浏览器可视区域的距离减去画布距离浏览器的距离
		const mouseX = e.pageX - left;
		const mouseY = e.pageY - top;
		// 这样就获取到了
		// 可以开始绘图了
		// 先设置好绘图的画笔颜色和粗细
		ctx.strokeStyle = colorValue;
		ctx.lineWidth = (options == "erasing") ? eraserSize : brushSize;
		// 这里再设置一个属性
		// 绘制的图像是圆角的
		ctx.lineCap = "round";
		// 开启一个路径
		ctx.beginPath();
		// 然后确定开始绘图的起点位置
		ctx.moveTo(mouseX, mouseY);
	});
	// 现在在加鼠标移动事件就可以绘图了
	// add text box
	cvs.addEventListener("mousedown", (e) => {
		const top = cvs.getBoundingClientRect().top;
		const left = cvs.getBoundingClientRect().left;
		const mouseX = e.pageX - left;
		const mouseY = e.pageY - top;
		if(options == "typing") {
			//add Text
			addText(mouseX, mouseY);
		}
	});
	cvs.addEventListener("mousemove", (e) => {
		// 同样的方式获取鼠标位置 复制一下
		const top = cvs.getBoundingClientRect().top;
		const left = cvs.getBoundingClientRect().left;
		const mouseX = e.pageX - left;
		const mouseY = e.pageY - top;
		// OK 这样就可以保证按下在开始画了
		if (flag) {
			if(options == "erasing") {
				ctx.clearRect(mouseX, mouseY, ctx.lineWidth, ctx.lineWidth);
			}
			else if(options == "painting") {
				ctx.lineTo(mouseX, mouseY);
				ctx.stroke();
			}
			
		}
	});
	// ok 现在我们需要鼠标按下才绘图
	// 用最笨的方法 立一个flag 哈哈
	// 现在鼠标弹起了还绘图 加一个鼠标弹起事件
	cvs.addEventListener("mouseup", () => {
		// flag为fasle即可
		flag = false;
	});
	// 现在实现清空画布
	// 获取按钮
	const clear = document.querySelector("#clear");
	clear.addEventListener("click", () => {
		// clearRect方法可以清空一定区域内的内容 填写的值为x坐标 y坐标 清除的宽度 和 高度 我们全部要清除 所以直接从左上角开始 宽高为画布的宽高了 再来试试
		ctx.clearRect(0, 0, 1000, 500);
		// OK了
	});
	
});
/** 建立一個輸入匡 */
const addText = (x, y) => {
    const input = document.createElement("input");
    input.type = "textarea";
    input.style.position = "fixed";
    input.style.left = x + 40 + "px";
    input.style.top = y + 40 + "px";
    input.style.zIndex = "100";
    input.onkeydown = (event) => handleEnter(event, input, x, y);
    document.body.appendChild(input);
    input.focus();
  };

/** 控制完成輸入 */
  const handleEnter = (event, input, x, y) => {
    const keyCode = event.keyCode;
    if (keyCode == 13) {
      drawText(input.value, x, y);
      document.body.removeChild(input);
    }
  };

/** 完成輸入後繪製到 canvas 上 */
  function drawText(txt, x, y) {
    const cvs = document.querySelector("canvas");
    const ctx = cvs.getContext("2d");
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = document.getElementById("fontSize").value + "px " + document.getElementById("fontFace").value;
    
	var gradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
	gradient.addColorStop("0 ", document.getElementById("textColor").value);
// Fill with gradient
	ctx.fillStyle = gradient;
	ctx.fillText(txt, x - 4, y - 4);
  }