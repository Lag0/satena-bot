# Satena Bot

Satena Bot é uma aplicação Node.js voltada para automação de envio de mensagens. Utilizando uma integração com o **Google Sheets** e **Z-API**, esta ferramenta permite o envio automatizado de mensagens de **WhatsApp** tanto de forma massiva quanto individual. Atualmente, em sua versão alpha, Satena Bot foca no envio de mensagens de texto, com planos futuros para expandir suas capacidades.

## Funcionalidades

Atualmente, o Satena Bot suporta:

- **Envio de Mensagens em Massa**: Envie mensagens personalizadas para uma lista de contatos armazenada no Google Sheets. Ideal para campanhas de marketing, notificações em larga escala e comunicação de eventos.
- **Envio de Mensagens Unitárias**: Possibilidade de enviar mensagens individualizadas, permitindo maior personalização no contato com cada destinatário.
- **Configuração Flexível**: Através de um arquivo de configuração, é possível personalizar o template da mensagem, definindo como as mensagens devem ser apresentadas aos destinatários.

Planos futuros incluem a integração com outras plataformas de mensagens, suporte a mensagens multimídia e a construção de uma interface gráfica para facilitar a configuração e o uso.

## Instalação

1. **Clone o repositório**:

   ```
   git clone https://github.com/Lag0/satena-bot.git
   cd satena-bot
   ```

2. **Instale as dependências**:

   ```
   npm install
   ```

## Configuração Passo a Passo

Antes de utilizar o Satena Bot, uma configuração inicial é necessária.

### 1. Variáveis de Ambiente

- Duplique o arquivo `.env.example` e renomeie a cópia para `.env`.
- Preencha os valores de acordo com suas credenciais do Google Cloud e configurações da API de mensagens.

### 2. Arquivo de Configuração `config.json`

- Abra `config-template.json` no seu editor de texto favorito.
- Renomeie o arquivo para `config.json`.
- Atualize com as informações específicas do seu projeto, como abaixo:

  ```json
  {
    "GOOGLE_SHEET_ID": "<ID_DA_SUA_PLANILHA>",
    "GOOGLE_SHEET_INDEX": 0,
    "GOOGLE_SHEET_NAME_COLUMN_INDEX": 2,
    "GOOGLE_SHEET_PHONE_COLUMN_INDEX": 5,
    "ZAPI_ENDPOINT": "<SEU_ENDPOINT_DA_API_DE_MENSAGENS>",
    "CLIENT_TOKEN": "<SEU_TOKEN_DA_API_DE_MENSAGENS>",
    "MESSAGE_TEMPLATE": "Olá {{nome}}, sua mensagem personalizada aqui.",
    "MESSAGE_DELAY_MIN_MS": 1000,
    "MESSAGE_DELAY_MAX_MS": 5000
  }
  ```

  **Nota**: Certifique-se de substituir `<ID_DA_SUA_PLANILHA>`, `<SEU_ENDPOINT_DA_API_DE_MENSAGENS>` e `<SEU_TOKEN_DA_API_DE_MENSAGENS>` pelos valores correspondentes.

### 3. Permissões do Google Sheets

- Adicione o email da conta de serviço do Google Cloud (fornecido no `.env` como `GOOGLE_SERVICE_ACCOUNT_EMAIL`) como um usuário autorizado na sua planilha do Google Sheets.

## Uso

Para iniciar o envio de mensagens, execute:

```
node index.js
```

O programa processará os contatos especificados na sua planilha do Google Sheets e enviará as mensagens de acordo com o template configurado.

## Contribuindo

Contribuições são muito bem-vindas! Para contribuir, por favor, abra um pull request ou issue.

## Licença

[Inserir Licença]
