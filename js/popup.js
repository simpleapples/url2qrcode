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
		url: 'https://dwz.cn/admin/create',
		data: JSON.stringify({url: url}),
		contentType: 'application/json; charset=utf-8',
        dataType: 'json',
		success: function(result) {
			if (result['Code'] == 0 && result['ShortUrl']) {
				successHandler(result['ShortUrl'])
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
			displayError(err);
		});
	}
});

$('#click-copy').click(function() {
	var urlText = $('#copy-text-input').val();
	navigator.clipboard.writeText(urlText).then(() => {
		$('#click-copy').text('完成');
	}).catch((err) => {
		$('#click-copy').text('失败');
	});
});