#!/bin/sh

CYPHER=aes-256-cbc
JS_SCRIPT=new-key-pair.js

if [ ! -e "$JS_SCRIPT" ]
then
		echo "generate.sh must be run in directory with $JS_SCRIPT"
		exit 1
fi

npm install

OUT=`node $JS_SCRIPT`

ADDRESS=`echo "$OUT" | head -n 1`
PRIV_KEY=`echo "$OUT" | tail -n 1`
ENC_KEY=`echo "$PRIV_KEY" | openssl enc -$CYPHER -a -salt -e`

# BEGIN PRINTING OUTPUT

echo "# $ADDRESS"
echo ""
echo "You can check the current balance of this wallet at"
echo "https://blockchain.info/address/$ADDRESS."
echo ""
echo "This is the encrypted private key for this wallet."
echo ""
echo "\`\`\`"
echo "$ENC_KEY"
echo "\`\`\`"
echo ""
echo "It is encryped using $CYPHER and a password."
echo ""
echo "The following command was used to cypher-encode the private key."
echo ""
echo "\`\`\`sh"
echo "openssl enc -$CYPHER -a -salt"
echo "\`\`\`"
echo ""
echo "You should be able to decode the key with the following command."
echo ""
echo "\`\`\`sh"
echo "openssl enc -$CYPHER -a -salt -d"
echo "\`\`\`"
