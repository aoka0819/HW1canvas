var options = "painting";
var step = -1;
var canvasList = [];
var imgUploaded = new Image();
var startX = 0;
var startY = 0;

function buttonOnClick (id) {
	if(id == "brush") {
		options = "painting";
		let display = document.getElementById("brush").style.display;
		document.getElementById("brush").style.display = (display == "block") ? "none" : "block";
		document.getElementById("eraser").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
		document.getElementById("shapeSelection").style.display = "none";
	} else if(id == "eraser") {
		options = "erasing";
		let display = document.getElementById("eraser").style.display;
		document.getElementById("eraser").style.display = (display == "block") ? "none" : "block";
		document.getElementById("brush").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
		document.getElementById("shapeSelection").style.display = "none";
	} else if(id == "text") {
		options = "typing";
		let element = document.getElementById("page");
		element.classList.remove("default");
		element.classList.add("text");
		let display = document.getElementById("fontSetting").style.display;
		document.getElementById("fontSetting").style.display = (display == "block") ? "none" : "block";
		document.getElementById("brush").style.display = "none";
		document.getElementById("eraser").style.display = "none";
		document.getElementById("shapeSelection").style.display = "none";
	} else if(id == "shape") {
		options = "shapeDrawing";
		let display = document.getElementById("shapeSelection").style.display;
		document.getElementById("shapeSelection").style.display = (display == "block") ? "none" : "block";
		document.getElementById("brush").style.display = "none";
		document.getElementById("eraser").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
	} else if(id == "undo") {
		if(step >= 0) {
			step--;
		}
		const cvs = document.querySelector("canvas");
		const ctx = cvs.getContext("2d");
		const cvsTemp = document.createElement('canvas'); // 新建一个 canvas 作为缓存 canvas
    	const ctxTemp = cvsTemp.getContext('2d');
    	cvsTemp.width = 1000; cvsTemp.height = 500; // 设置宽高
		//ctx.clearRect(0, 0, 1000, 500);
		if(step >= 0) {
			var canvas = new Image();
			canvas.src = canvasList[step];
			canvas.onload = function() {
				ctxTemp.drawImage(canvas, 0, 0);
				ctx.clearRect(0, 0, 1000, 500);
				ctx.drawImage(cvsTemp, 0, 0);
			}
		} else {
			ctx.clearRect(0, 0, 1000, 500);
		}
	} else if(id == "redo") {
		if(step < canvasList.length - 1) {
			step++;
			const cvs = document.querySelector("canvas");
			const ctx = cvs.getContext("2d");
			const cvsTemp = document.createElement('canvas'); // 新建一个 canvas 作为缓存 canvas
    		const ctxTemp = cvsTemp.getContext('2d');
    		cvsTemp.width = 1000; cvsTemp.height = 500; // 设置宽高
			//ctx.clearRect(0, 0, 1000, 500);
			var canvas = new Image();
			canvas.src = canvasList[step];
			canvas.onload = function() {
				ctxTemp.drawImage(canvas, 0, 0);
				ctx.clearRect(0, 0, 1000, 500);
				ctx.drawImage(cvsTemp, 0, 0);
			}
		}
	} else if(id == "upload") {
		options = "picture";
	} else if(id == "download") {
		var link = document.createElement('a');
  		link.download = 'filename.png';
  		link.href = canvasList[step];
  		link.click();
	}
}

window.addEventListener("load", () => {
	// get color and size selected
	const color = document.querySelector("#color");
	const brush = document.querySelector("#brush");
	const eraser = document.querySelector("#eraser");
	const imgUpload = document.getElementById('upload');
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
		ctx.fillStyle = colorValue;
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
		} else if(options == "picture") {
			//console.log("is found?", imgUploaded.src);
			ctx.drawImage(imgUploaded, mouseX, mouseY);
		} else if(options == "shapeDrawing") {
			startX = mouseX;
			startY = mouseY;
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
				ctx.clearRect(mouseX - ctx.lineWidth , mouseY - ctx.lineWidth, ctx.lineWidth, ctx.lineWidth);
			} else if(options == "painting") {
				ctx.lineTo(mouseX, mouseY);
				ctx.stroke();
				//ctx.rect(mouseX, mouseY, 50, 50);
				//ctx.rect(startX, startY + mouseX - startX, startX + mouseY - startY, mouseY);
			} else if(options == "shapeDrawing") {
				
				let shapeNow = document.getElementById("shape").value;
				//alert(shapeNow);
				if(shapeNow == "circle") {
					ctx.beginPath;
					ctx.arc(mouseX, mouseY, 200, 0, 2 * Math.PI);
					ctx.closePath;
					ctx.fill();
				} else if(shapeNow == "triangle") {
					ctx.beginPath();
                	ctx.moveTo(startX, startY);
                	ctx.lineTo(mouseX + (mouseX - startX)/2, mouseY - startY);
                	ctx.lineTo(mouseX - (mouseX - startX)/2, mouseY - startY);
					ctx.lineTo(startX, startY);
					//ctx.moveTo(100, 100);
					//ctx.lineTo(400, 400);
					//ctx.lineTo(100, 400);
					//ctx.lineTo(100, 100);
                	ctx.closePath();
                	ctx.fill();
				} else if(shapeNow == "rectangle") {
					//console.log("rectangle drawing", ctxTemp.lineWidth);
					ctx.fillRect(startX, startY, mouseX - startX, mouseY - startY);
				}
			}
		}
	});
	// ok 现在我们需要鼠标按下才绘图
	// 用最笨的方法 立一个flag 哈哈
	// 现在鼠标弹起了还绘图 加一个鼠标弹起事件
	cvs.addEventListener("mouseleave", () => {
		// flag为fasle即可
		flag = false;
		history();
	});
	cvs.addEventListener("mouseup", () => {
		// flag为fasle即可
		flag = false;
		history();
	});
	// 现在实现清空画布
	// 获取按钮
	const clear = document.querySelector("#clear");
	clear.addEventListener("click", () => {
		// clearRect方法可以清空一定区域内的内容 填写的值为x坐标 y坐标 清除的宽度 和 高度 我们全部要清除 所以直接从左上角开始 宽高为画布的宽高了 再来试试
		ctx.clearRect(0, 0, 1000, 500);
		history();
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
	history();
  }

  function history() {
	  step++;
	  if(step < canvasList.length) {
		  canvasList.length = step;
	  }
	  const cvs = document.querySelector("canvas");
	  canvasList.push(cvs.toDataURL());
	  //console.log("step now:",step);
  }

  function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        imgUploaded.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}