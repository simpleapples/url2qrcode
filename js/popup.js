chrome.tabs.getSelected(null, function(tab) {
	$('#qrcode-box').qrcode({
		width: 200,
		height: 200,
		text: tab.url
	});
	var backgroundPage = chrome.extension.getBackgroundPage();
	backgroundPage.getShortUrl(tab.url, function(result) {
		var jsonObject = JSON.parse(result);
		if (jsonObject.status == 0 && jsonObject.tinyurl) {
			$('#short-url-input').val(jsonObject.tinyurl);
			$('#click-copy').show();
		} else {
			$('#short-url-input').val('该页没有短网址').attr('readonly', true);
		}
	});
});

$('#click-copy').click(function() {
	$('#short-url-input').select();
	document.execCommand('Copy');
	$('#click-copy').text('完成');
});