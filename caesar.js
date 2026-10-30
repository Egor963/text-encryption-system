/**
 * caesar.js
 * Шифр Цезаря — простой шифр подстановки.
 * Каждая буква текста сдвигается на заданное количество позиций в алфавите.
 */

/**
 * Шифрование текста шифром Цезаря.
 * @param {string} text   — исходный текст
 * @param {number} shift  — сдвиг (0–25)
 * @returns {string}      — зашифрованный текст
 */
function caesarEncrypt(text, shift) {
  shift = ((shift % 26) + 26) % 26; // нормализация сдвига
  return text
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      if (char >= 'a' && char <= 'z') {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      return char; // не-буквенные символы остаются без изменений
    })
    .join('');
}

/**
 * Дешифрование текста шифром Цезаря.
 * @param {string} text   — зашифрованный текст
 * @param {number} shift  — сдвиг, использованный при шифровании
 * @returns {string}      — расшифрованный текст
 */
function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - shift); // дешифрование — это шифрование с обратным сдвигом
}

module.exports = { caesarEncrypt, caesarDecrypt };
