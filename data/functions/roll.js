var Discord = require('discord.js');

var cnt = {
	perm: 0,

	name: 'roll',
	usage: '!roll | !roll <number>',
	description: '!roll rolls a random number from 1-100. if a suffix is given, it\'ll roll until that number instead.',

	process: function(Yuutsu, msg, suffix) {
		var num;

		// Roll a Number depending on Input
		suffix ? num = Math.floor((Math.random() * suffix) + 1) : num = Math.floor((Math.random() * 100) + 1);

		// Answer with the Roll
		msg.channel.send(':game_die: ' + msg.author.username + ' has rolled a **' + num + '**!');
	},
};

exports.data = cnt;
