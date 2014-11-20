chrome.tabs.getSelected(null, function(tab) {
	$('#qrcode-box').qrcode({
		width: 200,
		height: 200,
		text: tab.url
	});
	var backgroundPage = chrome.extension.getBackgroundPage();
	backgroundPage.getShortUrl(tab.url, function(result) {
		console.log('---', result);
	});
});