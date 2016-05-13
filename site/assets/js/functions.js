$(function () {

	// 页面效果
	menuSwitch(); //菜单开关
	footerYear(); //自动计算页尾年份
	cooperateForm(); //合作页面表单选项

	// 基础功能
	smoothSlide(); //锚链接平滑滚动
	inputLimitLength(); //限制输入文字长度
	nonHtml5(); //非HTML5浏览器提示

	// 插件效果
	flexslider(); //flexslider

})





//*********************************************************************//
//                              页面效果                               //
//*********************************************************************//


// 菜单开关
function menuSwitch () {
	$(".header .menu .icon").click(function () {
		var nav = $(".header nav");
		if (nav.hasClass("show")) {
			nav.removeClass("show");
		}
		else {
			nav.addClass("show");
		}
	})
}


// 自动计算页尾年份
function footerYear () {
	if($(".year").length > 0){
		var getDate = new Date();
		$(".year").html(getDate.getFullYear());
	}
}


// 合作页面表单选项
function cooperateForm () {
	if ($(".cooperate").length > 0) {
		$(".settled .row .group").each(function () {
			var thisContent = new Array;  //记录选项的数组
			$(this).find("a").click(function () {
				var inputHidden = $(this).parent().find("input[type='hidden']");
				if (inputHidden.val().length > 0) {
					thisContent = inputHidden.val().split(",");  //将input中的内容转换为数组
				}
				else {
					thisContent = new Array;
				}
				if ($(this).hasClass("selected")) {
					$(this).removeClass("selected");
					if (isContain($(this).html(), thisContent)) {  //如果数组中包含该选项
						thisContent.splice(isContain($(this).html(), thisContent) - 1, 1);  //删除该项
					};
				}
				else {
					$(this).addClass("selected");
					if (!isContain($(this).html(), thisContent)) {  //如果数组中不包含该选项
						thisContent.push($(this).html());  //添加至数组末尾
					};
				}
				inputHidden.val(thisContent.join());  //将数组内容写入input
			})
		})
		// 判断数组是否包含某项
		function isContain (content, array) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] == content) {
					return i + 1;
				};
			};
			return false;
		}
	};
}


// 合作页面表单验证
function cooperateSubmit () {
	if ($(".cooperate").length > 0) {
		var ifEmpty = new Array(1, 1, 1);
		var flag = 1;
		if ($(".settled .row .identity input").val().length <= 0) {  //判断“您的身份”是否为空
			ifEmpty[0] = 0;
		};
		if ($(".settled .row .wannabe input").val().length <= 0) {  //判断“您想成为”是否为空
			ifEmpty[1] = 0;
		};
		if ($(".settled .row .phone input").val().length <= 0) {  //判断“联系方式”是否为空
			ifEmpty[2] = 0;
		};
		for (var i = 0; i < ifEmpty.length; i++) {
			flag = flag * ifEmpty[i];
		};
		if (flag) {  //如果都不为空，返回true
			$(".settled .error").html("");
			return true;
		}
		else {  //如果有一项为空，根据具体情况提示相应错误文案，并返回false
			if (!ifEmpty[0]) {
				$(".settled .error").html("请选择您的身份");
			};
			if (!ifEmpty[1]) {
				$(".settled .error").html("请选择您期望的合作形式");
			};
			if (!ifEmpty[2]) {
				$(".settled .error").html("请留下您的联系方式");
			};
			if (!ifEmpty[0] && !ifEmpty[1]) {
				$(".settled .error").html("请选择您的身份、您期望的合作形式");
			};
			if (!ifEmpty[1] && !ifEmpty[2]) {
				$(".settled .error").html("请选择您期望的合作形式，并留下您的联系方式");
			};
			if (!ifEmpty[0] && !ifEmpty[2]) {
				$(".settled .error").html("请选择您的身份，并留下您的联系方式");
			};
			if (!ifEmpty[0] && !ifEmpty[1] && !ifEmpty[2]) {
				$(".settled .error").html("请选择您的身份、您期望的合作形式，并留下您的联系方式");
			};
			return false;
		}
	}
}


// 表单提交成功
function submitSuccess (text) {
	var btn = $(".cooperate .settled .button a");
	var originText = btn.find("span").html();
	btn.removeClass("success");
	btn.removeClass("fail");
	btn.addClass("success");
	btn.find("span").html(text);
	$(".cooperate .settled input[type='text'], .cooperate .settled textarea").val("");
	$(".cooperate .settled .group a").removeClass("selected");
	$(".cooperate .settled .group input[type='hidden']").val("");
	var timer = setTimeout(function () {
		btn.removeClass("success");
		btn.find("span").html(originText);
	},3000);
}


// 表单提交失败
function submitError (text) {
	var btn = $(".cooperate .settled .button a");
	var originText = btn.find("span").html();
	btn.removeClass("success");
	btn.removeClass("fail");
	btn.addClass("fail");
	btn.find("span").html(text);
	var timer = setTimeout(function () {
		btn.removeClass("fail");
		btn.find("span").html(originText);
	},3000);
}






//*********************************************************************//
//                              基础功能                               //
//*********************************************************************//


// 获取屏幕宽度，判断设备类型
function getWinSize () {
	var phoneLandscape = 568, padPortrait = 768, padLandscape = 1024, pc = 1200;  //响应式断点
	var winWidth = $(window).width();
	if (winWidth < phoneLandscape) {  //手机竖屏
		return 1;
	}
	else if(winWidth >= phoneLandscape && winWidth < padPortrait) {  //手机横屏
		return 2;
	}
	else if(winWidth >= padPortrait && winWidth < padLandscape) {  //平板
		return 3;
	}
	else if(winWidth >= padLandscape && winWidth < pc) {  //平板
		return 4;
	}
	else {  //PC
		return 5;
	}
}


// 锚链接平滑滚动
function smoothSlide () {
	$("a[href*='#']").click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $("[name=" + this.hash.slice(1) + "]");
			if (this.hash.slice(1)){
				if($target.length){
					var targetOffset = $target.offset().top;
					$("html,body").animate({
						scrollTop: targetOffset
					},300);
				}
			}
			else{
				$("html,body").animate({
					scrollTop: 0
				},300);
			}
			return false;  //防止页面跳动
		}
	});	
}


// 限制输入文字长度
function inputLimitLength () {	// textarea标签的maxlength属性在IE9及更低浏览器中无效
    $('textarea').focus(function () {
        limitLength($(this));
    });
    function limitLength (thisObj) {
        var maxLength = thisObj.attr('maxlength'), thisContent;
        thisObj.keyup(function () {
            thisContent = thisObj.val()
            if (thisContent.length > maxLength) {
                thisObj.val(thisContent.substring(0,maxLength));
            }
        });
    }
}


// 非HTML5浏览器提示
function nonHtml5 () {
	var explorer = explorerType(false);
	if (explorer["type"] == "ie" && explorer["version"] < 9) {
		$("body").addClass("non_html5_bg");
		$("body").html("<div class='non_html5'><div class='logo'></div><h1>请使用支持html5的浏览器打开</h1><p>比如：<a href='http://down.tech.sina.com.cn/content/40975.html' target='_blank'>谷歌浏览器</a>、<a href='https://www.mozilla.org/zh-CN/firefox/new/' target='_blank'>火狐浏览器</a>，或者当前浏览器的极速模式</p></div>");
	};
}


// 判断浏览器类型与版本
function explorerType (detailed) { //参数控制是否显示浏览器完整版本号
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    if (detailed) {
		if (Sys.ie) return {"type":"ie","version":Sys.ie};
		else if (Sys.firefox) return {"type":"firefox","version":Sys.firefox};
		else if (Sys.chrome) return {"type":"chrome","version":Sys.chrome};
		else if (Sys.opera) return {"type":"opera","version":Sys.opera};
		else if (Sys.safari) return {"type":"safari","version":Sys.safari};
		else return {"type":"null","version":"0"};
    }
    else {
		if (Sys.ie) return {"type":"ie","version":parseInt(Sys.ie.split(".")[0])};
		else if (Sys.firefox) return {"type":"firefox","version":parseInt(Sys.firefox.split(".")[0])};
		else if (Sys.chrome) return {"type":"chrome","version":parseInt(Sys.chrome.split(".")[0])};
		else if (Sys.opera) return {"type":"opera","version":parseInt(Sys.opera.split(".")[0])};
		else if (Sys.safari) return {"type":"safari","version":parseInt(Sys.safari.split(".")[0])};
		else return {"type":"null","version":"0"};
    }
}







//*********************************************************************//
//                              插件效果                               //
//*********************************************************************//


// flexslider
function flexslider () {
	if ($(".flexslider").length > 0 && getWinSize() > 2) {
		$(".flexslider").show();
		$(".flexslider").flexslider({
			animation: "fade",
			slideshow: true,
			slideshowSpeed: 3000,
			animationDuration: 200,
			directionNav: false,
			controlNav: false,
			keyboardNav: true,
			mousewheel: false,
			pauseOnAction: true,
			pauseOnHover: true
		});
	};
}