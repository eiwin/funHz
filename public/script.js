function speak(text) {
    // 检查是否支持语音合成
    if (!window.speechSynthesis) {
        console.error('浏览器不支持语音合成');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    
    // iOS Safari 需要用户交互才能播放声音
    try {
        // 在 iOS 上需要先恢复/重新开始语音合成
        speechSynthesis.cancel();
        
        // 添加错误处理
        utterance.onerror = (event) => {
            console.error('语音合成错误:', event);
        };

        // 添加语音播放完成处理
        utterance.onend = () => {
            console.log('语音播放完成');
        };

        // 播放声音
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error('语音播放失败:', error);
    }
}

async function loadRandomCharacter() {
    try {
        const response = await fetch('/api/random-character');
        const data = await response.json();
        updateContent(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function handleCharacterInput(event) {
    const character = event.target.value;
    if (character.length === 1) {
        try {
            const response = await fetch(`/api/character/${character}`);
            const data = await response.json();
            updateContent(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function updateContent(data) {
    if (!data) return;  // 添加空值检查

    // 更新主字符
    document.querySelector('.main-character').innerHTML = 
        `<ruby>${data.character}<rt>${data.pinyin}</rt></ruby>
         <button class="play-sound" onclick="speak('${data.character}')">🔊</button>`;
    
    // 更新英文翻译
    document.querySelector('.character-display .english').textContent = data.english;

    // 更新词语
    const wordsGrid = document.querySelector('.word-items-grid');
    wordsGrid.innerHTML = data.words.map(word => `
        <div class="word-item">
            <div class="chinese">
                ${word.chinese.split('').map(char => {
                    const pinyin = word.pinyin[char] || '';  // 添加默认值
                    return `<ruby>${char}<rt>${pinyin}</rt></ruby>`;
                }).join('')}
                <button class="play-sound" onclick="speak('${word.chinese}')">🔊</button>
            </div>
            <div class="english">${word.english}</div>
        </div>
    `).join('');

    // 更新例句
    const sentencesSection = document.querySelector('.sentences-section');
    sentencesSection.innerHTML = data.sentences.map(sentence => `
        <div class="sentence-item">
            <div class="chinese">
                ${sentence.chinese.split('').map(char => {
                    const pinyin = sentence.pinyin[char] || '';  // 添加默认值
                    return `<ruby>${char}<rt>${pinyin}</rt></ruby>`;
                }).join('')}
                <button class="play-sound" onclick="speak('${sentence.chinese}')">🔊</button>
            </div>
            <div class="english">${sentence.english}</div>
        </div>
    `).join('');

    // 更新趣味解释
    document.querySelector('.fun-fact-item').innerHTML = `
        <div class="chinese">${data.funFact.chinese}</div>
        <div class="english">${data.funFact.english}</div>
    `;
}

let characterCategories = {};  // 存储所有分类数据
let currentCategory = 'all';   // 当前选中的分类
let currentPage = 1;          // 当前页码
const charsPerPage = 40;      // 每页显示的字数
let filteredChars = [];       // 筛选后的汉字列表

// 从服务器获取分类数据
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        characterCategories = await response.json();
        console.log('Loaded categories:', characterCategories); // 调试用
        updateCharacterDisplay();
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// 获取当前分类的所有汉字
function getAllChars() {
    if (currentCategory === 'all') {
        // 获取所有分类的汉字
        let allChars = [];
        for (const category in characterCategories) {
            if (characterCategories[category].chars) {
                allChars = allChars.concat(characterCategories[category].chars);
            }
        }
        return allChars;
    } else {
        // 获取特定分类的汉字
        return characterCategories[currentCategory] ? 
            characterCategories[currentCategory].chars || [] : [];
    }
}

// 搜索和过滤
function filterCharacters(searchText, level) {
    const chars = getAllChars();
    return chars.filter(char => {
        const matchesSearch = !searchText || char.char.includes(searchText);
        const matchesLevel = level === 'all' || parseInt(level) === char.level;
        return matchesSearch && matchesLevel;
    });
}

// 更新显示
function updateCharacterDisplay() {
    const searchText = document.getElementById('charSearch').value;
    const level = document.getElementById('levelSelect').value;
    
    // 确保有数据
    if (!characterCategories || Object.keys(characterCategories).length === 0) {
        console.log('No categories loaded yet');
        return;
    }

    // 获取并过滤字符
    filteredChars = filterCharacters(searchText, level);
    console.log('Filtered chars:', filteredChars);
    
    // 检查字符数据格式
    if (!Array.isArray(filteredChars) || filteredChars.length === 0) {
        console.log('No characters found');
        const charsContainer = document.querySelector('.available-chars');
        charsContainer.innerHTML = '<div>暂无数据</div>';
        return;
    }
    
    // 计算分页
    const totalPages = Math.ceil(filteredChars.length / charsPerPage);
    currentPage = Math.min(currentPage, totalPages || 1);
    
    // 获取当前页的字符
    const startIndex = (currentPage - 1) * charsPerPage;
    const pageChars = filteredChars.slice(startIndex, startIndex + charsPerPage);
    
    // 更新字符显示
    const charsContainer = document.querySelector('.available-chars');
    charsContainer.innerHTML = pageChars.map(charData => {
        // 确保字符数据存在
        if (!charData || !charData.char) {
            console.error('Invalid character data:', charData);
            return '';
        }
        return `
            <button class="char-btn" onclick="selectCharacter('${charData.char}')">
                ${charData.char}
            </button>
        `;
    }).join('');
    
    // 更新分页信息
    document.getElementById('pageInfo').textContent = 
        `第 ${currentPage} 页 / 共 ${totalPages || 1} 页`;

    // 更新分类按钮状态
    updateCategoryButtons();
}

// 切换分类
function switchCategory(category) {
    currentCategory = category;
    currentPage = 1;
    console.log('Switching to category:', category); // 调试用
    updateCharacterDisplay();
}

// 更新分类按钮状态
function updateCategoryButtons() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const category = btn.getAttribute('onclick').match(/switchCategory\('(.+)'\)/)[1];
        btn.classList.toggle('active', category === currentCategory);
    });
}

// 添加分页功能
function changePage(direction) {
    const totalPages = Math.ceil(filteredChars.length / charsPerPage) || 1;
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    updateCharacterDisplay();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 加载分类数据
    loadCategories();
    
    // 添加搜索框事件监听
    document.getElementById('charSearch').addEventListener('input', () => {
        currentPage = 1;
        updateCharacterDisplay();
    });

    // 添加难度选择事件监听
    document.getElementById('levelSelect').addEventListener('change', () => {
        currentPage = 1;
        updateCharacterDisplay();
    });

    // 添加事件监听
    loadRandomCharacter();
    document.getElementById('characterInput').addEventListener('input', handleCharacterInput);

    // iOS Safari 需要用户交互才能初始化语音
    document.body.addEventListener('touchstart', () => {
        if (window.speechSynthesis) {
            // 初始化语音合成
            speechSynthesis.cancel();
        }
    }, { once: true });
});

// 添加选择汉字的函数
async function selectCharacter(char) {
    try {
        const response = await fetch(`/api/character/${char}`);
        const data = await response.json();
        updateContent(data);
        
        // 更新选中状态
        document.querySelectorAll('.char-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === char) {
                btn.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
