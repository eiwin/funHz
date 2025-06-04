// Chinese Vocabulary Memorization App
class VocabularyApp {
    constructor() {
        this.vocabulary = JSON.parse(localStorage.getItem('chineseVocabulary')) || [];
        this.currentPracticeSet = [];
        this.currentCardIndex = 0;
        this.practiceStats = {
            correct: 0,
            incorrect: 0,
            total: 0
        };
        this.totalScore = parseInt(localStorage.getItem('totalScore')) || 0;
        this.isFlipped = false;
        this.isPinyinEditing = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
        this.updateScoreDisplay();
        
        // Add some sample words if vocabulary is empty
        if (this.vocabulary.length === 0) {
            this.addSampleWords();
        }
    }
    
    bindEvents() {
        // Add word form
        document.getElementById('addWordBtn').addEventListener('click', () => this.addWord());
        
        // Chinese input auto-pinyin generation
        document.getElementById('chineseInput').addEventListener('input', (e) => this.generatePinyin(e.target.value));
        
        // Edit pinyin button
        document.getElementById('editPinyinBtn').addEventListener('click', () => this.togglePinyinEdit());
        
        // Enter key support for inputs
        ['chineseInput', 'englishInput'].forEach(id => {
            document.getElementById(id).addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.addWord();
            });
        });
        
        // Pinyin input enter key (when editing)
        document.getElementById('pinyinInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (this.isPinyinEditing) {
                    this.togglePinyinEdit();
                } else {
                    this.addWord();
                }
            }
        });
        
        // Practice controls
        document.getElementById('startPracticeBtn').addEventListener('click', () => this.startPractice());
        document.getElementById('backBtn').addEventListener('click', () => this.backToWordList());
        
        // Flashcard controls
        document.getElementById('flipBtn').addEventListener('click', () => this.flipCard());
        document.getElementById('speakBtn').addEventListener('click', () => this.speakChinese());
        document.getElementById('knowBtn').addEventListener('click', () => this.markAsKnown());
        document.getElementById('dontKnowBtn').addEventListener('click', () => this.markAsUnknown());
        
        // Results controls
        document.getElementById('retryBtn').addEventListener('click', () => this.retryPractice());
        document.getElementById('continueBtn').addEventListener('click', () => this.backToWordList());
        
        // Mascot interaction
        document.getElementById('mascot').addEventListener('click', () => this.mascotInteraction());
    }
    
    generatePinyin(chineseText) {
        if (!chineseText.trim()) {
            document.getElementById('pinyinInput').value = '';
            return;
        }
        
        // Don't update if user is currently editing pinyin
        if (this.isPinyinEditing) {
            return;
        }
        
        // Use comprehensive built-in pinyin mapping
        const pinyinResult = this.convertToPinyin(chineseText);
        document.getElementById('pinyinInput').value = pinyinResult;
    }
    
    convertToPinyin(chineseText) {
        // Expanded pinyin mapping for Chinese characters
        const pinyinMap = {
            // Basic greetings and common words
            '你': 'nǐ', '好': 'hǎo', '我': 'wǒ', '是': 'shì', '的': 'de', '在': 'zài', 
            '有': 'yǒu', '不': 'bù', '人': 'rén', '他': 'tā', '她': 'tā', '它': 'tā', 
            '们': 'men', '这': 'zhè', '那': 'nà', '什': 'shén', '么': 'me', '时': 'shí',
            '候': 'hòu', '地': 'dì', '方': 'fāng', '年': 'nián', '月': 'yuè', '日': 'rì',
            
            // Common verbs
            '来': 'lái', '去': 'qù', '出': 'chū', '可': 'kě', '以': 'yǐ', '说': 'shuō',
            '话': 'huà', '看': 'kàn', '听': 'tīng', '吃': 'chī', '喝': 'hē', '买': 'mǎi',
            '卖': 'mài', '做': 'zuò', '想': 'xiǎng', '要': 'yào', '爱': 'ài', '喜': 'xǐ',
            '欢': 'huān', '学': 'xué', '习': 'xí', '工': 'gōng', '作': 'zuò', '休': 'xiū',
            '息': 'xī', '睡': 'shuì', '觉': 'jiào', '走': 'zǒu', '跑': 'pǎo', '飞': 'fēi',
            
            // Numbers
            '一': 'yī', '二': 'èr', '三': 'sān', '四': 'sì', '五': 'wǔ', '六': 'liù',
            '七': 'qī', '八': 'bā', '九': 'jiǔ', '十': 'shí', '零': 'líng', '百': 'bǎi',
            '千': 'qiān', '万': 'wàn',
            
            // Family
            '爸': 'bà', '妈': 'mā', '儿': 'ér', '女': 'nǚ', '子': 'zi', '孩': 'hái',
            '朋': 'péng', '友': 'yǒu', '老': 'lǎo', '师': 'shī', '同': 'tóng', '学': 'xué',
            
            // Food and drinks
            '苹': 'píng', '果': 'guǒ', '香': 'xiāng', '蕉': 'jiāo', '橙': 'chéng', '葡': 'pú',
            '萄': 'táo', '西': 'xī', '瓜': 'guā', '米': 'mǐ', '饭': 'fàn', '面': 'miàn',
            '包': 'bāo', '肉': 'ròu', '鱼': 'yú', '鸡': 'jī', '蛋': 'dàn', '菜': 'cài',
            '汤': 'tāng', '茶': 'chá', '咖': 'kā', '啡': 'fēi', '水': 'shuǐ', '奶': 'nǎi',
            
            // Colors
            '红': 'hóng', '黄': 'huáng', '蓝': 'lán', '绿': 'lǜ', '白': 'bái', '黑': 'hēi',
            '紫': 'zǐ', '粉': 'fěn', '灰': 'huī', '棕': 'zōng',
            
            // Adjectives
            '大': 'dà', '小': 'xiǎo', '高': 'gāo', '矮': 'ǎi', '长': 'cháng', '短': 'duǎn',
            '新': 'xīn', '旧': 'jiù', '快': 'kuài', '慢': 'màn', '热': 'rè', '冷': 'lěng',
            '好': 'hǎo', '坏': 'huài', '美': 'měi', '丑': 'chǒu', '胖': 'pàng', '瘦': 'shòu',
            '聪': 'cōng', '明': 'míng', '笨': 'bèn', '懒': 'lǎn', '勤': 'qín', '奋': 'fèn',
            
            // Transportation
            '车': 'chē', '船': 'chuán', '飞': 'fēi', '机': 'jī', '火': 'huǒ', '汽': 'qì',
            '自': 'zì', '行': 'xíng', '地': 'dì', '铁': 'tiě', '公': 'gōng', '交': 'jiāo',
            
            // Places
            '家': 'jiā', '学': 'xué', '校': 'xiào', '医': 'yī', '院': 'yuàn', '银': 'yín',
            '商': 'shāng', '店': 'diàn', '餐': 'cān', '厅': 'tīng', '公': 'gōng', '园': 'yuán',
            '图': 'tú', '书': 'shū', '馆': 'guǎn', '电': 'diàn', '影': 'yǐng', '城': 'chéng',
            '市': 'shì', '国': 'guó', '中': 'zhōng', '美': 'měi', '英': 'yīng', '法': 'fǎ',
            '德': 'dé', '日': 'rì', '本': 'běn', '韩': 'hán',
            
            // Body parts
            '头': 'tóu', '眼': 'yǎn', '睛': 'jīng', '鼻': 'bí', '嘴': 'zuǐ', '耳': 'ěr',
            '朵': 'duǒ', '手': 'shǒu', '脚': 'jiǎo', '腿': 'tuǐ', '身': 'shēn', '体': 'tǐ',
            
            // Technology
            '电': 'diàn', '脑': 'nǎo', '手': 'shǒu', '机': 'jī', '网': 'wǎng', '络': 'luò',
            '游': 'yóu', '戏': 'xì', '音': 'yīn', '乐': 'yuè', '视': 'shì', '频': 'pín',
            
            // Weather
            '天': 'tiān', '气': 'qì', '晴': 'qíng', '阴': 'yīn', '雨': 'yǔ', '雪': 'xuě',
            '风': 'fēng', '云': 'yún', '太': 'tài', '阳': 'yáng', '月': 'yuè', '亮': 'liàng',
            '星': 'xīng', '空': 'kōng',
            
            // Common expressions
            '谢': 'xiè', '对': 'duì', '起': 'qǐ', '没': 'méi', '关': 'guān', '系': 'xì',
            '再': 'zài', '见': 'jiàn', '请': 'qǐng', '问': 'wèn', '帮': 'bāng', '助': 'zhù',
            '谢': 'xiè', '谢': 'xiè', '客': 'kè', '气': 'qì', '欢': 'huān', '迎': 'yíng',
            
            // Time
            '今': 'jīn', '明': 'míng', '昨': 'zuó', '早': 'zǎo', '上': 'shàng', '中': 'zhōng',
            '午': 'wǔ', '下': 'xià', '晚': 'wǎn', '夜': 'yè', '点': 'diǎn', '分': 'fēn',
            '秒': 'miǎo', '小': 'xiǎo', '时': 'shí', '周': 'zhōu', '末': 'mò',
            
            // Money and shopping
            '钱': 'qián', '元': 'yuán', '块': 'kuài', '毛': 'máo', '分': 'fēn', '贵': 'guì',
            '便': 'pián', '宜': 'yí', '多': 'duō', '少': 'shǎo', '价': 'jià', '格': 'gé',
            
            // Emotions
            '高': 'gāo', '兴': 'xìng', '开': 'kāi', '心': 'xīn', '难': 'nán', '过': 'guò',
            '生': 'shēng', '气': 'qì', '害': 'hài', '怕': 'pà', '紧': 'jǐn', '张': 'zhāng',
            '放': 'fàng', '松': 'sōng', '累': 'lèi', '困': 'kùn',
            
            // Directions
            '东': 'dōng', '南': 'nán', '西': 'xī', '北': 'běi', '左': 'zuǒ', '右': 'yòu',
            '前': 'qián', '后': 'hòu', '里': 'lǐ', '外': 'wài', '旁': 'páng', '边': 'biān',
            
            // Common objects
            '房': 'fáng', '间': 'jiān', '门': 'mén', '窗': 'chuāng', '桌': 'zhuō', '椅': 'yǐ',
            '床': 'chuáng', '沙': 'shā', '发': 'fā', '电': 'diàn', '视': 'shì', '冰': 'bīng',
            '箱': 'xiāng', '洗': 'xǐ', '衣': 'yī', '空': 'kōng', '调': 'tiáo',
            
            // Clothing
            '衣': 'yī', '服': 'fú', '裤': 'kù', '裙': 'qún', '鞋': 'xié', '帽': 'mào',
            '袜': 'wà', '眼': 'yǎn', '镜': 'jìng', '手': 'shǒu', '表': 'biǎo', '包': 'bāo',
            
            // School subjects
            '语': 'yǔ', '文': 'wén', '数': 'shù', '英': 'yīng', '历': 'lì', '史': 'shǐ',
            '地': 'dì', '理': 'lǐ', '物': 'wù', '化': 'huà', '生': 'shēng', '物': 'wù',
            '音': 'yīn', '乐': 'yuè', '美': 'měi', '术': 'shù', '体': 'tǐ', '育': 'yù',
            
            // Sports
            '足': 'zú', '球': 'qiú', '篮': 'lán', '排': 'pái', '乒': 'pīng', '乓': 'pāng',
            '羽': 'yǔ', '毛': 'máo', '游': 'yóu', '泳': 'yǒng', '跑': 'pǎo', '步': 'bù',
            
            // Animals
            '猫': 'māo', '狗': 'gǒu', '鸟': 'niǎo', '鱼': 'yú', '马': 'mǎ', '牛': 'niú',
            '羊': 'yáng', '猪': 'zhū', '鸡': 'jī', '鸭': 'yā', '兔': 'tù', '熊': 'xióng',
            '猴': 'hóu', '老': 'lǎo', '虎': 'hǔ', '狮': 'shī', '象': 'xiàng', '蛇': 'shé', 
            '龙': 'lóng', '鼠': 'shǔ', '牛': 'niú', '虎': 'hǔ', '兔': 'tù', '龙': 'lóng',
            '蛇': 'shé', '马': 'mǎ', '羊': 'yáng', '猴': 'hóu', '鸡': 'jī', '狗': 'gǒu',
            '猪': 'zhū', '鹿': 'lù', '狼': 'láng', '狐': 'hú', '狸': 'lí', '熊': 'xióng',
            
            // More food items
            '饺': 'jiǎo', '子': 'zi', '馒': 'mán', '头': 'tóu', '粥': 'zhōu', '豆': 'dòu',
            '腐': 'fǔ', '酸': 'suān', '甜': 'tián', '苦': 'kǔ', '辣': 'là', '咸': 'xián',
            '油': 'yóu', '盐': 'yán', '糖': 'táng', '醋': 'cù', '酱': 'jiàng', '葱': 'cōng',
            '蒜': 'suàn', '姜': 'jiāng', '椒': 'jiāo', '萝': 'luó', '卜': 'bo', '土': 'tǔ',
            '豆': 'dòu', '白': 'bái', '菜': 'cài', '青': 'qīng', '花': 'huā', '菜': 'cài',
            
            // More verbs
            '跳': 'tiào', '唱': 'chàng', '跳': 'tiào', '舞': 'wǔ', '画': 'huà', '写': 'xiě',
            '读': 'dú', '背': 'bèi', '记': 'jì', '忘': 'wàng', '知': 'zhī', '道': 'dào',
            '懂': 'dǒng', '会': 'huì', '能': 'néng', '应': 'yīng', '该': 'gāi', '必': 'bì',
            '须': 'xū', '需': 'xū', '要': 'yào', '希': 'xī', '望': 'wàng', '打': 'dǎ',
            '拉': 'lā', '推': 'tuī', '拿': 'ná', '放': 'fàng', '给': 'gěi', '送': 'sòng',
            
            // More adjectives
            '漂': 'piào', '亮': 'liàng', '帅': 'shuài', '丑': 'chǒu', '年': 'nián', '轻': 'qīng',
            '老': 'lǎo', '幼': 'yòu', '强': 'qiáng', '弱': 'ruò', '健': 'jiàn', '康': 'kāng',
            '病': 'bìng', '痛': 'tòng', '舒': 'shū', '服': 'fú', '危': 'wēi', '险': 'xiǎn',
            '安': 'ān', '全': 'quán', '干': 'gān', '净': 'jìng', '脏': 'zāng', '乱': 'luàn',
            '整': 'zhěng', '齐': 'qí', '简': 'jiǎn', '单': 'dān', '复': 'fù', '杂': 'zá'
        };
        
        let hasUnknownChars = false;
        const result = chineseText.split('').map(char => {
            if (pinyinMap[char]) {
                return pinyinMap[char];
            } else if (/[\u4e00-\u9fff]/.test(char)) {
                // This is a Chinese character but not in our mapping
                hasUnknownChars = true;
                return `[${char}]`; // Mark unknown characters
            } else {
                // Not a Chinese character (punctuation, numbers, etc.)
                return char;
            }
        }).join(' ');
        
        // Notify user if some characters couldn't be converted
        if (hasUnknownChars) {
            this.showToast('部分字符需要手动编辑拼音 | Some characters need manual pinyin editing');
            // Make edit button more prominent
            const editBtn = document.getElementById('editPinyinBtn');
            editBtn.style.backgroundColor = '#ff6b6b';
            editBtn.style.animation = 'pulse 1s infinite';
        }
        
        return result;
    }
    
    fallbackPinyin(chineseText) {
        // This method is now replaced by the more comprehensive convertToPinyin method
        return this.convertToPinyin(chineseText);
    }
    
    togglePinyinEdit() {
        const pinyinInput = document.getElementById('pinyinInput');
        const editBtn = document.getElementById('editPinyinBtn');
        
        if (this.isPinyinEditing) {
            // Stop editing
            pinyinInput.readOnly = true;
            editBtn.textContent = '✏️ 编辑 | Edit';
            editBtn.classList.remove('editing');
            this.isPinyinEditing = false;
            pinyinInput.blur();
        } else {
            // Start editing
            pinyinInput.readOnly = false;
            editBtn.textContent = '✅ 完成 | Done';
            editBtn.classList.add('editing');
            this.isPinyinEditing = true;
            pinyinInput.focus();
            pinyinInput.select();
            
            // Reset button styling when user starts editing
            editBtn.style.backgroundColor = '';
            editBtn.style.animation = '';
        }
    }
    
    addSampleWords() {
        const sampleWords = [
            { chinese: '你好', pinyin: 'nǐ hǎo', english: 'hello' },
            { chinese: '谢谢', pinyin: 'xiè xiè', english: 'thank you' },
            { chinese: '苹果', pinyin: 'píng guǒ', english: 'apple' },
            { chinese: '学习', pinyin: 'xué xí', english: 'to study' },
            { chinese: '朋友', pinyin: 'péng yǒu', english: 'friend' }
        ];
        
        sampleWords.forEach(word => {
            this.vocabulary.push({ ...word, id: Date.now() + Math.random() });
        });
        
        this.saveVocabulary();
        this.updateDisplay();
    }
    
    addWord() {
        const chinese = document.getElementById('chineseInput').value.trim();
        const pinyin = document.getElementById('pinyinInput').value.trim();
        const english = document.getElementById('englishInput').value.trim();
        
        if (!chinese || !english) {
            this.showToast('请填写汉字和英文 | Please fill Chinese and English fields');
            return;
        }
        
        if (!pinyin) {
            this.showToast('拼音未生成，请检查汉字输入 | Pinyin not generated, please check Chinese input');
            return;
        }
        
        // Check for duplicates
        if (this.vocabulary.some(word => word.chinese === chinese)) {
            this.showToast('这个词已经存在 | This word already exists');
            return;
        }
        
        const newWord = {
            id: Date.now(),
            chinese,
            pinyin,
            english,
            addedAt: new Date().toISOString()
        };
        
        this.vocabulary.push(newWord);
        this.saveVocabulary();
        this.updateDisplay();
        this.clearInputs();
        
        this.showToast('词汇添加成功！| Word added successfully!');
        this.showAchievement('📚', '新词汇已添加！| New word added!');
    }
    
    clearInputs() {
        document.getElementById('chineseInput').value = '';
        document.getElementById('pinyinInput').value = '';
        document.getElementById('englishInput').value = '';
        
        // Reset pinyin editing state
        if (this.isPinyinEditing) {
            this.togglePinyinEdit();
        }
    }
    
    deleteWord(id) {
        this.vocabulary = this.vocabulary.filter(word => word.id !== id);
        this.saveVocabulary();
        this.updateDisplay();
        this.showToast('词汇已删除 | Word deleted');
    }
    
    updateDisplay() {
        const wordsGrid = document.getElementById('wordsGrid');
        const startBtn = document.getElementById('startPracticeBtn');
        
        if (this.vocabulary.length === 0) {
            wordsGrid.innerHTML = '<p style="text-align: center; color: #718096;">还没有词汇，请先添加一些词汇 | No words yet, please add some words</p>';
            startBtn.disabled = true;
        } else {
            wordsGrid.innerHTML = this.vocabulary.map(word => `
                <div class="word-card">
                    <button class="delete-btn" onclick="app.deleteWord(${word.id})">×</button>
                    <div class="chinese">${word.chinese}</div>
                    <div class="pinyin">${word.pinyin}</div>
                    <div class="english">${word.english}</div>
                </div>
            `).join('');
            startBtn.disabled = false;
        }
    }
    
    startPractice() {
        if (this.vocabulary.length < 2) {
            this.showToast('至少需要2个词汇才能开始练习 | Need at least 2 words to practice');
            return;
        }
        
        // Reset practice stats
        this.practiceStats = { correct: 0, incorrect: 0, total: 0 };
        this.currentCardIndex = 0;
        
        // Create practice set (shuffle vocabulary)
        this.currentPracticeSet = [...this.vocabulary].sort(() => Math.random() - 0.5);
        
        // Show practice section
        document.getElementById('addWordsSection').classList.add('hidden');
        document.getElementById('practiceSection').classList.remove('hidden');
        
        this.showCurrentCard();
        this.updateProgress();
    }
    
    showCurrentCard() {
        if (this.currentCardIndex >= this.currentPracticeSet.length) {
            this.showResults();
            return;
        }
        
        const currentWord = this.currentPracticeSet[this.currentCardIndex];
        
        // Reset card state
        this.isFlipped = false;
        document.getElementById('flashcard').classList.remove('flipped');
        document.getElementById('cardFront').classList.remove('hidden');
        document.getElementById('cardBack').classList.add('hidden');
        document.getElementById('multipleChoice').classList.add('hidden');
        
        // Update card content - only show Chinese on front
        document.getElementById('chineseText').textContent = currentWord.chinese;
        // Pinyin and English will be shown on the back when flipped
        document.getElementById('pinyinText').textContent = currentWord.pinyin;
        document.getElementById('englishText').textContent = currentWord.english;
        
        // Store current word data for flip
        this.currentWord = currentWord;
        
        this.updateProgress();
    }
    
    flipCard() {
        this.isFlipped = !this.isFlipped;
        const flashcard = document.getElementById('flashcard');
        const cardFront = document.getElementById('cardFront');
        const cardBack = document.getElementById('cardBack');
        
        if (this.isFlipped) {
            flashcard.classList.add('flipped');
            cardFront.classList.add('hidden');
            cardBack.classList.remove('hidden');
        } else {
            flashcard.classList.remove('flipped');
            cardFront.classList.remove('hidden');
            cardBack.classList.add('hidden');
        }
    }
    
    speakChinese() {
        const currentWord = this.currentPracticeSet[this.currentCardIndex];
        if (!currentWord) return;
        
        // Try different TTS methods
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentWord.chinese);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        } else {
            this.showToast('语音功能不可用 | Speech not available');
        }
    }
    
    markAsKnown() {
        this.practiceStats.correct++;
        this.practiceStats.total++;
        this.addScore(10);
        this.showAchievement('✅', '答对了！| Correct!');
        this.nextCard();
    }
    
    markAsUnknown() {
        this.practiceStats.incorrect++;
        this.practiceStats.total++;
        
        // Add word back to practice set for review
        const currentWord = this.currentPracticeSet[this.currentCardIndex];
        this.currentPracticeSet.push(currentWord);
        
        this.showAchievement('❌', '再试一次！| Try again!');
        this.nextCard();
    }
    
    nextCard() {
        setTimeout(() => {
            this.currentCardIndex++;
            this.showCurrentCard();
        }, 1000);
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const progress = (this.currentCardIndex / this.currentPracticeSet.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${this.currentCardIndex}/${this.currentPracticeSet.length}`;
    }
    
    showResults() {
        // Hide flashcard, show results
        document.querySelector('.flashcard-container').classList.add('hidden');
        document.getElementById('resultsSection').classList.remove('hidden');
        
        // Calculate final score
        const accuracy = this.practiceStats.total > 0 ? 
            Math.round((this.practiceStats.correct / this.practiceStats.total) * 100) : 0;
        
        // Update results display
        document.getElementById('finalScore').textContent = accuracy;
        document.getElementById('correctCount').textContent = this.practiceStats.correct;
        document.getElementById('incorrectCount').textContent = this.practiceStats.incorrect;
        
        // Add bonus score based on accuracy
        const bonusScore = Math.floor(accuracy / 10) * 5;
        this.addScore(bonusScore);
        
        // Show achievement based on performance
        if (accuracy >= 90) {
            this.showAchievement('🏆', '完美表现！| Perfect performance!');
        } else if (accuracy >= 70) {
            this.showAchievement('🎉', '表现很好！| Great job!');
        } else {
            this.showAchievement('💪', '继续努力！| Keep trying!');
        }
    }
    
    retryPractice() {
        // Reset and restart practice
        document.getElementById('resultsSection').classList.add('hidden');
        document.querySelector('.flashcard-container').classList.remove('hidden');
        this.startPractice();
    }
    
    backToWordList() {
        document.getElementById('practiceSection').classList.add('hidden');
        document.getElementById('addWordsSection').classList.remove('hidden');
        
        // Reset practice section state
        document.getElementById('resultsSection').classList.add('hidden');
        document.querySelector('.flashcard-container').classList.remove('hidden');
    }
    
    addScore(points) {
        this.totalScore += points;
        localStorage.setItem('totalScore', this.totalScore.toString());
        this.updateScoreDisplay();
    }
    
    updateScoreDisplay() {
        document.getElementById('totalScore').textContent = this.totalScore;
        
        // Update stars based on score
        const stars = document.querySelectorAll('.star');
        const filledStars = Math.min(Math.floor(this.totalScore / 100), stars.length);
        
        stars.forEach((star, index) => {
            if (index < filledStars) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    }
    
    mascotInteraction() {
        const mascot = document.getElementById('mascot');
        const mascots = ['🐼', '🐯', '🐶', '🐱', '🐰', '🦊', '🐸', '🐨'];
        mascot.textContent = mascots[Math.floor(Math.random() * mascots.length)];
        
        const encouragements = [
            '加油！你真棒！| Great job!',
            '继续学习！| Keep learning!',
            '你学得真快！| You learn so fast!',
            '太厉害了！| Amazing!',
            '你是最棒的！| You are the best!'
        ];
        
        const message = encouragements[Math.floor(Math.random() * encouragements.length)];
        this.showAchievement('🎉', message);
    }
    
    showAchievement(icon, text) {
        const popup = document.getElementById('achievementPopup');
        const iconEl = document.getElementById('achievementIcon');
        const textEl = document.getElementById('achievementText');
        
        iconEl.textContent = icon;
        textEl.textContent = text;
        
        popup.classList.remove('hidden');
        
        // Auto-hide after 1.5 seconds (shorter)
        const autoHideTimeout = setTimeout(() => {
            popup.classList.add('hidden');
        }, 1500);
        
        // Click to dismiss immediately
        const clickHandler = () => {
            popup.classList.add('hidden');
            clearTimeout(autoHideTimeout);
            popup.removeEventListener('click', clickHandler);
        };
        popup.addEventListener('click', clickHandler);
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        const toastText = document.getElementById('toastText');
        
        toastText.textContent = message;
        toast.classList.remove('hidden');
        
        // Auto-hide after 2 seconds (shorter)
        const autoHideTimeout = setTimeout(() => {
            toast.classList.add('hidden');
        }, 2000);
        
        // Click to dismiss immediately
        const clickHandler = () => {
            toast.classList.add('hidden');
            clearTimeout(autoHideTimeout);
            toast.removeEventListener('click', clickHandler);
        };
        toast.addEventListener('click', clickHandler);
    }
    
    saveVocabulary() {
        localStorage.setItem('chineseVocabulary', JSON.stringify(this.vocabulary));
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VocabularyApp();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!window.app) return;
    
    // Only work when practice section is visible
    const practiceSection = document.getElementById('practiceSection');
    if (practiceSection.classList.contains('hidden')) return;
    
    switch(e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            if (!window.app.isFlipped) {
                window.app.flipCard();
            }
            break;
        case 'ArrowRight':
        case 'y':
        case 'Y':
            e.preventDefault();
            if (window.app.isFlipped) {
                window.app.markAsKnown();
            }
            break;
        case 'ArrowLeft':
        case 'n':
        case 'N':
            e.preventDefault();
            if (window.app.isFlipped) {
                window.app.markAsUnknown();
            }
            break;
        case 's':
        case 'S':
            e.preventDefault();
            window.app.speakChinese();
            break;
    }
}); 