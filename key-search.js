var bitcoin = require('bitcoinjs-lib');
var clc = require('cli-color');

process.stdin.setEncoding('utf8');

function searchForKey(targetAddress) {
	var found = "";
	var bestKey = undefined;

	var i = 0;
	while (true) {
		var keyPair = bitcoin.ECPair.makeRandom();
		var curAddress = keyPair.getAddress();

		var score;
		for (score = 0; curAddress.charAt(score) == targetAddress.charAt(score); score++) { }

		if (score > found.length) {
			bestKey = keyPair;
			found = curAddress.substring(0, score);
		}

		if (score == targetAddress.length) {
			console.log("FOUND!")
			console.log(curAddress);
			console.log(keyPair.toWIF());
			process.exit(0);
		}

		if (i++ % 30 != 0) {
			continue;
		}

		// Merge keys into fun display format
		var display = clc.red(found) + curAddress.substring(found.length);
		console.log(display);
	}
}

var address = "";

process.stdin.on('readable', () => {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		address += chunk.trim();
	}
});

process.stdin.on('end', () => {
	searchForKey(address);
});



