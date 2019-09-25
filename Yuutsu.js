//////////////////////////////////////////////////
////////////////// DEPENDENCIES //////////////////
//////////////////////////////////////////////////

const processMessage = require('./data/processMessage.js');
const utilityFunctions = require('./data/utilityFunctions.js');

try {
	var Discord = require('discord.js');
	var Yuutsu = new Discord.Client();
} catch (err) {
	console.log('Missing discord.js plugin!');
}

try { var auth = require('./auth.json'); }
	catch (err) { console.log('Missing auth.json!'); }

try { var Cleverbot = require("./data/cleverbot.js"); }
	catch (err) { console.log('Missing cleverbot.js File!'); }

try { var path = require('path').dirname(require.main.filename); }
	catch (err) { console.log('Missing path plugin!'); }

//////////////////////////////////////////////////
////////////////// LOGIN STUFF ///////////////////
//////////////////////////////////////////////////

Yuutsu.on('ready', () => {
	console.log('Yuutsu is now active');

	Yuutsu.user.setStatus('online');
	Yuutsu.user.setPresence({ game: { name: 'with Mia' }});
});

//////////////////////////////////////////////////
/////////////////// PROCESSING ///////////////////
//////////////////////////////////////////////////

// Message Handling
Yuutsu.on('message', (msg) => {

	// Cleverbot Integration
	if (msg.content.includes(Yuutsu.user.id)) {

		// Grab actual Message, remove Highlighttext
		var str = msg.content.substring(22);

		// Ask Cleverbot and proceed to send an answer
		cleverbot.ask(str).then((answer) => {
			if (utilityFunctions.data.getServerFile(msg, path).groups.uwu == true) {
				var uwu = require('./data/functions/uwuify.js');
				msg.channel.send(uwu.data.process(answer.toString()));
			} else { msg.channel.send(answer); }
		});

	// Normal Commands
	} else if ((msg.content[0] === utilityFunctions.data.getServerFile(msg, path).prefix) && (msg.author.id != Yuutsu.user.id)) {
		processMessage.data.processMessage(Yuutsu, msg, path)
	}
});

// Guild Creation Handling
Yuutsu.on('guildCreate', (guild) => utilityFunctions.data.createGuildData(guild, path));

const cleverbot = new Cleverbot(auth.cleverbot_token);
Yuutsu.login(auth.bot_token);
