var Discord = require('discord.js');

try { var fs = require('fs'); }
	catch (err) { console.log('Missing fs plugin!'); }

const utilityFunctions = require('./utilityFunctions.js');

var cnt = {
	processMessage: function(Yuutsu, msg, path) {

		// Grab Command and Suffix from the Message
		var command = msg.content.split(' ')[0].substring(1); 	// !>do< something
		var suffix = msg.content.substring(command.length+2);	// !do >something<

		// Check if File exists
		if (!fs.existsSync(path + '\\data\\functions\\' + command + '.js')) { return; }

		// Prepare Filepath for the Command
		var fnc = require(path + '\\data\\functions\\' + command + '.js');

		switch (fnc.data.perm) {
			case 2: // Check if the User has the correct Permission Value
			case 1: if (utilityFunctions.data.checkPermission(msg, fnc.data.perm, path) < fnc.data.perm) { break; }

			// Process further to the Command
			default: fnc.data.process(Yuutsu, msg, suffix, path);
		}
	}
}

exports.data = cnt;
