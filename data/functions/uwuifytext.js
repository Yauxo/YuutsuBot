var Discord = require('discord.js');

var cnt = {
	perm: 0,

	name: 'uwuifytext',
	usage: '!uwuifytext <text>',
	description: "!uwuifytext translates a the given <text> into uwuspeak.",

	process: function(Yuutsu, msg, msg_raw) {
		// Make sure that the Message is a String
		msg_str = msg_raw.toString();

		// Replace with degenerate Speechpatterns
		msg_str = msg_str.replace(/love/gi, 'wuv');
		msg_str = msg_str.replace(/o/gi, 'wo').replace(/na/gi, 'nya').replace(/no/gi, 'nyo').replace(/ne/gi, 'nye').replace(/ni/gi, 'nyi').replace(/nu/gi, 'nyu');
		msg_str = msg_str.replace(/r|l/gi, 'w');
		msg_str = msg_str.replace(/\!/gi, ' ^w^').replace(/\?/gi, ' ;;w;;').replace(/\./gi, ' uwu.');

		// Send degenerate Message
		msg.channel.send('```\n' + msg_str + '\n```');
	}
};

exports.data = cnt;
