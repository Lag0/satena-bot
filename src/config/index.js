require('dotenv').config();
const messagesConfig = require('./msg-config.json');

const config = {
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  ZAPI_ENDPOINT: process.env.ZAPI_ENDPOINT,
  CLIENT_TOKEN: process.env.CLIENT_TOKEN,
  MESSAGE_DELAY_MIN_MS: parseInt(process.env.MESSAGE_DELAY_MIN_MS, 10),
  MESSAGE_DELAY_MAX_MS: parseInt(process.env.MESSAGE_DELAY_MAX_MS, 10),
  GOOGLE_SHEET_INDEX: parseInt(process.env.GOOGLE_SHEET_INDEX, 10),
  GOOGLE_SHEET_NAME_COLUMN_INDEX: parseInt(process.env.GOOGLE_SHEET_NAME_COLUMN_INDEX, 10),
  GOOGLE_SHEET_PHONE_COLUMN_INDEX: parseInt(process.env.GOOGLE_SHEET_PHONE_COLUMN_INDEX, 10),
  TEXT_MESSAGES: messagesConfig.textMessages,
  AUDIO_MESSAGES: messagesConfig.audioMessages,
  IMAGE_MESSAGES: messagesConfig.imageMessages,
};

module.exports = config;
