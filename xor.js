/**
 * xor.js
 * XOR-шифр — симметричный шифр на основе операции «исключающее ИЛИ».
 * Одна и та же функция выполняет как шифрование, так и дешифрование.
 */

/**
 * Шифрование/дешифрование текста методом XOR.
 * Применение функции дважды с одним ключом возвращает исходный текст.
 *
 * @param {string} text — исходный или зашифрованный текст
 * @param {string} key  — ключевое слово (любые символы)
 * @returns {string}    — результат XOR-преобразования
 */
function xorCipher(text, key) {
  if (key.length === 0) throw new Error('Ключ не может быть пустым.');
  return text
    .split('')
    .map((char, index) => {
      const keyChar = key.charCodeAt(index % key.length);
      return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
    })
    .join('');
}

/**
 * Шифрование XOR с кодированием результата в Base64
 * для безопасной передачи в виде строки.
 *
 * @param {string} text — исходный текст
 * @param {string} key  — ключ
 * @returns {string}    — зашифрованный текст в Base64
 */
function xorEncrypt(text, key) {
  const encrypted = xorCipher(text, key);
  return Buffer.from(encrypted, 'binary').toString('base64');
}

/**
 * Дешифрование XOR из Base64.
 *
 * @param {string} encoded — зашифрованный текст в Base64
 * @param {string} key     — ключ
 * @returns {string}       — расшифрованный текст
 */
function xorDecrypt(encoded, key) {
  const encrypted = Buffer.from(encoded, 'base64').toString('binary');
  return xorCipher(encrypted, key);
}

module.exports = { xorCipher, xorEncrypt, xorDecrypt };
