var Discord = require('discord.js');

try { var fs = require('fs'); }
	catch (err) { console.log('Missing fs plugin!'); }

try { var extfs = require('extfs'); }
	catch (err) { console.log('Missing extfs plugin!'); }

const utilityFunctions = require('..\\utilityFunctions.js');

var cnt = {
	perm: 2,

	name: 'prefix',
	usage: '!prefix | !prefix <set> <prefix>',
	description: '!prefix lets you check the current, and <set> a completely new prefix for the bot to listen to.',

	process: function(Yuutsu, msg, suffix, path) {
		var srvF = utilityFunctions.data.getServerFile(msg, path);
		var fnc = '';

		// Translate Type of Action
		suffix.includes('set') ? fnc = 's' : '';

		switch (fnc) {
			case 's': {
				var prefix = suffix.substring(4);

				// Make sure Prefix is not empty and not longer than 1 Character
				if (prefix.length != 1) { msg.channel.send('> prefix cannot be shorter or longer than one character'); break; }

				// Update Prefix
				srvF.prefix = prefix;
				msg.channel.send('> prefix was changed to [ ' + srvF.prefix + ' ]');

				// Update File
				fs.writeFileSync(path + '\\data\\server_data\\' + msg.guild.id + '.json', JSON.stringify(srvF));

				break;
			}

			default: { msg.channel.send('> current prefix for this server is [ ' + srvF.prefix + ' ]'); }
		}
	},
};

exports.data = cnt;
