'use strict';

const express = require('express');
const router = express.Router();

const Twilio = require('twilio');
const googlehome = require('google-home-notifier');
const sayParams = {
  language: 'ja-JP',
  voice: 'alice'
};

router.post('/call', (req, res, next) => {
  if (!req.query.visitorCompany || !req.query.visitorName || !req.query.division || !req.query.name) {
    res.status(400).send('Required parameter is not specified');
    return;
  }

  const twiml = new Twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    action: '/twiml/message'
      + '?visitorCompany=' + encodeURIComponent(req.query.visitorCompany)
      + '&visitorName=' + encodeURIComponent(req.query.visitorName)
      + '&division=' + encodeURIComponent(req.query.division)
      + '&name=' + encodeURIComponent(req.query.name),
    input: 'speech',
    language: 'ja-JP',
    speechTimeout: 2,
  });

  const visitorCompany = req.query.visitorCompany.replace(/KDDI/g, 'ケーディーディーアイ');
  gather.say(sayParams, visitorCompany + 'の' + req.query.visitorName + '様がいらっしゃいました。いかがなさいますか？');

  res.type('text/xml');
  res.send(twiml.toString());
});

router.post('/message', (req, res, next) => {
  if (!req.query.visitorCompany || !req.query.visitorName || !req.query.division || !req.query.name
    || !req.body.SpeechResult) {
    res.status(400).send('Required parameter is not specified');
    return;
  }

  const language = 'ja';
  // TODO Dynamically change messages according to parameters.
  const message = req.query.visitorCompany + 'の' + req.query.visitorName + '様にお伝えします。'
    + req.query.division + 'の' + req.query.name + 'がすぐにこちらに参りますので、おかけになってお待ちください。';
  googlehome.device('Google Home', language);
  googlehome.notify(message, (ghRes) => {
    if (ghRes === 'Device notified') {
      const twiml = new Twilio.twiml.VoiceResponse();
      twiml.say(sayParams, 'お客様にその旨お伝えしました。失礼致します。');

      res.type('text/xml');
      res.send(twiml.toString());
    }
  });
});

module.exports = router;
