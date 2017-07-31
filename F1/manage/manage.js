window.onload=function(){
	var name=document.getElementById("name");
	var oid=document.getElementById('id');
	var ogender=document.getElementById('gender');
	var omajor=document.getElementById('major');
	var btn=document.getElementById('btn');
	var osearch=document.getElementById('search');
	var searchBtn=document.getElementById('searchBtn');
	var otable=document.getElementById('table');

	//创建tr->td->赋值
	// 通过点击事件对表格进行修改
	btn.onclick=function(){
		//  第一个表格单元，添加number
		var otr=document.createElement('tr');//创建节点
		var otd=document.createElement('td');
		otr.appendChild(otd);//appendChild(),将tr的子节点td添加至tr内（DOM对象）
		var number=otable.tBodies[0].rows.length; //number用于每条记录的排序，值为tbody的行数
		otd.innerHTML=number++;
		// 第二个表格内为name
		var otd=document.createElement('td');
		otr.appendChild(otd);
		otd.innerHTML=name.value;
		// 第三个表格内为id的值
		var otd=document.createElement('td')
		otr.appendChild(otd);
		otd.innerHTML=oid.value;
		// 第四个表格内为gender的值
		var otd=document.createElement('td')
		otr.appendChild(otd);
		otd.innerHTML=ogender.value;
		// 第五个表格内为major的值
		var otd=document.createElement('td')
		otr.appendChild(otd);
		otd.innerHTML=omajor.value;

		// 第六个表格内为修改选项
		var td6=document.createElement('td');
		otr.appendChild(td6);
		td6.innerHTML= 'Modify';
		// 修改
		td6.onclick = function(){
		var parent = this.parentNode.cells;     //找到td6的父亲节点tr下的所有单元格td
		if ('Modify'==td6.innerHTML){       //正则，通过test函数判断td6内的内容与Modify是否匹配
			for( var i = 0; i < 5; i++) {    //去除最后两个用于对表格进行处理两个单元格parent.length - 2，不过一共就设了7个td直接已知就是3啦
				var txt = document.createElement('input');
				txt.type = 'text';
				var acell= parent[i];
				txt.value =acell.innerHTML;		//给单元格加个input便于修改
				acell.innerHTML = ' ';
				acell.appendChild(txt);		//输入的value存入单元格
			}
			td6.innerHTML= 'Save';			//修改td内容
		}
		else{
			for( var i = 0; i <5 ;i++){
				var acell = parent[i];
				acell.innerHTML = acell.children[0].value;
			}
			td6.innerHTML= 'Modify';			//由于修改的td6单元格内的内容，通过else改回Modify
		}
	}

	//删除  通过表格最后一列单元格进行删除
	var otd=document.createElement('td')
	otd.innerHTML='<span>Delete</span>';
	otr.appendChild(otd);
	otd.getElementsByTagName('span')[0].onclick=function(){
		otable.tBodies[0].removeChild(this.parentNode.parentNode);   //删除td父亲的父亲的儿子 ，也就是行tr
	}

	// 将tr节点添加至table的tbody下，对表格的操作结束
	otable.tBodies[0].appendChild(otr);	
	}
	// 搜索
	searchBtn.onclick=function(){
		for( var i=0; i<otable.tBodies[0].rows.length; i++){
			var Tab=otable.tBodies[0].rows[i].cells[2].innerHTML;   
			var Txt=osearch.value;	//获得输入的值
			otable.tBodies[0].rows[i].style.background=''
			if(Tab==Txt){                //原值与表格id的值相比较
				otable.tBodies[0].rows[i].style.background='pink';
			}

		}
	}
	//重置
	 document.getElementById('res').onclick= function () {
		document.getElementById('form').reset();
	}
}