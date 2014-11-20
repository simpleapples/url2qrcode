function getShortUrl(url, callback) {
	$.ajax({
		url: 'http://dwz.cn/create.php',
		data: {url: url},
		success: function(result) {
			callback(result);
		}
	});
}