'use strict';

const express = require('express');
const DialogflowApp = require('actions-on-google').DialogflowApp;
const router = express.Router();

router.post('/', (req, res, next) => {
  const welcome = require('../services/welcome.js');
  const receive = require('../services/recieve.js');
  const bye = require('../services/bye.js');

  const app = new DialogflowApp({request: req, response: res});

  const WELCOME_INTENT = 'input.welcome';
  const RECEIVE_NAME_INTENT = 'input.receive.name';
  const RECEIVE_REGARDING_INTENT = 'input.receive.regarding';
  const BYE_INTENT = 'input.bye';

  const actionMap = new Map();
  actionMap.set(WELCOME_INTENT, welcome);
  actionMap.set(RECEIVE_NAME_INTENT, receive.name);
  actionMap.set(RECEIVE_REGARDING_INTENT, receive.regarding);
  actionMap.set(BYE_INTENT, bye);

  app.handleRequest(actionMap);
});

module.exports = router;
