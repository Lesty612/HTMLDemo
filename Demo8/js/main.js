/**
 * @author Lesty
 * @codeDate 2016.6.7
 * @description  [实现文件上传功能、图片缩略图预览]
 */

window.onload = init;

function init() {
	// 注册事件
	regEvent();
}

/**
 * [handleFiles 处理所有文件]
 * @param  {Array} fileList [文件列表]
 */
function handleFiles(fileList) {
	// 图片类型正则
	const IMAGE_PAT = /^image\//;
	var file = null,
		fileListElem = document.getElementById('fileList'),
		len = fileList.length;

	// 如果有文件
	if(len >= 0) {
		// 将提示信息置空
		fileListElem.querySelector('p').innerHTML = ' ';

		for(var i = 0; i < len; i++) {
			file = fileList[i];

			if(IMAGE_PAT.test(file.type) === true) {

			}


		}
	}
	console.dir(fileList);
}

/**
 * [createPreviewList 在提供的fileList元素处构建文件预览列表]
 * @param  {[type]} file         [description]
 * @param  {[type]} fileListElem [description]
 * @return {[type]}              [description]
 */
function createPreviewList(file, fileListElem) {

}

/**
 * [getFileSize 获取文件大小]
 * @param  {Object} file [一个File类型文件]
 * @return {String}      [文件大小描述]
 */
function getFileSize(file) {
		// 文件属性大小
	var fileSize = file.size,
		// 当前的size类型索引
		curSTIndex = 0,
		// 最终大小描述
		resultSize = '';

	// 文件大小类型
	const SIZE_TYPE = ["bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

	if(fileSize) {
		while(fileSize > 1023) {
			curSTIndex++;

			// 保留到小数点后3位
			fileSize = (fileSize / 1024).toFixed(3);
		}

		resultSize = fileSize + " " + SIZE_TYPE[curSTIndex];
	} else {
		resultSize = "未知大小";
	}

	return resultSize;
}

/**
 * [regEvent 注册事件]
 */
function regEvent() {
		// 上传按钮
	var uploadBtnEle = document.getElementById('uploadBtn'),
		// 上传文件Input元素
		uploadFileElem = document.getElementById('uploadFile');

	uploadBtnEle.addEventListener('click', function() {
		if(uploadFileElem) {
			uploadFileElem.click();
		}
	}, false);

	uploadFileElem.addEventListener('change', function() {
		handleFiles(this.files);
	}, false);
}