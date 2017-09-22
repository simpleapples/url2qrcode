function display(title, shortURL) {
	$('#short-url-input').val(shortURL);
	$('#copy-text-input').val(title + ' ' + shortURL);
	$('#click-copy').show();
}

function displayError(error) {
	$('#short-url-input').val(error).attr('readonly', true);
}

function shortWithBaidu(url, successHandler, errorHandler) {
	$.ajax({
		type: 'POST',
		url: 'http://dwz.cn/create.php',
		data: {'url': url, 'alias': '', 'access_type': 'web'},
		success: function(result) {
			var jsonObject = JSON.parse(result);
			if (jsonObject['status'] == 0 && jsonObject['tinyurl']) {
				successHandler(jsonObject['tinyurl'])
			} else {
				errorHandler('该页没有短网址');
			}
		},
		error: function(err) {
			errorHandler('生成失败请重试');
		}
	});
}

function shortWithWeibo(url, successHandler, errorHandler) {
	$.ajax({
		type: 'GET',
		url: 'https://api.weibo.com/2/short_url/shorten.json',
		data: {'access_token': '2.00cE3vmB0xEHgja95e16ac111N57UC', 'url_long': url},
		success: function(result) {
			var jsonObject = result;
			if (jsonObject.urls && jsonObject.urls[0]) {
				successHandler(jsonObject.urls[0].url_short);
			} else {
				errorHandler('该页没有短网址');
			}
		},
		error: function(err) {
			errorHandler('生成失败请重试');
		}
	});
}

chrome.tabs.getSelected(null, function(tab) {
	if (!tab.url.startsWith('http')) {
		displayError('请打开一个网页');
	} else {
		$('#qrcode-box').qrcode({
			width: 200,
			height: 200,
			text: tab.url
		});
		shortWithBaidu(tab.url, function(shortURL) {
			display(tab.title, shortURL);
		}, function(err) {
			shortWithWeibo(tab.url, function(shortURL) {
				display(tab.title, shortURL);
			}, function(err) {
				displayError(err);
			});
		});
	}
});

$('#click-copy').click(function() {
	$('#copy-text-input').select();
	document.execCommand('Copy');
	$('#click-copy').text('完成');
});