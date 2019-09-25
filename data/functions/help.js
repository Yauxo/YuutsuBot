var Discord = require('discord.js');

try { var fs = require('fs'); }
	catch (err) { console.log('Missing fs plugin!'); }

var cnt = {
	perm: 0,

	name: 'help',
	usage: '!help | !help <command>',
	description: '!help will give you a great overview of all the commands and their categories that you can use with this bot. if you want specific informations about a command, use the command name as a suffix, just like you did with this one.',

	process: function(Yuutsu, msg, suffix, path) {
		var files = fs.readdirSync(path + '\\data\\functions\\');

		if (suffix) {
			for (var i = 0; i < files.length; i++) {
				if (suffix  == files[i].substring(0, files[i].length - 3)) {
					var file = require(path + '\\data\\functions\\' + files[i]);
					var perm;

					switch (file.data.perm) {
						case 0: perm = 'Basic'; break;
						case 1: perm = 'Moderative'; break;
						case 2: perm = 'Administrative'; break;
					}

					msg.channel.send('```\nCommand Name: ' + file.data.name + ' [' + perm + ']\nCommand Usage: ' + file.data.usage + '``` ```-- Description --\n' + file.data.description + '```');

					return;
				}
			}
		} else {
			var basic = '```\n';
			var moderative = '```\n';
			var administrative = '```\n';

			for (var i = 0; i < files.length; i++) {
				var file = require(path + '\\data\\functions\\' + files[i]);

				switch (file.data.perm) {
					case 0: basic += ('[Basic] ' + file.data.name + '\n'); break;
					case 1: moderative += ('[Moderative] ' + file.data.name + '\n'); break;
					case 2: administrative += ('[Administrative] ' + file.data.name + '\n'); break;
				}
			}

			basic += '```';
			moderative += '```';
			administrative += '```';

			msg.channel.send(basic + moderative + administrative);
		}
	},
};

exports.data = cnt;
