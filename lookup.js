const { getStore } = require('@netlify/blobs');
const crypto = require('crypto');

// Só minúsculas e números, sem caracteres ambíguos (0/o, 1/l) — fácil de lembrar, escrever à mão ou ditar por telefone
const CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';

function generateCode(len = 5) {
  let out = '';
  for (let i = 0; i < len; i++) {
    out += CHARS[crypto.randomInt(0, CHARS.length)];
  }
  return out;
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método não permitido.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido.' }) };
  }

  const { destino, tipo, label } = body;

  if (!destino || !tipo) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltam campos obrigatórios.' }) };
  }

  const store = getStore('sinal-links');

  let code;
  for (let attempts = 0; attempts < 6; attempts++) {
    const candidate = generateCode();
    const existing = await store.get(candidate);
    if (!existing) {
      code = candidate;
      break;
    }
  }
  if (!code) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Não foi possível gerar um código único, tente de novo.' }) };
  }

  // Token secreto de edição — só é mostrado uma vez, na resposta desta chamada.
  // Só o hash fica guardado; ninguém consegue recuperar o token original depois.
  const editToken = crypto.randomBytes(20).toString('hex');
  const tokenHash = hashToken(editToken);

  const record = {
    destino,
    tipo,
    label: label || '',
    tokenHash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await store.set(code, JSON.stringify(record));

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, editToken }),
  };
};
