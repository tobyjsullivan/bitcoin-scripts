var bitcoin = require('bitcoinjs-lib');
var clc = require('cli-color');
var BigInteger = require('bigi');

process.stdin.setEncoding('utf8');

var cont = true;

const arr = new Uint8Array(32);
var buff = Buffer.from(arr.buffer);
function randKey() {
	for (var i = 0; i < 32; i++) {
		arr[i] = Math.floor(Math.random() * 4294967296);
	}
	
	return new bitcoin.ECPair(BigInteger.fromHex(buff.toString('hex')));
}

function printPair(keyPair) {
			console.log(keyPair.getAddress(), '|', keyPair.toWIF());
}

function searchForKey(targetAddress) {
	var found = "";
	var bestKey = undefined;

	var i = 0;
	while (cont) {
		var keyPair = randKey();
		var curAddress = keyPair.getAddress();

		var score;
		for (score = 0; curAddress.charAt(score) == targetAddress.charAt(score); score++) { }

		if (score > found.length) {
			bestKey = keyPair;
			printPair(bestKey);
			found = curAddress.substring(0, score);
		}

		if (score == targetAddress.length) {
			console.log("FOUND!")
			console.log(curAddress);
			console.log(keyPair.toWIF());
			process.exit(0);
		}

		if (i++ % 8 != 0) {
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



