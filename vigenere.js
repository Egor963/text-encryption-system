/**
 * vigenere.js
 * Шифр Виженера — полиалфавитный шифр подстановки.
 * Использует ключевое слово для создания последовательности сдвигов Цезаря.
 */

/**
 * Подготовка ключа: оставляем только буквы, приводим к верхнему регистру.
 * @param {string} key — исходный ключ
 * @returns {string}   — очищенный ключ
 */
function prepareKey(key) {
  const cleaned = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleaned.length === 0) throw new Error('Ключ должен содержать хотя бы одну букву.');
  return cleaned;
}

/**
 * Шифрование текста шифром Виженера.
 * @param {string} text — исходный текст
 * @param {string} key  — ключевое слово
 * @returns {string}    — зашифрованный текст
 */
function vigenereEncrypt(text, key) {
  const cleanKey = prepareKey(key);
  let keyIndex = 0;

  return text
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        keyIndex++;
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      if (char >= 'a' && char <= 'z') {
        const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        keyIndex++;
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      return char; // не-буквенные символы не изменяются и не сдвигают счётчик ключа
    })
    .join('');
}

/**
 * Дешифрование текста шифром Виженера.
 * @param {string} text — зашифрованный текст
 * @param {string} key  — ключевое слово
 * @returns {string}    — расшифрованный текст
 */
function vigenereDecrypt(text, key) {
  const cleanKey = prepareKey(key);
  let keyIndex = 0;

  return text
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        keyIndex++;
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      }
      if (char >= 'a' && char <= 'z') {
        const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
        keyIndex++;
        return String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
      }
      return char;
    })
    .join('');
}

module.exports = { vigenereEncrypt, vigenereDecrypt };
