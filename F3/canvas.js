var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var height=256;
var current="red";
var smallShow=document.getElementById("smallShow");
var fix=document.getElementById("fix");
var point=document.getElementById("point");

//左边颜色块的显示
function leftSide(){
	var left_gradient=ctx.createLinearGradient(0,0,0,height);
	left_gradient.addColorStop(0,"red");
	left_gradient.addColorStop(1/6,"orange");
	left_gradient.addColorStop(2/6,"yellow");
	left_gradient.addColorStop(3/6,"green");
	left_gradient.addColorStop(4/6,"blue");
	left_gradient.addColorStop(5/6,"purple");
	left_gradient.addColorStop(1,"red");
	
	ctx.fillStyle=left_gradient;
	ctx.fillRect(0,0,20,height);

}

//右边颜色块的显示
//两个渐变都在canvas里面，所以第二个渐变位置不以（0,0）开头
function rightSide(color){
	var right_gradient=ctx.createLinearGradient(0,0,height,height);
	right_gradient.addColorStop(0,"#fff");
	right_gradient.addColorStop(5/9,color);
	right_gradient.addColorStop(1,"#000");
	ctx.fillStyle=right_gradient;
	ctx.fillRect(30,0,height+30,height);

}

//判断是对左边还是右边的色块进行操作
function chooseArea(){
	c.addEventListener("click",function(e){
		var ePos={
			x: e.offsetX || e.layerX,
			y: e.offsetY || e.layerY
		}
		//左边，点击显示小圆圈且位置固定
		if(ePos.x>=0&&ePos.x<20&&ePos.y>=0&&ePos.y<height){
			rgb=getRgb(ePos,"left");
			rightSide("rgb("+rgb+")");
			rgb=getRgb(ePos,"right");
			fix.style.left=ePos.x+"px";
			fix.style.top=ePos.y+"px";
		}
		//右边，点击显示另一个小圆圈
		else if(ePos.x>=30&&ePos.x<30+height&&ePos.y>=0&&ePos.y<height){
			rgb=getRgb(ePos,"right");
			//point 选中框的颜色随着区域而变化，以防颜色相似看不清
			point.style.left=ePos.x+"px";
			point.style.top=ePos.y+"px";
			if(rgb[0]>256/2||rgb[1]>256/2||rgb[2]>256/2){
				point.style.borderColor="black";
			}else point.style.borderColor="white";
		}
		else return;
		showColor(rgb);
		
	});
}
//相应区域颜色的选中
//定位->获值->显示
function chooseColor(){
	 c.addEventListener("mousedown",function(e){
	 	//获取鼠标位置，这个是用来获取鼠标相对于右边色块的位置
		var ePos={
			x: e.offsetX || e.layerX,
			y: e.offsetY || e.layerY
		}
		if(ePos.x>=30&&ePos.x<30+height&&ePos.y>=0&&ePos.y<height){
			document.onmousemove=function(e){
				//这个就是鼠标点击在窗口的坐标
				var position={
					x:e.clientX,
					y:e.clientY
				}
				if(position.x<30){
					position.x=30;
				}
				else if(position.x>(30+height-1)){
					position.x=30+height-1;
				}
				if(position.y<0){
					position.y=0;
				}
				else if(position.y>(height-1)){
					position.y=height-1;
				}
				rgb=getRgb(ePos,"right");
				showColor(rgb.slice(0, 3).join());
				point.style.left=ePos.x+"px";
				point.style.top=ePos.y+"px";
				if(rgb[0]>256/2||rgb[1]>256/2||rgb[2]>256/2){
					point.style.borderColor="black";
				}else point.style.borderColor="white";

			}
			//鼠标松开后不做改变
			document.onmouseup=function(){
				document.onmouseup = document.onmousemove = null;
			} 
		}
			
	});

}

//获取Rgb的值
function getRgb(position,area){
	var imgData=0;
	if(area=="left"){
		imgData=ctx.getImageData(0,0,20,height);
	}else{
		imgData=ctx.getImageData(0,0,c.width,c.height);
	}
	var data=imgData.data;
	var index=(position.y * imgData.width + position.x) * 4;
	return [
		data[index],
		data[index+1],
		data[index+2]
	];
}

//RGB转HSL算法
function rgb_hsl(r,g,b){
	r/=255, g/=255, b/=255;
	var maxn=Math.max(r,g,b), minn=Math.min(r,g,b);
	l=(maxn+minn)/2;
	if(maxn==minn){
		s=h=0;
	}else{

	if(l<0.5) s=(maxn-minn)/(maxn+minn);
	else s=(maxn-minn)/(2-maxn-minn);
	
	if(r==maxn) h=(g-b)/(maxn-minn);
	if(g==maxn) h=2+(b-r)/(maxn-minn);
	if(b==maxn) h=4+(r-g)/(maxn-minn);
	if(h<0) h=h*60+360;
	else h*=60;
	}
	h=(h/360).toFixed(2);
	s=s.toFixed(2);
	l=l.toFixed(2);
	return [h,s,l];
	
}
function hsl_rgb(h,s,l){
	var p,q,r,g,b;
	if(s==0) r=g=b=l;
	if(l<0.5){
		q=l*(1+s);
	}else{
		q=l+s-l*s;
	}
	var p=2*l-q;
	// h/=360;
	var array=new Array();
	array.push(h+1/3);
	array.push(h);
	array.push(h-1/3);
	for(var i=0;i<array.length;i++){
		if(array[i]<0){
			array[i]=array[i]+1;
		}else if(array[i]>1){
			array[i]=array[i]-1;
		}
		if(array[i]*6<1){
			array[i]=p+(q-p)*6*array[i];
		}else if(2*array[i]<1){
			array[i]=q;
		}
		else if(3*array[i]<2){
			array[i]=p+(q-p)*(2/3-array[i])*6;
		}else array[i]=p;
	}
	r=array[0]*255;
	g=array[1]*255;
	b=array[2]*255;	
	return [r,g,b];
}
// alert(hsl_rgb(0,0,1));
//显示函数，包括颜色，数值
var inList=document.getElementsByClassName("form-control");

function showColor(rgb){
	inList[0].value=rgb[0];
	inList[1].value=rgb[1];
	inList[2].value=rgb[2];
	inList[3].value=rgb_hsl(rgb[0],rgb[1],rgb[2])[0];
	inList[4].value=rgb_hsl(rgb[0],rgb[1],rgb[2])[1];
	inList[5].value=rgb_hsl(rgb[0],rgb[1],rgb[2])[2];
	smallShow.style.backgroundColor = "rgb(" + rgb + ")";

}
//整体初始化
function init(){
	leftSide();
	rightSide(current);
	chooseArea();
	chooseColor();
	
}
init();
//逆向思维
//先获值然后找到对应颜色然后再找到在窗口的对应位置
function getValue(){

	var R,G,B;
	for(var i=0;i<3;i++){
		inList[i].index=i;
		//模糊焦点事件，更改数值后鼠标离开任意点击，触发事件
		inList[i].onblur=function(){
			R=inList[0].value;
			G=inList[1].value;
			B=inList[2].value;
			for(var k=0;k<3;k++){
				if(inList[k].value<0||inList[k].value>255){
					alert("数值输入错误，请重新输入");
				}else{
					var HSL=rgb_hsl(R,G,B);
					inList[3].value=HSL[0];
					inList[4].value=HSL[1];
					var L=inList[5].value=HSL[2];
					var co= "rgb(" + R+","+G+","+B + ")"
					smallShow.style.backgroundColor =co;
					rightSide(co);
					
				}
			}
			
		}
	}

}
getValue();

