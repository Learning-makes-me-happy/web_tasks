	var times=null;
	var index = 1;
	var idx;
	var moveIdx=0;
	var arr=new Array(
		"吴邪,生于盗墓世家，长沙老九门狗五爷之孙吴家现任当家。",
		"张起灵作为张家末代族长，只身在长白山青铜门后独守十年。十年后,回归。",
		"王胖子，王半月，与吴邪、张起灵组成盗墓铁三角，自称北派摸金校尉。",
		"粽子，吉祥物之一啊",
		"尸蹩，吉吉吉吉祥物……"
		);
	function showPic(i){
		$(".but li").eq(i).addClass('current').siblings().removeClass('current');
		$(".con li").eq(i).fadeIn(500).siblings().fadeOut(1000);
		$("#info").html(arr[i]);
	}
	function mouseover_jump(){
		$(".con li:not(:first-child)").hide();
		$("#info").html(arr[0]);
		$(".but li").mouseover(function(){
			window.clearInterval(times);	
			idx = $(this).index();
			showPic(idx);		
			}).mouseout(function(){
				index= idx+1;
				autoPlay();
			})
	}
		
	function autoPlay(){
 		times =window.setInterval(function(){
 			showPic(index);
 			index++;
 			moveIdx=index;
	 		if(index>3){
	 			index = 0;
	 		}
	 	},1500);
 			//return moveIdx;
 	}

	var bannerDiv=document.querySelector("#banner")
 	var spanList=document.getElementsByTagName("span");
 	
 	function click_slide(){
 		$("#banner span").hide();
	 	$(".con").mouseover(function(){
			window.clearInterval(times);
	 		$("#banner span").show();
	 		for(var i=0;i<spanList.length;i++){
				spanList[i].index=i;
				spanList[i].onclick=function(){
					if(this.index==0){
						// alert(moveIdx);
						moveIdx--;
						if(moveIdx<0) moveIdx=3;
					}else{
						moveIdx++;
						if(moveIdx>3) moveIdx=0;
					}
					showPic(moveIdx);
					index=moveIdx;
				}
			}
		});
		$(".con").mouseout(function(){
			autoPlay();	
			$("#banner span").hide();
		});

 	}
 	mouseover_jump();
 	click_slide();
 	autoPlay();

 	// document.addEventListener('touchstart',touchSatrt, false);
 	// document.addEventListener('touchend',touchEnd, false);
 	function touchSatrt(){
 		mouseover_jump();
 		click_slide();
 		 autoPlay();
 	}
 	// function touchEnd(){
 	// 	 autoPlay();
 	// }
