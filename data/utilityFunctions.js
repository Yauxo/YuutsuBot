var Discord = require('discord.js');

try { var fs = require('fs'); }
	catch (err) { console.log('Missing fs plugin!'); }

try { var extfs = require('extfs'); }
	catch (err) { console.log('Missing extfs plugin!'); }

var cnt = {

	//////////////////////////////////////////////////
	//////////////// GENERAL STUFF ///////////////////
	//////////////////////////////////////////////////

	getTime: function() {
		var date = new Date();

		var h = date.getHours().toString();
		if (h.length < 2) { h = '0' + h; }

		var m = date.getMinutes().toString();
		if (m.length < 2) { m = '0' + m; }

		var s = date.getSeconds().toString();
		if (s.length < 2) { s = '0' + s; }

		var finalTime = h + ':' + m + ':' + s + ' ';

		return finalTime;
	},

	//////////////////////////////////////////////////
	//////////////// IMPORTANT STUFF /////////////////
	//////////////////////////////////////////////////

	getServerFile: function(msg, path) {
		try { var serverFile = require(path + '\\data\\server_data\\' + msg.guild.id + '.json'); }
			catch (err) { console.log(err); return; }

		return serverFile;
	},

	checkPermission: function(msg, strength, path) {
		var srvF = cnt.getServerFile(msg, path);

		// Check for high rank Permission (Yauxo or Server Owner)
		if (msg.author.id === '115941671568408582' || msg.author.id === msg.guild.ownerID) {
			return 2;
		} else { // Check for mid rank Permission (Permission Role)
			for (var i = 0; i < srvF.permission.length; i++) {
				if (msg.member.roles.has(srvF.permission[i])) {
					return 1;
				}
			}

			// Author has neither Permission, nor owns the Server
			return 0;
		}
	},

	createGuildData: function(guild, path) {
		if (extfs.isEmptySync(path + '\\data\\server_data\\' + guild.id + '.json')) {

			// Take the base File and create a new one for the Server
			var cFile = fs.createReadStream(path + '\\data\\server_data\\x_Base.json');
			var newFile = fs.createWriteStream(path + '\\data\\server_data\\' + guild.id + '.json');
			cFile.pipe(newFile);

			console.log(cnt.getTime() + 'Created new Server: ' + guild.id + ' // ' + guild.name);
		}
	}
};

exports.data = cnt;
