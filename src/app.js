const { getContacts } = require("./contacts");
const { sendMessage } = require("./api/messages");
const { createLog } = require("./helpers/log");
const { sleep, delayTimeMs } = require("./helpers/sleep");
const config = require("./config/index")

async function sendMessages() {
  const contacts = await getContacts();
  let successCount = 0;
  let failCount = 0;
  let failures = [];

  for (const contact of contacts) {
    let allMessagesSuccess = true;

    for (const textMessage of config.TEXT_MESSAGES) {
      const textToSend = textMessage.replace("{{nome}}", contact.nome);
      const textSent = await sendMessage(contact.telefone, textToSend, "text");
      if (!textSent) {
        allMessagesSuccess = false;
        failures.push({ tipo: "texto", telefone: contact.telefone });
      }
    }

    for (const audioLink of config.AUDIO_MESSAGES) {
      const audioSent = await sendMessage(contact.telefone, audioLink, "audio");
      if (!audioSent) {
        allMessagesSuccess = false;
        failures.push({
          tipo: "audio",
          telefone: contact.telefone,
          link: audioLink,
        });
      }
    }

    for (const imageUrl of config.IMAGE_MESSAGES) {
      const imageSent = await sendMessage(contact.telefone, imageUrl, "image");
      if (!imageSent) {
        allMessagesSuccess = false;
        failures.push({
          tipo: "imagem",
          telefone: contact.telefone,
          link: imageUrl,
        });
      }
      await sleep(delayTimeMs);
    }

    if (allMessagesSuccess) {
      successCount++;
      console.log(
        `\nTodas as mensagens enviadas com sucesso para ${contact.nome} - ${contact.telefone}\n`
      );
    } else {
      failCount++;
    }
  }
  createLog({
    successCount,
    failCount,
    failures,
    totalContacts: contacts.length,
  });
}

sendMessages().catch((error) => {
  console.error("Erro durante o envio de mensagens:", error);
});
