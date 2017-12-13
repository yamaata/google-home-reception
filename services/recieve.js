'use strict';
const Twilio = require('twilio');

module.exports.name = function(app) {
  const name = app.getArgument('name');
  const company = app.getArgument('company');
  const parameters = {};
  parameters['visitorName'] = name;
  parameters['visitorCompany'] = company;
  app.setContext('visitor', 5, parameters);

  const reply = company + 'の' + name + '様ですね。恐れ入りますが、どのようなご用件でしょうか？';
  app.ask(reply);
};

module.exports.regarding = function(app) {
  const name = app.getArgument('name');
  const division = app.getArgument('division');

  const visitorName = app.getContextArgument('visitor', 'visitorName');
  const visitorCompany = app.getContextArgument('visitor', 'visitorCompany');
  if (!visitorName || !visitorCompany) {
    return; // TODO write error handling process...
  }

  const client = Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
  client.calls.create({
    url: process.env.BASE_URL + '/twiml/call'
      + '?visitorCompany=' + encodeURIComponent(visitorCompany.value)
      + '&visitorName=' + encodeURIComponent(visitorName.value)
      + '&division=' + encodeURIComponent(division)
      + '&name=' + encodeURIComponent(name),
    to: process.env.TO, // TODO get phone number from Database.
    from: process.env.FROM,
  }).then(call => {
    const reply = '承知しました。' + division + 'の' + name + 'ですね。只今お繋ぎしておりますので、少々お待ちくださいませ。';
    app.tell(reply);
  });
};
