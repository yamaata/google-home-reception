'use strict';

module.exports = function(app) {
  const reply = 'いらっしゃいませ。失礼ですが、お名前をお伺いしてもよろしいでしょうか？';
  app.ask(reply);
};
