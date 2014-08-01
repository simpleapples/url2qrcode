chrome.tabs.getSelected(null, function(tab) {
	var qrcodeBox = document.getElementById('qrcode-box');
	qrcodeBox.style.backgroundImage = 
	'url(http://qr.liantu.com/api.php?&m=10&w=200' 
	+ '&bg=ffffff&fg=000000&gc=000000&el=L&text=' 
	+ tab.url + ')';
});