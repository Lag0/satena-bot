const axios = require('axios');
const { sleep, delayTimeMs } = require('../helpers/sleep');
const config = require('../config');

const headers = {
  'Content-Type': 'application/json',
  'Client-Token': config.CLIENT_TOKEN,
};

async function sendMessage(phoneNumber, message, type = 'text') {
  const endpointMap = {
    text: '/send-text',
    audio: '/send-audio',
    image: '/send-image',
  };
  
  const dataMap = {
    text: { phone: phoneNumber, message },
    audio: { phone: phoneNumber, audio: message },
    image: { phone: phoneNumber, image: message },
  };

  try {
    const response = await axios.post(`${config.ZAPI_ENDPOINT}${endpointMap[type]}`, dataMap[type], { headers });
    console.log(`Mensagem ${type} enviada com sucesso para ${phoneNumber}. `);
    return true;
  } catch (error) {
    console.error(`Erro ao enviar mensagem ${type} para ${phoneNumber}:`, error.response?.data || error.message);
    return false;
  } finally {
    await sleep(delayTimeMs);
  }
}

module.exports = { sendMessage };
