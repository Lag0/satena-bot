require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const axios = require('axios');
const config = require('./config.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const jwtClient = new JWT({
  email: config.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: config.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, jwtClient);

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function getContacts(sheetIndex = config.GOOGLE_SHEET_INDEX) {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[sheetIndex];
  const rows = await sheet.getRows();
  const contacts = rows.filter(row => row._rawData[config.GOOGLE_SHEET_NAME_COLUMN_INDEX] && row._rawData[config.GOOGLE_SHEET_PHONE_COLUMN_INDEX])
                        .map(row => ({ nome: row._rawData[config.GOOGLE_SHEET_NAME_COLUMN_INDEX], telefone: row._rawData[config.GOOGLE_SHEET_PHONE_COLUMN_INDEX] }));
  console.log(`Total de ${contacts.length} contatos válidos encontrados na planilha.`);
  return contacts;
}

async function sendMessage(phoneNumber, message) {
  try {
    await axios.post(`${config.ZAPI_ENDPOINT}/send-text`, {
      phone: phoneNumber,
      message: message,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': config.CLIENT_TOKEN,
      },
    });
    return true;
  } catch (error) {
    console.error(`Erro ao enviar mensagem para ${phoneNumber}:`, error.response?.data || error.message);
    return false;
  }
}

async function sendMessages() {
  const contacts = await getContacts();
  let successCount = 0, failCount = 0, failures = [];

  for (const contact of contacts) {
    const messageToSend = config.MESSAGE_TEMPLATE.replace('{{nome}}', contact.nome);
    if(await sendMessage(contact.telefone, messageToSend)) {
      successCount++;
      console.log(`Mensagem enviada para ${contact.nome} - ${contact.telefone}`);
    } else {
      failCount++;
      failures.push(contact.telefone);
    }
    await sleep(Math.floor(Math.random() * (config.MESSAGE_DELAY_MAX_MS - config.MESSAGE_DELAY_MIN_MS + 1)) + config.MESSAGE_DELAY_MIN_MS);
  }

  createLog({ successCount, failCount, failures, totalContacts: contacts.length });
}

function createLog({ successCount, failCount, failures, totalContacts }) {
  const logContent = `
Data de envio: ${new Date().toLocaleString()}
Mensagem padrão enviada: "${config.MESSAGE_TEMPLATE}"
Contatos esperados: ${totalContacts}
Envios com sucesso: ${successCount}
Envios falhos: ${failCount}
${failures.length > 0 ? `Falhas no envio para os seguintes números: ${failures.join(', ')}` : ''}
`;

  fs.writeFileSync(path.join(__dirname, 'log_envios.txt'), logContent);
  console.log(logContent);
  console.log(successCount + failCount === totalContacts ? "✅ Todos os contatos foram processados. Programa finalizado com sucesso." : "❗️Alguns contatos não foram processados.");
}

sendMessages().catch(error => {
  console.error("Erro durante o envio de mensagens:", error);
});
