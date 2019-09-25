var Discord = require('discord.js');

var cnt = {
	perm: 0,

	name: 'ping',
	usage: '!ping',
	description: '!ping does ping, bot does pong.',

	process: function(Yuutsu, msg, suffix) {
		msg.channel.send('pong!');
	},
};

exports.data = cnt;
