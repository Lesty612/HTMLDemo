/**
 * [实现轮播图切换]
 * @author Zhengqiyu --Lesty
 * @code-date 2015.10.9
 */
var a = document.getElementById("picFocus"),
	b = document.getElementById("picList"),
	// 单张轮播图片可视高度
	picHeight = b.getElementsByTagName("li")[2].offsetHeight,
	c = document.getElementById("ctrlList"),
	// 所有小图集合
	liSet = c.getElementsByTagName("li"),
	// 标识当前图片所在位置的元素(通过外围边框效果来突出)
	curFlag = document.getElementById("curFlag"),
	// 上一个图片索引
	prevPos = 0,
	// 当前图片索引
	curPos = 1,
	// 计时器
	timer = null;

/**
 * [init 初始化程序]
 */
function init() {
	// 注册事件
	regEvent();
	// 开始移动
	startMove();
}

/**
 * [movePic 移动图片到下一位置，每次加1]
 */
function movePic() {
	curPos %= 3;

	moveToPic(curPos);
}

/**
 * [moveToPic 移动到特定的图片位置]
 * @param  {Number} picPos [需要移动到的图片位置]
 */
function moveToPic(picPos) {
	curPos = picPos;

	// 修改小图控制区域的透明度
	liSet[prevPos].style.opacity = 0.5;
	liSet[curPos].style.opacity = 1;

	// 通过当前位置控制图片(包括轮播图和小图)以及curFlag切换
	switch(curPos) {
		case 0:
			b.style.marginTop = "0px";
			curFlag.style.top = "0";
			break;
		case 1:
			b.style.marginTop = "-" + picHeight  + "px";
			curFlag.style.top = "58px";
			break;
		case 2:
			b.style.marginTop = "-" + (picHeight * 2)  + "px";
			curFlag.style.top = "116px";
			break;
		default:
			curPos = 0;
			break;
	}

	prevPos = curPos;
	curPos++;
}

/**
 * [startMove 启动计时器并开始移动]
 */
function startMove() {
	timer = setInterval(movePic, 3000);
}

/**
 * [regEvent 注册事件]
 */
function regEvent() {
	var liEle = null;

	// 为li集合都注册事件
	for(var i = liSet.length; i--; ) {
		liEle = liSet[i];
		// 使用闭包，否则只有最后一个li会成功注册
		(function(liEle, i) {
			liEle.onmouseover = function() {
				clearInterval(timer);
				moveToPic(i);
			};

			liEle.onmouseout = function() {
				startMove();
			};
		})(liEle, i);
	}
}

// 绑定onload事件
window.onload = init();