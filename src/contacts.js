const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const config = require('./config');

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const jwtClient = new JWT({
  email: config.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: config.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});


async function getContacts(sheetIndex = config.GOOGLE_SHEET_INDEX) {
  const doc = new GoogleSpreadsheet(config.GOOGLE_SHEET_ID, jwtClient);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[sheetIndex];
  const rows = await sheet.getRows();
  const contacts = rows
    .filter(
      (row) =>
        row._rawData[config.GOOGLE_SHEET_NAME_COLUMN_INDEX] &&
        row._rawData[config.GOOGLE_SHEET_PHONE_COLUMN_INDEX]
    )
    .map((row) => ({
      nome: row._rawData[config.GOOGLE_SHEET_NAME_COLUMN_INDEX],
      telefone: row._rawData[config.GOOGLE_SHEET_PHONE_COLUMN_INDEX],
    }));
  console.log(
    `\nTotal de ${contacts.length} contatos válidos encontrados na planilha.\n`
  );
  return contacts;
}

module.exports = { getContacts };
