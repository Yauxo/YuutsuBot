var Discord = require('discord.js');

var cnt = {
	perm: 1,

	name: 'clear',
	usage: '!clear <amount>',
	description: '!clear will delete the specified <amount> of messages in the channel, up to a maximum of 50 messages at once. obviously not one of the most save functions around, but sometimes it has to be.',

	process: function(Yuutsu, msg, suffix) {
		if (msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
			if (suffix <= 50) { msg.channel.bulkDelete(suffix);
			} else { msg.channel.send('cannot blukdelete more than 50 messages at once'); }
		}
	},
};

exports.data = cnt;
