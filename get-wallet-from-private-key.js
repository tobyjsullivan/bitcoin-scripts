var bitcoin = require('bitcoinjs-lib');

process.stdin.setEncoding('utf8');

var key = "";

process.stdin.on('readable', () => {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		key += chunk.trim();
	}
});

process.stdin.on('end', () => {
	var keyPair = bitcoin.ECPair.fromWIF(key);
	console.log(keyPair.getAddress());
});

