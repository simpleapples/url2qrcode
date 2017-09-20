chrome.tabs.getSelected(null, function(tab) {
	$('#qrcode-box').qrcode({
		width: 200,
		height: 200,
		text: tab.url
	});
	$.post('http://dwz.cn/create.php', {'url': tab.url, 'alias': '', 'access_type': 'web'}, function(result) {
		var jsonObject = JSON.parse(result);
		if (jsonObject.status == 0 && jsonObject.tinyurl) {
			var tinyUrl = jsonObject.tinyurl;
			$('#short-url-input').val(tinyUrl);
			$('#copy-text-input').val(tab.title + ' ' + tinyUrl);
			$('#click-copy').show();
		} else {
			$('#short-url-input').val('该页没有短网址').attr('readonly', true);
		}
	});
});

$('#click-copy').click(function() {
	$('#copy-text-input').select();
	document.execCommand('Copy');
	$('#click-copy').text('完成');
});