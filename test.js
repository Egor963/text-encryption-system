const assert = require('node:assert/strict');
const EncryptionSystem = require('./encryption');

const encryption = new EncryptionSystem();
const samples = ['Hello, World!', 'Привет, мир!', 'Текст 123!?'];

for (const text of samples) {
  const caesar = encryption.caesarEncrypt(text, 7);
  assert.equal(encryption.caesarDecrypt(caesar, 7), text);

  const vigenere = encryption.vigenereEncrypt(text, 'КлючKey');
  assert.equal(encryption.vigenereDecrypt(vigenere, 'КлючKey'), text);

  const xor = encryption.xorEncrypt(text, 'секрет');
  assert.equal(encryption.xorDecrypt(xor, 'секрет'), text);
}

assert.throws(
  () => encryption.xorDecrypt('не hex', 'ключ'),
  /hex формате/,
);

console.log('Все проверки пройдены.');
