/**
 * Система шифрования и дешифрования текста
 * Поддерживает различные алгоритмы шифрования
 */

class EncryptionSystem {
  constructor() {
    this.algorithms = {
      caesar: 'Caesar Cipher',
      vigenere: 'Vigenere Cipher',
      xor: 'XOR Cipher'
    };
    this.russianLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    this.russianUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  }

  normalizeShift(shift, alphabetSize) {
    return ((shift % alphabetSize) + alphabetSize) % alphabetSize;
  }

  shiftAlphabetChar(char, lowerAlphabet, upperAlphabet, shift) {
    const lowerIndex = lowerAlphabet.indexOf(char.toLowerCase());
    if (lowerIndex === -1) return null;

    const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
    const alphabet = isUpper ? upperAlphabet : lowerAlphabet;
    const newIndex = this.normalizeShift(lowerIndex + shift, lowerAlphabet.length);
    return alphabet[newIndex];
  }

  getVigenereShift(keyChar, alphabet) {
    const index = alphabet.indexOf(keyChar.toLowerCase());
    return index === -1 ? 0 : index;
  }

  /**
   * Шифр Цезаря
   * @param {string} text - текст для шифрования
   * @param {number} shift - сдвиг (ключ)
   * @returns {string} зашифрованный текст
   */
  caesarEncrypt(text, shift) {
    return text.split('').map(char => {
      // Латиница
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(this.normalizeShift(code - base + shift, 26) + base);
      }
      // Кириллица
      return this.shiftAlphabetChar(char, this.russianLower, this.russianUpper, shift) ?? char;
    }).join('');
  }

  /**
   * Дешифрование шифра Цезаря
   * @param {string} text - зашифрованный текст
   * @param {number} shift - сдвиг (ключ)
   * @returns {string} расшифрованный текст
   */
  caesarDecrypt(text, shift) {
    return text.split('').map(char => {
      // Латиница
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(this.normalizeShift(code - base - shift, 26) + base);
      }
      // Кириллица
      return this.shiftAlphabetChar(char, this.russianLower, this.russianUpper, -shift) ?? char;
    }).join('');
  }

  /**
   * Шифр Виженера
   * @param {string} text - текст для шифрования
   * @param {string} key - ключ
   * @returns {string} зашифрованный текст
   */
  vigenereEncrypt(text, key) {
    if (!key) return text;
    key = key.toLowerCase().replace(/[^a-zа-яё]/gi, '');
    if (key.length === 0) return text;
    
    let keyIndex = 0;
    return text.split('').map(char => {
      // Латиница
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        const keyChar = key[keyIndex % key.length];
        const shift = this.getVigenereShift(keyChar, 'abcdefghijklmnopqrstuvwxyz');
        keyIndex++;
        return String.fromCharCode(this.normalizeShift(code - base + shift, 26) + base);
      }
      // Кириллица
      if (char.match(/[а-яё]/i)) {
        const keyChar = key[keyIndex % key.length].toLowerCase();
        const russianShift = this.getVigenereShift(keyChar, this.russianLower);
        const latinShift = this.getVigenereShift(keyChar, 'abcdefghijklmnopqrstuvwxyz');
        const shift = keyChar.match(/[а-яё]/i) ? russianShift : latinShift;
        keyIndex++;

        return this.shiftAlphabetChar(char, this.russianLower, this.russianUpper, shift);
      }
      return char;
    }).join('');
  }

  /**
   * Дешифрование шифра Виженера
   * @param {string} text - зашифрованный текст
   * @param {string} key - ключ
   * @returns {string} расшифрованный текст
   */
  vigenereDecrypt(text, key) {
    if (!key) return text;
    key = key.toLowerCase().replace(/[^a-zа-яё]/gi, '');
    if (key.length === 0) return text;
    
    let keyIndex = 0;
    return text.split('').map(char => {
      // Латиница
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        const keyChar = key[keyIndex % key.length];
        const shift = this.getVigenereShift(keyChar, 'abcdefghijklmnopqrstuvwxyz');
        keyIndex++;
        return String.fromCharCode(this.normalizeShift(code - base - shift, 26) + base);
      }
      // Кириллица
      if (char.match(/[а-яё]/i)) {
        const keyChar = key[keyIndex % key.length].toLowerCase();
        const russianShift = this.getVigenereShift(keyChar, this.russianLower);
        const latinShift = this.getVigenereShift(keyChar, 'abcdefghijklmnopqrstuvwxyz');
        const shift = keyChar.match(/[а-яё]/i) ? russianShift : latinShift;
        keyIndex++;

        return this.shiftAlphabetChar(char, this.russianLower, this.russianUpper, -shift);
      }
      return char;
    }).join('');
  }

  /**
   * XOR шифрование
   * @param {string} text - текст для шифрования
   * @param {string} key - ключ (строка)
   * @returns {string} зашифрованный текст в hex формате
   */
  xorEncrypt(text, key) {
    if (!key) return text;

    const encoder = new TextEncoder();
    const textBytes = encoder.encode(text);
    const keyBytes = encoder.encode(key);

    return Array.from(textBytes, (byte, index) => {
      const encryptedByte = byte ^ keyBytes[index % keyBytes.length];
      return encryptedByte.toString(16).padStart(2, '0');
    }).join('');
  }

  /**
   * XOR дешифрование
   * @param {string} hexText - зашифрованный текст в hex формате
   * @param {string} key - ключ (строка)
   * @returns {string} расшифрованный текст
   */
  xorDecrypt(hexText, key) {
    if (!key) return hexText;

    const cleanHex = hexText.replace(/\s+/g, '');
    if (cleanHex.length % 2 !== 0 || !/^[0-9a-f]*$/i.test(cleanHex)) {
      throw new Error('XOR ожидает зашифрованный текст в hex формате');
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const keyBytes = encoder.encode(key);
    const decryptedBytes = new Uint8Array(cleanHex.length / 2);

    for (let i = 0; i < cleanHex.length; i += 2) {
      const encryptedByte = parseInt(cleanHex.substr(i, 2), 16);
      decryptedBytes[i / 2] = encryptedByte ^ keyBytes[(i / 2) % keyBytes.length];
    }

    return decoder.decode(decryptedBytes);
  }

  /**
   * Получить список доступных алгоритмов
   * @returns {Object} объект с названиями алгоритмов
   */
  getAlgorithms() {
    return this.algorithms;
  }
}

// Экспорт для использования в браузере
if (typeof window !== 'undefined') {
  window.EncryptionSystem = EncryptionSystem;
}

// Экспорт для Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EncryptionSystem;
}
