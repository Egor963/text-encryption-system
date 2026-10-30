/**
 * main.js
 * Главный модуль системы шифрования и дешифрования текста.
 * Объединяет алгоритмы: шифр Цезаря, шифр Виженера, XOR-шифр.
 *
 * Запуск демонстрации: node main.js
 */

const { caesarEncrypt, caesarDecrypt }     = require('./caesar');
const { vigenereEncrypt, vigenereDecrypt } = require('./vigenere');
const { xorEncrypt, xorDecrypt }           = require('./xor');

// ─── Демонстрация работы алгоритмов ──────────────────────────────────────────

const originalText = 'Hello, World! This is a secret message.';
console.log('='.repeat(60));
console.log('  Система шифрования и дешифрования текста (JavaScript)');
console.log('='.repeat(60));
console.log(`\nИсходный текст: "${originalText}"\n`);

// --- Шифр Цезаря ---
console.log('─── Шифр Цезаря (сдвиг = 13) ───');
const caesarShift    = 13;
const caesarEncrypted = caesarEncrypt(originalText, caesarShift);
const caesarDecrypted = caesarDecrypt(caesarEncrypted, caesarShift);
console.log(`Зашифровано : "${caesarEncrypted}"`);
console.log(`Расшифровано: "${caesarDecrypted}"`);
console.log(`Совпадает с оригиналом: ${caesarDecrypted === originalText}\n`);

// --- Шифр Виженера ---
console.log('─── Шифр Виженера (ключ = "SECRET") ───');
const vigenereKey       = 'SECRET';
const vigenereEncrypted = vigenereEncrypt(originalText, vigenereKey);
const vigenereDecrypted = vigenereDecrypt(vigenereEncrypted, vigenereKey);
console.log(`Зашифровано : "${vigenereEncrypted}"`);
console.log(`Расшифровано: "${vigenereDecrypted}"`);
console.log(`Совпадает с оригиналом: ${vigenereDecrypted === originalText}\n`);

// --- XOR-шифр ---
console.log('─── XOR-шифр (ключ = "myKey123") ───');
const xorKey       = 'myKey123';
const xorEncrypted = xorEncrypt(originalText, xorKey);
const xorDecrypted = xorDecrypt(xorEncrypted, xorKey);
console.log(`Зашифровано (Base64): "${xorEncrypted}"`);
console.log(`Расшифровано        : "${xorDecrypted}"`);
console.log(`Совпадает с оригиналом: ${xorDecrypted === originalText}\n`);
console.log('='.repeat(60));
