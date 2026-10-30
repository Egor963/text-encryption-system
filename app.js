/**
 * Логика интерфейса системы шифрования
 */

const encryption = new EncryptionSystem();

// Элементы DOM
const algorithmSelect = document.getElementById('algorithm');
const inputText = document.getElementById('inputText');
const keyInput = document.getElementById('keyInput');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const keySection = document.getElementById('keySection');

function getCaesarShift() {
    const shiftText = keyInput.value.trim();
    const shift = Number(shiftText);

    if (shiftText === '' || !Number.isInteger(shift)) {
        return null;
    }

    return shift;
}

function isValidVigenereKey(key) {
    return /[a-zа-яё]/i.test(key);
}

// Обработчик изменения алгоритма
algorithmSelect.addEventListener('change', () => {
    const algorithm = algorithmSelect.value;
    
    // Сброс полей
    keyInput.value = '';
    outputText.value = '';
    
    // Показать/скрыть соответствующие секции
    if (algorithm === 'caesar' || algorithm === 'vigenere' || algorithm === 'xor') {
        keySection.style.display = 'block';
        
        if (algorithm === 'caesar') {
            keyInput.placeholder = 'Введите число (сдвиг)...';
            keyInput.type = 'number';
        } else {
            keyInput.placeholder = 'Введите текстовый ключ...';
            keyInput.type = 'text';
        }
    }
});

// Шифрование
encryptBtn.addEventListener('click', async () => {
    const algorithm = algorithmSelect.value;
    const text = inputText.value;
    
    if (!text) {
        showMessage('Введите текст для шифрования', 'error');
        return;
    }
    
    try {
        let result;
        
        switch (algorithm) {
            case 'caesar':
                const shift = getCaesarShift();
                if (shift === null) {
                    showMessage('Введите целое число для сдвига', 'error');
                    return;
                }
                result = encryption.caesarEncrypt(text, shift);
                outputText.value = result;
                break;
                
            case 'vigenere':
                const vigenereKey = keyInput.value;
                if (!isValidVigenereKey(vigenereKey)) {
                    showMessage('Ключ Виженера должен содержать буквы', 'error');
                    return;
                }
                result = encryption.vigenereEncrypt(text, vigenereKey);
                outputText.value = result;
                break;
                
            case 'xor':
                const xorKey = keyInput.value;
                if (!xorKey) {
                    showMessage('Введите ключ для XOR шифрования', 'error');
                    return;
                }
                result = encryption.xorEncrypt(text, xorKey);
                outputText.value = result;
                break;
        }
        
        showMessage('Текст успешно зашифрован!', 'success');
    } catch (error) {
        showMessage('Ошибка шифрования: ' + error.message, 'error');
    }
});

// Дешифрование
decryptBtn.addEventListener('click', async () => {
    const algorithm = algorithmSelect.value;
    const text = outputText.value || inputText.value;
    
    if (!text) {
        showMessage('Введите текст для дешифрования', 'error');
        return;
    }
    
    try {
        let result;
        
        switch (algorithm) {
            case 'caesar':
                const shift = getCaesarShift();
                if (shift === null) {
                    showMessage('Введите целое число для сдвига', 'error');
                    return;
                }
                result = encryption.caesarDecrypt(text, shift);
                outputText.value = result;
                break;
                
            case 'vigenere':
                const vigenereKey = keyInput.value;
                if (!isValidVigenereKey(vigenereKey)) {
                    showMessage('Ключ Виженера должен содержать буквы', 'error');
                    return;
                }
                result = encryption.vigenereDecrypt(text, vigenereKey);
                outputText.value = result;
                break;
                
            case 'xor':
                const xorKey = keyInput.value;
                if (!xorKey) {
                    showMessage('Введите ключ для XOR шифрования', 'error');
                    return;
                }
                result = encryption.xorDecrypt(text, xorKey);
                outputText.value = result;
                break;
        }
        
        showMessage('Текст успешно дешифрован!', 'success');
    } catch (error) {
        showMessage('Ошибка дешифрования: ' + error.message, 'error');
    }
});

// Очистка
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    keyInput.value = '';
    showMessage('Поля очищены', 'success');
});

// Копирование результата
copyBtn.addEventListener('click', () => {
    const text = outputText.value;
    if (!text) {
        showMessage('Нечего копировать', 'error');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showMessage('Результат скопирован в буфер обмена!', 'success');
    }).catch(() => {
        showMessage('Ошибка копирования', 'error');
    });
});

// Показ сообщения
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '15px 25px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.animation = 'slideIn 0.3s ease';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#10b981';
        messageDiv.style.color = 'white';
    } else {
        messageDiv.style.backgroundColor = '#ef4444';
        messageDiv.style.color = 'white';
    }
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Добавление анимаций в стили
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация
algorithmSelect.dispatchEvent(new Event('change'));
