# Google Home Reception
Reception using Google Home and Twilio.

## Requirement
* Node.js 9.3.0 or later
* npm or yarn
* Google Home (Or a device that can use Google Assistant)
* Google Account
* Twilio Account

## Install
### Action on Google
Create new project.

### Dialogflow
Create new agent.

Create intent and set the following action.
* input.welcome
* input.receive.name
* input.receive.regarding
* input.bye

Check Fulfillment Use webhook.  
**input.receive.regarding** and **input.bye** are also check Google Assistant End Conversation.   

Set base url of the application in Fulfillment Webhook URL.

Integrations to Google Assistant. 

### Twilio
Create account if you don't have.  
[Twilio (For Japan)](https://twilio.kddi-web.com)  
[Twilio (Other)](https://www.twilio.com)

Buy new phone number.

### Application
Fork and clone the repository. Then, install dependencies with

`npm install` or `yarn install`

In order to run the application you will need to copy environment file and set the following variables:

`copy .env.example .env`

* ACCOUNT_SID
* AUTH_TOKEN
* FROM
* TO
* BASE_URL

Then, start awesome application!!  
`npm run start` or `yarn run start`

## Contribution
Contributions are welcome and generally accepted.

## Licence
MIT
