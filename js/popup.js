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
			$('#short-url-link').attr('href', jsonObject.tinyurl);
			$('#short-url-link').text(jsonObject.tinyurl);
		} else {
			$('#short-url-link').text('该页没有短网址');
		}
	});
});