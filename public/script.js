// 全局变量
let learningProgress = {};
let currentCategory = 'all';
let currentLevel = 'all';
let currentPage = 1;
let itemsPerPage = 12;
let availableCharacters = [];
let characterCategories = {};

function speak(text) {
    // 检查是否支持语音合成
    if (!window.speechSynthesis) {
        console.error('浏览器不支持语音合成');
        showToast('抱歉，你的浏览器不支持语音功能 😢 (Sorry, your browser does not support speech)');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    
    // 添加动画效果
    const soundButton = document.querySelector('.play-sound:hover') || document.querySelector('.main-character .play-sound');
    if (soundButton) {
        soundButton.classList.add('wiggle');
        setTimeout(() => soundButton.classList.remove('wiggle'), 1000);
    }
    
    // iOS Safari 需要用户交互才能播放声音
    try {
        // 在 iOS 上需要先恢复/重新开始语音合成
        speechSynthesis.cancel();
        
        // 添加错误处理
        utterance.onerror = (event) => {
            console.error('语音合成错误:', event);
            showToast('语音播放失败 😢 (Speech playback failed)');
        };

        // 添加语音播放完成处理
        utterance.onend = () => {
            console.log('语音播放完成');
            // 随机显示鼓励信息
            if (Math.random() < 0.3) {
                showAchievement('🎯', '发音真棒！(Great pronunciation!)');
            }
        };

        // 播放声音
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error('语音播放失败:', error);
        showToast('语音播放失败 😢 (Speech playback failed)');
    }
}

// 显示成就/提示
function showAchievement(icon, text) {
    const achievement = document.getElementById('achievement');
    if (!achievement) return;
    
    achievement.querySelector('.achievement-icon').textContent = icon;
    achievement.querySelector('.achievement-text').textContent = text;
    achievement.classList.add('show');
    
    setTimeout(() => {
        achievement.classList.remove('show');
    }, 3000);
}

// 显示简短提示
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => toast.classList.add('show'), 10);
    
    // 自动消失
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 加载随机汉字
async function loadRandomCharacter() {
    try {
        const response = await fetch('/api/random-character');
        const data = await response.json();
        updateContent(data);
        
        // 添加动画效果
        animateCharacterDisplay();
        
        // 随机显示鼓励信息
        if (Math.random() < 0.3) {
            const messages = [
                {zh: '看看这个有趣的汉字！', en: 'Look at this interesting character!'},
                {zh: '新汉字来啦！', en: 'New character!'},
                {zh: '一起来学习吧！', en: 'Let\'s learn together!'},
                {zh: '这个汉字很有趣哦！', en: 'This character is fun!'}
            ];
            const selected = messages[Math.floor(Math.random() * messages.length)];
            showAchievement('✨', `${selected.zh} (${selected.en})`);
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('加载失败，请重试 😢 (Loading failed, please try again)');
    }
}

// 处理汉字输入
async function handleCharacterInput(event) {
    const character = event.target.value;
    if (character.length === 1) {
        try {
            const response = await fetch(`/api/character/${character}`);
            const data = await response.json();
            updateContent(data);
            
            // 添加动画效果
            animateCharacterDisplay();
            
            // 更新学习进度
            updateLearningProgress(character);
        } catch (error) {
            console.error('Error:', error);
            showToast('没有找到这个汉字 😢 (Character not found)');
        }
    }
}

// 更新学习进度
function updateLearningProgress(character) {
    if (!learningProgress[character]) {
        learningProgress[character] = {
            views: 0,
            practiced: false,
            games: 0
        };
    }
    
    learningProgress[character].views++;
    
    // 保存到本地存储
    localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
    
    // 更新进度条
    updateProgressBar();
    
    // 检查成就
    checkAchievements();
}

// 更新进度条
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    
    // 计算总体进度
    const totalChars = Object.keys(learningProgress).length;
    const learnedChars = Object.values(learningProgress).filter(p => p.views > 2).length;
    
    const percentage = totalChars > 0 ? Math.min(100, Math.round((learnedChars / 26) * 100)) : 0;
    progressBar.style.width = `${percentage}%`;
    
    // 如果进度达到100%，重置并添加星星
    if (percentage >= 100) {
        const stars = document.querySelectorAll('.star:not(.filled)');
        if (stars.length > 0) {
            stars[0].classList.add('filled');
            showAchievement('🌟', '恭喜获得一颗星星！(Congratulations on earning a star!)');
        }
        
        // 重置进度
        progressBar.style.width = '0%';
    }
}

// 检查成就
function checkAchievements() {
    const totalViews = Object.values(learningProgress).reduce((sum, p) => sum + p.views, 0);
    const uniqueChars = Object.keys(learningProgress).length;
    
    // 首次学习成就
    if (uniqueChars === 1) {
        showAchievement('🎉', '恭喜学习第一个汉字！(Congratulations on learning your first character!)');
    }
    
    // 学习5个汉字成就
    if (uniqueChars === 5) {
        showAchievement('🏆', '太棒了！已经学习了5个汉字！(Great! You\'ve learned 5 characters!)');
    }
    
    // 学习10个汉字成就
    if (uniqueChars === 10) {
        showAchievement('👑', '厉害！已经学习了10个汉字！(Amazing! You\'ve learned 10 characters!)');
    }
    
    // 查看次数成就
    if (totalViews === 20) {
        showAchievement('🔍', '你真勤奋！已经查看了20次汉字！(You\'re diligent! You\'ve viewed characters 20 times!)');
    }
}

// 添加角色显示动画
function animateCharacterDisplay() {
    const charDisplay = document.querySelector('.character-display');
    if (!charDisplay) return;
    
    charDisplay.classList.add('bounce');
    setTimeout(() => charDisplay.classList.remove('bounce'), 1000);
}

// 更新内容
function updateContent(data) {
    if (!data) {
        console.error('No data provided to updateContent');
        return;
    }
    
    // 更新主字符
    const mainCharElement = document.querySelector('.main-character');
    if (mainCharElement) {
        mainCharElement.innerHTML = 
            `<ruby>${data.character}<rt>${data.pinyin}</rt></ruby>
             <button class="play-sound" onclick="speak('${data.character}')">🔊</button>`;
    }
    
    // 更新英文翻译
    const englishElement = document.querySelector('.character-display .english');
    if (englishElement) {
        englishElement.textContent = data.english;
    }

    // 更新词语
    const wordsGrid = document.querySelector('.word-items-grid');
    if (wordsGrid && data.words) {
        wordsGrid.innerHTML = data.words.map(word => `
            <div class="word-item">
                <div class="chinese">
                    ${word.chinese.split('').map(char => 
                        `<ruby>${char}<rt>${word.pinyin[char] || ''}</rt></ruby>`
                    ).join('')}
                    <button class="play-sound" onclick="speak('${word.chinese}')">🔊</button>
                </div>
                <div class="english">${word.english}</div>
            </div>
        `).join('');
        
        // 添加动画
        Array.from(wordsGrid.children).forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 100);
        });
    }

    // 更新例句
    const sentencesSection = document.querySelector('.sentences-section');
    if (sentencesSection && data.sentences) {
        const sentencesHTML = data.sentences.map(sentence => `
            <div class="sentence-item">
                <div class="chinese">
                    ${sentence.chinese.split('').map(char => 
                        `<ruby>${char}<rt>${sentence.pinyin[char] || ''}</rt></ruby>`
                    ).join('')}
                    <button class="play-sound" onclick="speak('${sentence.chinese}')">🔊</button>
                </div>
                <div class="english">${sentence.english}</div>
            </div>
        `).join('');
        
        // 保留标题，更新内容
        const title = sentencesSection.querySelector('h2');
        sentencesSection.innerHTML = '';
        sentencesSection.appendChild(title);
        
        // 创建内容容器
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = sentencesHTML;
        sentencesSection.appendChild(contentDiv);
        
        // 添加动画
        Array.from(contentDiv.children).forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 200);
        });
    }

    // 更新趣味解释
    const funFactItem = document.querySelector('.fun-fact-item');
    if (funFactItem && data.funFact) {
        funFactItem.innerHTML = `
            <div class="chinese">${data.funFact.chinese}</div>
            <div class="english">${data.funFact.english}</div>
        `;
        funFactItem.classList.add('fade-in');
    }
    
    // 更新写字练习区域
    updateWritingPractice(data.character);
    
    // 更新游戏区域
    updateGameArea(data);
}

// 更新写字练习区域
function updateWritingPractice(character) {
    // 如果写字区域可见，重新初始化画布
    const writingSection = document.getElementById('writingPractice');
    if (writingSection && writingSection.style.display !== 'none') {
        initCanvas();
    }
}

// 更新游戏区域
function updateGameArea(data) {
    // 如果游戏区域可见，重新设置游戏
    const gameSection = document.getElementById('miniGame');
    if (gameSection && gameSection.style.display !== 'none') {
        setupPinyinGame();
    }
}

// 加载分类数据
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        
        // 保存分类数据
        characterCategories = data;
        
        // 提取所有可用汉字
        availableCharacters = [];
        for (const category in data) {
            if (data[category].chars && Array.isArray(data[category].chars)) {
                const categoryChars = data[category].chars.map(item => item.char);
                availableCharacters = availableCharacters.concat(categoryChars);
            }
        }
        
        // 去重
        availableCharacters = [...new Set(availableCharacters)];
        
        console.log('Available characters:', availableCharacters);
        
        // 更新汉字列表
        updateCharacterList();
    } catch (error) {
        console.error('Error loading categories:', error);
        showToast('加载分类失败 😢 (Failed to load categories)');
    }
}

// 切换分类
function switchCategory(category) {
    currentCategory = category;
    currentPage = 1;
    
    // 更新UI
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(category));
    });
    
    // 更新汉字列表
    updateCharacterList();
    
    // 添加动画效果
    const charList = document.querySelector('.character-list');
    if (charList) {
        charList.classList.add('fade-in');
        setTimeout(() => charList.classList.remove('fade-in'), 500);
    }
}

// 更新汉字列表
function updateCharacterList() {
    const charsContainer = document.querySelector('.available-chars');
    if (!charsContainer) return;
    
    // 过滤汉字
    let filteredChars = [];
    
    if (currentCategory === 'all') {
        filteredChars = availableCharacters;
    } else if (characterCategories[currentCategory] && characterCategories[currentCategory].chars) {
        filteredChars = characterCategories[currentCategory].chars.map(item => item.char);
    }
    
    // 应用搜索过滤
    const searchTerm = document.getElementById('charSearch')?.value || '';
    if (searchTerm) {
        filteredChars = filteredChars.filter(char => char.includes(searchTerm));
    }
    
    // 应用难度过滤
    if (currentLevel !== 'all' && characterCategories[currentCategory]) {
        const levelNum = parseInt(currentLevel);
        filteredChars = characterCategories[currentCategory].chars
            .filter(item => item.level === levelNum)
            .map(item => item.char);
    }
    
    // 计算分页
    const totalPages = Math.ceil(filteredChars.length / itemsPerPage) || 1;
    currentPage = Math.min(currentPage, totalPages);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageChars = filteredChars.slice(startIndex, endIndex);
    
    // 更新分页信息
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
        pageInfo.textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    }
    
    // 渲染汉字按钮
    if (pageChars.length > 0) {
        charsContainer.innerHTML = pageChars.map(char => {
            // 查找汉字的英文含义
            let meaning = '';
            for (const category in characterCategories) {
                const charData = characterCategories[category].chars?.find(item => item.char === char);
                if (charData && charData.meaning) {
                    meaning = charData.meaning;
                    break;
                }
            }
            
            return `
                <button class="char-btn" onclick="loadCharacter('${char}')" title="${meaning}">
                    ${char}
                    ${meaning ? `<span class="char-meaning">${meaning}</span>` : ''}
                </button>
            `;
        }).join('');
    } else {
        charsContainer.innerHTML = '<div style="text-align: center; padding: 20px;">没有找到符合条件的汉字 <span class="en-text">No matching characters found</span></div>';
    }
    
    // 添加动画
    Array.from(charsContainer.children).forEach((btn, index) => {
        setTimeout(() => {
            btn.classList.add('fade-in');
        }, index * 50);
    });
}

// 加载指定汉字
async function loadCharacter(character) {
    try {
        const response = await fetch(`/api/character/${character}`);
        const data = await response.json();
        updateContent(data);
        
        // 高亮当前选中的汉字
        document.querySelectorAll('.char-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.trim().startsWith(character));
        });
        
        // 添加动画效果
        animateCharacterDisplay();
        
        // 更新学习进度
        updateLearningProgress(character);
    } catch (error) {
        console.error('Error:', error);
        showToast('加载汉字失败 😢 (Failed to load character)');
    }
}

// 切换页面
function changePage(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next') {
        const totalChars = currentCategory === 'all' ? 
            availableCharacters.length : 
            (characterCategories[currentCategory]?.chars?.length || 0);
        const totalPages = Math.ceil(totalChars / itemsPerPage) || 1;
        
        if (currentPage < totalPages) {
            currentPage++;
        }
    }
    
    updateCharacterList();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 加载分类数据
    loadCategories();
    
    // 加载随机汉字
    loadRandomCharacter();
    
    // 从本地存储加载学习进度
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
        try {
            learningProgress = JSON.parse(savedProgress);
            updateProgressBar();
        } catch (e) {
            console.error('Error parsing saved progress:', e);
            learningProgress = {};
        }
    }
    
    // 添加搜索框事件监听
    const searchInput = document.getElementById('charSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentPage = 1;
            updateCharacterList();
        });
    }
    
    // 添加难度选择事件监听
    const levelSelect = document.getElementById('levelSelect');
    if (levelSelect) {
        levelSelect.addEventListener('change', () => {
            currentLevel = levelSelect.value;
            currentPage = 1;
            updateCharacterList();
        });
    }
    
    // 添加吉祥物交互
    const mascot = document.getElementById('mascot');
    if (mascot) {
        mascot.addEventListener('click', () => {
            mascot.textContent = ['🐼', '🐯', '🐶', '🐱', '🐰'][Math.floor(Math.random() * 5)];
            mascot.classList.add('bounce');
            setTimeout(() => mascot.classList.remove('bounce'), 1000);
            
            // 随机显示鼓励语
            const encouragements = [
                {zh: '加油！你真棒！', en: 'Great job!'},
                {zh: '继续学习！', en: 'Keep learning!'},
                {zh: '你学得真快！', en: 'You learn so fast!'},
                {zh: '太厉害了！', en: 'Amazing!'},
                {zh: '你是最棒的！', en: 'You are the best!'}
            ];
            const selected = encouragements[Math.floor(Math.random() * encouragements.length)];
            showAchievement('🎉', `${selected.zh} (${selected.en})`);
        });
    }
    
    // 添加页面动画
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });
    
    // 添加输入框事件监听
    const characterInput = document.getElementById('characterInput');
    if (characterInput) {
        characterInput.addEventListener('input', handleCharacterInput);
    }
});

// 添加CSS样式
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            z-index: 1000;
            transition: transform 0.3s ease;
        }
        
        .toast.show {
            transform: translateX(-50%) translateY(0);
        }
        
        .subtitle {
            font-size: 0.5em;
            display: block;
            color: var(--secondary);
            text-shadow: none;
        }
        
        .bounce {
            animation: bounce 1s;
        }
        
        .fade-in {
            animation: fadeIn 0.5s;
        }
        
        .writing-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        
        #writingCanvas {
            border: 3px solid var(--secondary);
            border-radius: 10px;
            background: #f9f9f9;
        }
        
        .writing-controls {
            display: flex;
            gap: 20px;
        }
        
        .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: var(--border-radius);
        }
        
        .game-instruction {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary);
        }
        
        .game-options {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
        }
        
        .game-option {
            padding: 15px 25px;
            font-size: 1.3rem;
            background: white;
            border: 3px solid var(--secondary);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .game-option:hover {
            background: var(--secondary);
            color: white;
            transform: translateY(-5px);
        }
        
        .game-result {
            font-size: 1.5rem;
            font-weight: bold;
            height: 40px;
        }
        
        .char-meaning {
            display: block;
            font-size: 0.6em;
            color: var(--light-text);
            margin-top: 3px;
            font-style: italic;
        }
        
        .char-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5px;
            height: auto;
            min-height: 50px;
        }
    `;
    document.head.appendChild(style);
}

// 添加样式
addStyles();
