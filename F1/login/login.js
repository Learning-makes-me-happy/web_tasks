window.onload=function(){
	var atype=document.getElementById('type');
	var obut=document.getElementById('button');
	var flag=true;
	obut.onclick=function(){
		if(flag){
			atype.type='text';
			flag=false;
		}
		else{
			atype.type='password';
			flag=true;
		}
	}
}
var myclick=function(v){  
	var llis=document.getElementsByTagName("li");  
	for(var i=0;i<llis.length;i++){
		 var lli=llis[i];  
		 if (lli==document.getElementById("tab"+v)){  
		 lli.style.backgroundColor=""; 
		} 
		else{
			lli.style.backgroundColor="rgba(47,79,79,0.5)"; 
		}
	}
	var divs=document.getElementsByClassName("tab_css");  
	 for(var i=0;i<divs.length;i++){
		var divv=divs[i];
		if(divv==document.getElementById("tab"+v+"_content")){  
			 divv.style.display = "block";  
		}
		else{
			divv.style.display = "none";  
		}
	}
}