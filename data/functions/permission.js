var Discord = require('discord.js');

try { var fs = require('fs'); }
	catch (err) { console.log('Missing fs plugin!'); }

try { var extfs = require('extfs'); }
	catch (err) { console.log('Missing extfs plugin!'); }

const utilityFunctions = require('..\\utilityFunctions.js');

var cnt = {
	perm: 2,

	name: 'permission',
	usage: '!permission | !permission <add/remove> <role>',
	description: '!permission handles everything around the permission system, which is used for moderative and administrative commands. permissions are handled via roles, which you can <add/remove> via suffix. to see which roles currently hold permissions, leave the suffix empty.',

	process: function(Yuutsu, msg, suffix, path) {
		var srvF = utilityFunctions.data.getServerFile(msg, path);
		var fnc = '';

		// Translate Type of Action
		suffix.includes('add') ? fnc = 'a' : '';
		suffix.includes('remove') ? fnc = 'r' : '';

		switch (fnc) {
			case 'a': {
				var role = msg.guild.roles.find("name", suffix.substring(4));

				// Make sure Role exists
				if (role == null) { break; }

				// Make sure Role isnt already added to the list
				for (var i = 0; i < srvF.permission.length; i++) { if (role.id == srvF.permission[i]) { return; } }

				// Push Array with new Role
				srvF.permission.push(role.id);
				fs.writeFileSync(path + '\\data\\server_data\\' + msg.guild.id + '.json', JSON.stringify(srvF));
				msg.channel.send('> [ ' +role.name + ' ] has been added to the permission list!');

				break;
			}
			case 'r': {
				var role = msg.guild.roles.find("name", suffix.substring(7));

				// Make sure Role exists
				if (role == null) { break; }

				// Find Position of the Role in Array
				for (var i = 0; i < srvF.permission.length; i++) {
					if (role.id == srvF.permission[i]) {

						// Remove Entry on current Position
						srvF.permission.splice(i, 1);
						fs.writeFileSync(path + '\\data\\server_data\\' + msg.guild.id + '.json', JSON.stringify(srvF));
						msg.channel.send('> [ ' + role.name + ' ] has been removed from the permission list!');
					}
				}

				break;
			}

			default: {
				var prmRoles = '> | ';

				for (var i = 0; i < srvF.permission.length; i++) { prmRoles += msg.guild.roles.get(srvF.permission[i]).name + ' | '; }
				msg.channel.send(prmRoles);

				break;
			}
		}
	},
};

exports.data = cnt;
