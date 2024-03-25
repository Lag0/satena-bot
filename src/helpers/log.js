const fs = require('fs');
const path = require('path');

function createLog({ successCount, failCount, failures, totalContacts }) {
  const logContent = `
Data de envio: ${new Date().toLocaleString()}
Contatos esperados: ${totalContacts}
Envios com sucesso: ${successCount}
Envios falhos: ${failCount}
${failures.length > 0 ? `Falhas no envio para os seguintes números: ${failures.join(', ')}` : ''}
`;
  fs.writeFileSync(path.join(__dirname, '../../log_envios.txt'), logContent);
  console.log(logContent);
}

module.exports = { createLog };