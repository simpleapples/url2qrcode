function getShortUrl(url, callback) {
	$.post('http://dwz.cn/create.php', {url: encodeURIComponent(url)}, function(result) {
		callback(result);
	});
}