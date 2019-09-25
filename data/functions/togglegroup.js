var Discord = require('discord.js');

try { var fs = require('fs'); }
	catch (err) { console.log('Missing fs plugin!'); }

try { var extfs = require('extfs'); }
	catch (err) { console.log('Missing extfs plugin!'); }

const utilityFunctions = require('..\\utilityFunctions.js');

var cnt = {
	perm: 1,

	name: 'togglegroup',
	usage: '!togglegroup | !togglegroup <group>',
	description: '!togglegroup toggles the availability of a group if a <group> is given - this enables or disables different functionalities. to see the state of the groups, leave the suffix empty.',

	process: function(Yuutsu, msg, suffix, path) {
		var srvF = utilityFunctions.data.getServerFile(msg, path);

		// List all available Groups and their State
		if (suffix == '') {
			var txt = '```';

			for (var i = 0; i < Object.keys(srvF.groups).length; i++) {
				txt += Object.keys(srvF.groups)[i] + ': ' + Object.values(srvF.groups)[i] + '\n';
			}

			msg.channel.send(txt + '```');
			return;
		}

		// Check if Group exists
		if (srvF.groups.hasOwnProperty(suffix)) {

			// Toggle the Group
			srvF.groups[suffix] = !srvF.groups[suffix];

			// Update File
			fs.writeFileSync(path + '\\data\\server_data\\' + msg.guild.id + '.json', JSON.stringify(srvF));

			msg.channel.send('> ' + suffix + ' is now set to [ ' + srvF.groups[suffix] + ' ]');
		} else { msg.channel.send('> no such group exists'); }

		// Change Nickname depending on uwu Mode
		switch(srvF.groups.uwu) {
			case true: msg.guild.me.setNickname("Anekuwu"); break;
			case false: msg.guild.me.setNickname("Aneko"); break;
		}
	},
};

exports.data = cnt;
