const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const code = event.queryStringParameters && event.queryStringParameters.code;

  if (!code) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: 'Código não informado.',
    };
  }

  const store = getStore('sinal-links');
  const raw = await store.get(code);

  if (!raw) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: 'Esse QR code não existe ou foi removido.',
    };
  }

  const data = JSON.parse(raw);

  return {
    statusCode: 302,
    headers: { Location: data.destino },
    body: '',
  };
};
