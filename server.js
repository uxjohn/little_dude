var botKit = require('botkit');

var accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
var verifyToken = process.env.FACEBOOK_VERIFY_TOKEN;
var port = process.env.PORT;

if (!accessToken) throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is required but missing')
if (!verifyToken) throw new Error('FACEBOOK_VERIFY_TOKEN is required but missing')
if (!port) throw new Error('PORT is required but missing')

var controller = botkit.facebook({
	accessToken: accessToken,
	verifyToken: verifyToken
})

var bot = controller.spawn()

controller.setupWebserver(port, function (err, webserver) {
	if (err) return console.log(err)
	controller.createWebhookEndpoints(webserver, bot, function () {

	})
})

controller.hears(['hello', 'hi'], 'message_recieved', function (bot, message) {
	bot.reply(message, 'Hello!')
	bot.reply(message, 'I want to show you something')
	bot.reply(message, {
		attachment: {
			type: 'template'
			payload: {
				template_type: 'button'
				text: 'Which do you prefer?'
				buttons: [
					{
						type: 'postback'
						title: 'Cats'
						payload: 'show_cat'
					},
					{
						type: 'postback'
						title: 'Dogs'
						payload: 'show_dog'
					}
				]
			}
		}
	})
})

controller.on('facebook_postback', function (bot, message) {
	switch (message.payload) {
		case 'show_cat':
		bot.reply(message, {
			attachment: {
				type: image,
				payload: {
					url: 'https://blog.beepboophq.com/welcome-to-beep-boop-facebook-messenger-bots-9fd28f8ef934#.48y38vozy'
				}
			}
		})
	}
})