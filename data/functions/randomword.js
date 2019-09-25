var Discord = require('discord.js');

try { var a_randomWord = require('random-word'); }
	catch (err) { console.log('Missing random-word (abstract) plugin!'); }
try { var c_randomWord = require('random-words'); }
	catch (err) { console.log('Missing random-words (common) plugin!'); }

var cnt = {
	perm: 0,

	name: 'randomword',
	usage: '!randomword | !randomword <common/uwu>',
	description: '!randomword outputs a random english word.',

	process: function(Yuutsu, msg, suffix, path) {
		switch (suffix) {
			case 'common': msg.channel.send('> ' + c_randomWord()); break;
			case 'uwu': {
				var uwu = require(path + '\\data\\functions\\uwuify.js');
				msg.channel.send('> ' + uwu.data.process(a_randomWord()));
				break; }

			default: msg.channel.send('> ' + a_randomWord()); break;
		}
	},
};

exports.data = cnt;
