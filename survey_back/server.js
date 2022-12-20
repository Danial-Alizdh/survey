const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));

const log = console.log;
const PORT = process.env.PORT || 8080;

const sender_gmail = 'sender_gmail@gmail.com';
const receiver_gmail = 'receiver_gmail@gmail.com';

const transporter = nodemailer.createTransport({
  		service: 'Gmail',
		auth: {
			user: sender_gmail,
			pass: 'sender_pass'
		}
	});

function sendSurvey(res, subject, text) {
	
	mailOptions = {
		from: sender_gmail,
		to: receiver_gmail,
		subject: subject,
		text: text
	};
	
	transporter.sendMail(mailOptions, function(error, info)
	{
		if (error) {
			console.log('Email error: ' + error);
			return res.status(400).send("Oops! Something's wrong. Please try again");
 		 } else {
			console.log('Email sent: ' + info.response);
 			return res.status(200).send("Thanks");
 		 }
	});
}

app.post('/survey', (req, res) => {
	sendSurvey(res, "Survey", req.body.text);
});

app.listen(PORT, () => log('Server is starting on PORT,', 8080));
