chrome.tabs.getSelected(null, function(tab) {
	$('#qrcode-box').qrcode({
		width: 200,
		height: 200,
		text: tab.url
	});
});

$('#click-copy').click(function() {
	$('#copy-text-input').select();
	document.execCommand('Copy');
	$('#click-copy').text('完成');
});