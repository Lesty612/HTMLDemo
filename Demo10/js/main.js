function init() {
	var data = [
		{
			id: '1',
			type: 'forecast',
			count: '100'
		},
		{
			id: '2',
			type: 'preview',
			count: '130'
		},
		{
			id: '3',
			type: 'forecast',
			count: '200'
		},
		{
			id: '4',
			type: 'preview',
			count: '110'
		}
	];
	CallStage.init(data);
}



var CallStage = (function() {
	// 提示框
	var $tips = $('#progressTips');
	// 总进度条
	var $progress = $('#callProgress');
	// 进度flag标志位
	var flagHTML_G = '<div class="flag-box" id="flagBox"><em class="flag"></em></div>'
	// 当前策略id(G:全局)
	var curId_G = '';

	/**
	 * [init 初始化进度表]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	function init(data) {
		// 构建进度表
		createProgress(data);
		regEvent();
		// 开始轮询拨打阶段信息
		queryCallStage();
	}

	/**
	 * [createProgress 构建进度表]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	function createProgress(data) {
		var sum = 0;
		var tmpInfo = null;
		var tmpPercent = 0;
		var tmpHtml = '';
		var appendHtml = '';

		// 求和
		data.forEach(function(item) {
			sum += parseInt(item.count, 10);
		});

		for(var i = 0, len = data.length; i < len; i++) {
			tmpInfo = data[i];
			tmpPercent = ((parseInt(tmpInfo.count, 10) / sum) * 100).toFixed(2);
			// 预测
			if(tmpInfo.type === 'forecast') {
				tmpHtml = '<div class="forecast" id="strategy' + tmpInfo.id + '" data-count="' + tmpInfo.count + '" data-remain="' + tmpInfo.count + '" style="width:' + tmpPercent + '%;"><span></span></div>';
			} else if(tmpInfo.type === 'preview') {
				tmpHtml = '<div class="preview" id="strategy' + tmpInfo.id + '" data-count="' + tmpInfo.count + '" data-remain="' + tmpInfo.count + '" style="width:' + tmpPercent + '%;"><span></span></div>';
			}

			appendHtml += tmpHtml;
		}

		$progress.html(appendHtml);
		$progress.find('div:eq(0)').addClass('active');
	}

	/**
	 * [queryCallStage 轮询拨打阶段信息]
	 * @return {[type]} [description]
	 */
	function queryCallStage() {
		var _arguments = arguments;
		if(_arguments.callee.count != null && _arguments.callee.count < 10) {
			_arguments.callee.count++;
		} else {
			_arguments.callee.count = 1;
		}

		var data = {
			id: (_arguments.callee.count < 6 ? '1' : '2'),
			calledCount: (10 * _arguments.callee.count)
		};

		// 如果策略更换，则替换curId_G
		// 同时修改相应策略样式(激活)
		if(curId_G !== data.id) {
			curId_G = data.id;
			// 移除上个策略的flag
			$('#flagBox').remove();
			$('#strategy' + curId_G).addClass('active').append(flagHTML_G);

			// 绑定事件
			$('#flagBox').hover(function(event) {
				event.stopPropagation();
				$('#flagTips').fadeIn();
			}, function(event) {
				event.stopPropagation();
				$('#flagTips').hide();
			});
		}

		var $curProgress = $('#strategy' + curId_G);
		var allCount = parseInt($curProgress.data('count'), 10);
		// 设置剩余数量
		$curProgress.data('remain', allCount - data.calledCount);

		// 如果鼠标悬停的是当前正在执行策略，则刷新提示
		if(('strategy' + curId_G) === $tips.data('curId')) {
			refreshTips('strategy' + curId_G);
		}

		// 设置旗子位置
		setFlagPosition(data.calledCount, allCount, $curProgress.outerWidth());

		setTimeout(function() {
			_arguments.callee();
		}, 3000);
	}

	/**
	 * [setFlagPosition 设置旗子位置]
	 */
	function setFlagPosition(calledCount, allCount, progressWidth) {
		var $flagBox = $('#flagBox');
		var left = ((calledCount / allCount * progressWidth).toFixed(2) - 8) + 'px';
		$flagBox.css({
			left: left
		});

		var $flag = $('#flagTips');
		var html = '已拨打数量：<span>' + calledCount +'</span>';
		// 计算提示框需要显示的位置
		var clientRectObj = $flagBox.get(0).getBoundingClientRect();
		var top = (clientRectObj.top + ($flagBox.outerHeight() - $flag.outerHeight()) / 2) + 'px';
		var left = (clientRectObj.right + 11) + 'px';

		// 设置flag提示内容
		$flag.css({
			top: top,
			left: left
		}).children('.content').html(html);
	}

	/**
	 * [refreshTips 刷新提示框]
	 */
	function refreshTips(progressId) {
		var $curProgress = $('#' + progressId);
		// 设置提示内容(必须先设置内容，后计算位置，否则获取提示框宽度时会出错)
		var html = '名单总量：<span>' + $curProgress.data('count') + '</span><br>剩余数量：<span>' + $curProgress.data('remain') +'</span>';
		$tips.children('.content').html(html);
	}

	function regEvent() {
		$progress.children('div').hover(function() {
			var $tips = $('#progressTips');
			var $curProgress = $(this);

			// 提示框缓存当前策略id
			$tips.data('curId', $curProgress.attr('id'))
			// 刷新提示信息
			CallStage.refreshTips($curProgress.attr('id'));

			// 计算提示框需要显示的位置
			var clientRectObj = this.getBoundingClientRect();
			var top = (clientRectObj.bottom + 11) + 'px';
			var left = (clientRectObj.left + (this.offsetWidth - $tips.outerWidth()) / 2) + 'px';

			// 显示提示框
			$tips.css({
				top: top,
				left: left
			}).fadeIn();
		}, function() {
			var $tips = $('#progressTips');
			$tips.hide();
		});
	}

	return {
		init: init,
		refreshTips: refreshTips
	};
})();

window.onload = init;