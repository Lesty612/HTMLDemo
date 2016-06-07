// 页面加载完成后，调用init
window.onload = init;

// 前面加个+号，可以直接转换成毫秒数
var date = +new Date(2008, 7, 8, 8, 8, 8),
	timer = null;

function init() {
	startTiming();
	regEvent();
}

/**
 * [startTiming 启动计时器]
 */
function startTiming() {
	setDiffTime();
	timer = setInterval(setDiffTime, 1000);
}

/**
 * [pauseTiming 暂停计时器]
 */
function pauseTiming() {
	clearInterval(timer);
}

/**
 * [setDiffTime 设置间隔时间]
 */
function setDiffTime() {
	var curDate = +new Date(),
		// 转换成秒数
		diffTime = parseInt((curDate - date) / 1000, 10);

	document.getElementById('diffTime').innerHTML = diffTime;
}

/**
 * [regEvent 注册事件]
 */
function regEvent() {
	document.getElementById('startTiming').addEventListener('click', function() {
		startTiming();
	});

	document.getElementById('pauseTiming').addEventListener('click', function() {
		pauseTiming();
	});

	document.getElementById('popPic').addEventListener('click', function() {
		document.getElementById('imgContain').style.display = '';
	});

	document.getElementById('close').addEventListener('click', function() {
		document.getElementById('imgContain').style.display = 'none';
	});
}