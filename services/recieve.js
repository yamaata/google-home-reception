'use strict';
const Twilio = require('twilio');

const VISITOR = 'visitor';
const NAME = 'name';
const COMPANY = 'company';

module.exports.name = function(app) {
  const name = app.getArgument(NAME);
  const company = app.getArgument('company');
  const parameters = {};
  parameters[NAME] = name;
  parameters[COMPANY] = company;
  app.setContext(VISITOR, 5, parameters);

  const reply = company + 'の' + name + '様ですね。恐れ入りますが、どのようなご用件でしょうか？';
  app.ask(reply);
};

module.exports.regarding = function(app) {
  const name = app.getArgument(NAME);
  const division = app.getArgument('division');
  const parameters = {};
  parameters[NAME] = name;
  parameters['division'] = division;
  app.setContext('target', 5, parameters);

  const visitorName = app.getContextArgument(VISITOR, NAME);
  const visitorCompany = app.getContextArgument(VISITOR, COMPANY);
  const client = Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
  client.calls.create({
    url: process.env.BASE_URL + '/twiml/call?company='
      + encodeURIComponent(visitorCompany.toString()) + '&name=' + encodeURIComponent(visitorName.toString()),
    to: '+817035355780',
    from: '+815031551508',
  }).then(call => {
    const reply = '承知しました。' + division + 'の' + name + 'ですね。只今お繋ぎしておりますので、少々お待ちくださいませ。';
    app.ask(reply);
  });
};
