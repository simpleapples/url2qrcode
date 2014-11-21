function getShortUrl(url, callback) {
	$.post('http://dwz.cn/create.php', {url: url}, function(result) {
		callback(result);
	});
}