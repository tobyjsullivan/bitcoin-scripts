#!/bin/sh

echo "Encrypted key: (Press CTRL-D when done)"
ENC_KEY=`cat`

PRIV_KEY=`echo "$ENC_KEY" | openssl enc -aes-256-cbc -d -salt -a`
RES=$?

if [ "$RES" == "0" ]
then
		echo "SUCCESS! Password is valid."
		WALLET=`echo "$PRIV_KEY" | node get-wallet-from-private-key.js`
		echo "The associated wallet is $WALLET"
else
		echo "FAIL! Password doesn't match"
		exit 1
fi
