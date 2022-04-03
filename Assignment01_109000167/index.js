var options = "none";
var step = -1;
var canvasList = [];
var imgUploaded = new Image();
var startX = 0;
var startY = 0;

/* solve button on click event */
function buttonOnClick (id) {
	
	if(id == "brush") {
		options = "painting";
		document.getElementById("brush").style.display = "block";
		document.getElementById("eraser").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
		document.getElementById("shapeSelection").style.display = "none";
	} else if(id == "eraser") {
		options = "erasing";
		document.getElementById("eraser").style.display = "block";
		document.getElementById("brush").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
		document.getElementById("shapeSelection").style.display = "none";
	} else if(id == "text") {
		options = "typing";
		document.getElementById("fontSetting").style.display = "block";
		document.getElementById("brush").style.display = "none";
		document.getElementById("eraser").style.display = "none";
		document.getElementById("shapeSelection").style.display = "none";
	} else if(id == "shape") {
		options = "shapeDrawing";
		document.getElementById("shapeSelection").style.display = "block";
		document.getElementById("brush").style.display = "none";
		document.getElementById("eraser").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
	} else if(id == "undo") {
		if(step >= 0) {
			step--;
		}
		// create new temp canvas
		const cvs = document.querySelector("canvas");
		const ctx = cvs.getContext("2d");
		const cvsTemp = document.createElement('canvas');
    	const ctxTemp = cvsTemp.getContext('2d');
    	cvsTemp.width = 1000; cvsTemp.height = 500;
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
			const cvsTemp = document.createElement('canvas');
    		const ctxTemp = cvsTemp.getContext('2d');
    		cvsTemp.width = 1000; cvsTemp.height = 500;
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
		document.getElementById("brush").style.display = "none";
		document.getElementById("eraser").style.display = "none";
		document.getElementById("fontSetting").style.display = "none";
		document.getElementById("shapeSelection").style.display = "none";
	} else if(id == "download") {
		var link = document.createElement('dlFile');
  		link.download = 'webCanvas.png';
  		link.href = canvasList[step];
  		link.click();
	}
	let element = document.getElementById("page");
	element.classList.remove("default");
	element.classList.remove("paint");
	element.classList.remove("erase");
	element.classList.remove("addPic");
	element.classList.remove("shape");
	element.classList.remove("text");
	if(options == "painting") {
		element.classList.add("paint");
	} else if(options == "erasing") {
		element.classList.add("erase");
	} else if(options == "picture") {
		element.classList.add("addPic");
	} else if(options == "shapeDrawing") {
		element.classList.add("shape");
	} else if(options == "typing") {
		element.classList.add("text");
	} else {
		element.classList.add("default");
	}
}

window.addEventListener("load", () => {
	const cvs = document.getElementById("canvas");
	const ctx = cvs.getContext("2d");
	const color = document.getElementById("color");
	const brush = document.getElementById("brushSize");
	const eraser = document.getElementById("eraserSize");
	let colorValue = color.value;
	let	brushSize = brush.value;
	let	eraserSize = eraser.value;
	// add listener to solve setting changing :
	color.addEventListener("change", () => {
		colorValue = color.value;
	});
	brush.addEventListener("change", () => {
		brushSize = brush.value;
	});
	eraser.addEventListener("change", () => {
		eraserSize = eraser.value;
	});
	let flag = false; // flag: mouse up 
	cvs.addEventListener("mousedown", (e) => {
		flag = true;
		const top = cvs.getBoundingClientRect().top;
		const left = cvs.getBoundingClientRect().left;
		const mouseX = e.pageX - left;
		const mouseY = e.pageY - top;
		ctx.fillStyle = colorValue;
		ctx.strokeStyle = colorValue;
		ctx.lineWidth = (options == "erasing") ? eraserSize : brushSize;
		ctx.lineCap = "round";
		ctx.beginPath();
		ctx.moveTo(mouseX, mouseY);
	});
	// add text box
	cvs.addEventListener("mousedown", (e) => {
		const top = cvs.getBoundingClientRect().top;
		const left = cvs.getBoundingClientRect().left;
		const mouseX = e.pageX - left;
		const mouseY = e.pageY - top;
		if(options == "typing") {
			addText(mouseX, mouseY);
		} else if(options == "picture") {
			ctx.drawImage(imgUploaded, mouseX - imgUploaded.width/2, mouseY - imgUploaded.height/2);
		} else if(options == "shapeDrawing") {
			startX = mouseX;
			startY = mouseY;
		}
	});
	// drawing here:
	cvs.addEventListener("mousemove", (e) => {
		const top = cvs.getBoundingClientRect().top;
		const left = cvs.getBoundingClientRect().left;
		const mouseX = e.pageX - left;
		const mouseY = e.pageY - top;
		if(flag) {
			if(options == "erasing") {
				ctx.clearRect(mouseX, mouseY, ctx.lineWidth, ctx.lineWidth);
			} else if(options == "painting") {
				ctx.lineTo(mouseX, mouseY);
				ctx.stroke();
			} else if(options == "shapeDrawing") {
				let shapeNow = document.getElementById("shape").value;
				const cvsTemp = document.createElement('canvas');
    			const ctxTemp = cvsTemp.getContext('2d');
				
    			cvsTemp.width = 1000; cvsTemp.height = 500;
				if(step >= 0) {
					var canvas = new Image();
					canvas.src = canvasList[step];
					canvas.onload = function() {
						ctxTemp.drawImage(canvas, 0, 0);
						ctxTemp.fillStyle = colorValue;
						ctxTemp.strokeStyle = colorValue;
						if(shapeNow == "circle") {
							ctxTemp.beginPath;
							ctxTemp.arc(startX, startY, Math.sqrt(Math.pow((mouseX-startX), 2) + Math.pow((mouseY-startY), 2)), 0, 2 * Math.PI);
							ctxTemp.closePath;
							ctxTemp.fill();
						} else if(shapeNow == "triangle") {
							ctxTemp.beginPath();
							ctxTemp.moveTo(startX, startY);
							ctxTemp.lineTo(startX + (mouseX - startX)/2, mouseY);
							ctxTemp.lineTo(startX - (mouseX - startX)/2, mouseY);
							ctxTemp.closePath();
							ctxTemp.fill();
						} else if(shapeNow == "rectangle") {
							ctxTemp.fillRect(startX, startY, mouseX - startX, mouseY - startY);
						}
						ctx.clearRect(0, 0, 1000, 500);
						ctx.drawImage(cvsTemp, 0, 0);
					}
				} else {
					ctxTemp.fillStyle = colorValue;
						ctxTemp.strokeStyle = colorValue;
						if(shapeNow == "circle") {
							ctxTemp.beginPath;
							ctxTemp.arc(startX, startY, Math.sqrt(Math.pow((mouseX-startX), 2) + Math.pow((mouseY-startY), 2)), 0, 2 * Math.PI);
							ctxTemp.closePath;
							ctxTemp.fill();
						} else if(shapeNow == "triangle") {
							ctxTemp.beginPath();
							ctxTemp.moveTo(startX, startY);
							ctxTemp.lineTo(startX + (mouseX - startX)/2, mouseY);
							ctxTemp.lineTo(startX - (mouseX - startX)/2, mouseY);
							ctxTemp.closePath();
							ctxTemp.fill();
						} else if(shapeNow == "rectangle") {
							ctxTemp.fillRect(startX, startY, mouseX - startX, mouseY - startY);
						}
						ctx.clearRect(0, 0, 1000, 500);
						ctx.drawImage(cvsTemp, 0, 0);
				}
				
			}
		}
	});
	// event mouse leave canvas
	cvs.addEventListener("mouseleave", () => {
		if(flag) {
			flag = false;
			recordHistory();
		}
	});
	// event mouse up on canvas
	cvs.addEventListener("mouseup", () => {
		flag = false;
		recordHistory();
	});
	const clear = document.querySelector("#clear");
	clear.addEventListener("click", () => {
		ctx.clearRect(0, 0, 1000, 500);
		recordHistory();
	});
	
});

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
const handleEnter = (event, input, x, y) => {
    const keyCode = event.keyCode;
    if (keyCode == 13) {
      drawText(input.value, x, y);
      document.body.removeChild(input);
    }
};

function drawText(txt, x, y) {
	const cvs = document.getElementById("canvas");
	const ctx = cvs.getContext("2d");
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = document.getElementById("fontSize").value + "px " + document.getElementById("fontFace").value;
	var gradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
	gradient.addColorStop("0 ", document.getElementById("textColor").value);
	// Fill with gradient
	ctx.fillStyle = gradient;
	ctx.fillText(txt, x - 4, y - 4);
	recordHistory();
}

function recordHistory() {
	step++;
	if(step < canvasList.length) {
		canvasList.length = step;
	}
	const cvs = document.querySelector("canvas");
	canvasList.push(cvs.toDataURL());
}

function handleImage(e){
	var reader = new FileReader();
    reader.onload = function(event){
        imgUploaded.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}