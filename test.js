const assert = require('node:assert/strict');
const { caesarEncrypt, caesarDecrypt } = require('./caesar');
const { vigenereEncrypt, vigenereDecrypt } = require('./vigenere');
const { xorEncrypt, xorDecrypt } = require('./xor');

const samples = [
  '',
  'Hello, World!',
  'Text with numbers 123 and symbols !?',
];

for (const text of samples) {
  const caesar = caesarEncrypt(text, 13);
  assert.equal(caesarDecrypt(caesar, 13), text);

  const vigenere = vigenereEncrypt(text, 'SECRET');
  assert.equal(vigenereDecrypt(vigenere, 'SECRET'), text);

  const xor = xorEncrypt(text, 'myKey123');
  assert.equal(xorDecrypt(xor, 'myKey123'), text);
}

assert.throws(() => vigenereEncrypt('test', ''), /Ключ/);
assert.throws(() => xorEncrypt('test', ''), /Ключ/);

console.log('Все проверки пройдены.');
