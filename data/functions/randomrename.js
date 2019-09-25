var Discord = require('discord.js');

try { var a_randomWord = require('random-word'); }
	catch (err) { console.log('Missing random-word (abstract) plugin!'); }

try { var c_randomWord = require('random-words'); }
	catch (err) { console.log('Missing random-words (common) plugin!'); }

var cnt = {
	perm: 0,

	name: 'randomrename',
	usage: '!randomrename | !randomrename <common/uwu>',
	description: '!randomrename changes your server nickname to a completely random one.',

	process: function(Yuutsu, msg, suffix, path) {

		// Disallow trying to rename the Server Owner as that's impossible
		if (msg.author.id === msg.guild.owner.id) { msg.channel.send('> cannot rename the server owner due to how rights are setup in discord. sorry!'); return; }

		if (msg.guild.me.hasPermission("MANAGE_NICKNAMES")) {
			switch (suffix) { // Create a new random Nickname and set it as the User's Nickname
				case 'common': msg.member.setNickname(c_randomWord()); break;
				case 'uwu': {
					var uwu = require(path + '\\data\\functions\\uwuify.js');
					msg.member.setNickname(uwu.data.process(a_randomWord()));
					break; }

				default: msg.member.setNickname(a_randomWord()); break;
			}
		} else { msg.channel.send('> cannot rename due to missing rights (MANAGE_NICKNAMES)'); }

		// Delete Message to reduce Spam (looking at you Xebaz)
		if (msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
			msg.delete(3500);
		} else { msg.channel.send('> cannot rename due to missing rights (MANAGE_NICKNAMES)'); return; }
	},
};

exports.data = cnt;
