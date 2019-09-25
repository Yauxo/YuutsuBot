var Discord = require('discord.js');

var cnt = {
	permission: 0, // this being written wrong actually removes it from the list, which is cool I guess

	name: 'uwuify',
	usage: 'Usage Text',
	description: 'internal function that im too lazy to move to the right place',

	process: function(msg_raw) {
		// Make sure that the Message is a String
		msg_str = msg_raw.toString();

		// Replace with degenerate Speechpatterns
		msg_str = msg_str.replace(/love/gi, 'wuv');
		msg_str = msg_str.replace(/o/gi, 'wo').replace(/na/gi, 'nya').replace(/no/gi, 'nyo').replace(/ne/gi, 'nye').replace(/ni/gi, 'nyi').replace(/nu/gi, 'nyu');
		msg_str = msg_str.replace(/r|l/gi, 'w');
		msg_str = msg_str.replace(/\!/gi, ' ^w^ ').replace(/\?/gi, ' ;;w;; ');

		// Add extra degenerate at the end of the Sentence
		var rng = Math.floor((Math.random() * 60) + 1);

		switch (rng) {
			case 1: msg_str = msg_str.replace(/\./gi, ' >///<'); break;
			case 2: msg_str = msg_str.replace(/\./gi, ' >-<'); break;
			case 3: msg_str = msg_str.replace(/\./gi, ' xD'); break;
			case 4: msg_str = msg_str.replace(/\./gi, ' ^^'); break;

			default: msg_str = msg_str.replace(/\./gi, ' uwu'); break;
		}

		// Return degenerate Message
		return msg_str;
	}
};

exports.data = cnt;
