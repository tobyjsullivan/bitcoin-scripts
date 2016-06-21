var bitcoin = require('bitcoinjs-lib');
var keyPair = bitcoin.ECPair.makeRandom();

console.log(keyPair.getAddress())
console.log(keyPair.toWIF())
