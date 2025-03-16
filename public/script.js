// 全局变量
let learningProgress = {};
let currentCategory = 'all';
let currentLevel = 'all';
let currentPage = 1;
let itemsPerPage = 12;
let availableCharacters = [];
let characterCategories = {};

function speak(text) {
    // 添加动画效果
    const soundButton = document.querySelector('.play-sound:hover') || document.querySelector('.main-character .play-sound');
    if (soundButton) {
        soundButton.classList.add('wiggle');
        setTimeout(() => soundButton.classList.remove('wiggle'), 1000);
    }
    
    // 检测是否是Edge浏览器
    const isEdge = /Edg/.test(navigator.userAgent);
    
    // 在iOS设备上直接显示备选方案对话框
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        console.log('iOS设备检测到，直接显示备选方案');
        // 如果是Edge浏览器，尝试使用Edge TTS API
        if (isEdge) {
            console.log('Edge浏览器检测到，尝试使用Edge TTS API');
            showToast('尝试使用Edge TTS... (Trying Edge TTS...)');
        } else {
            showTTSGuide(text);
            return;
        }
    }
    
    // 显示加载提示
    showToast('正在加载语音... (Loading audio...)');
    
    // 使用微软Edge浏览器TTS服务 - 这个服务通常没有CORS限制
    const audio = new Audio();
    
    // 微软Edge TTS API
    audio.src = `https://api.edge-speech-tts.cn/api/tts?text=${encodeURIComponent(text)}&lang=zh-CN&voice=zh-CN-XiaoxiaoNeural`;
    
    // 播放音频
    audio.play()
        .then(() => {
            console.log('音频播放成功');
            showToast('播放中... (Playing...)');
            
            // 播放完成后显示鼓励信息
            audio.onended = () => {
                if (Math.random() < 0.3) {
                    showAchievement('🎯', '发音真棒！(Great pronunciation!)');
                }
            };
        })
        .catch(error => {
            console.error('音频播放失败:', error);
            console.log('尝试备用方案');
            
            // 如果微软API失败，尝试使用有道TTS API
            tryYoudaoTTS(text);
        });
}

// 使用有道TTS API作为备用方案
function tryYoudaoTTS(text) {
    showToast('尝试备用语音服务... (Trying backup service...)');
    
    // 创建音频元素
    const audio = new Audio();
    
    // 有道翻译TTS API
    audio.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=zh&type=1`;
    
    // 播放音频
    audio.play()
        .then(() => {
            console.log('备用音频播放成功');
            showToast('播放中... (Playing...)');
            
            // 播放完成后显示鼓励信息
            audio.onended = () => {
                if (Math.random() < 0.3) {
                    showAchievement('🎯', '发音真棒！(Great pronunciation!)');
                }
            };
        })
        .catch(error => {
            console.error('备用音频播放失败:', error);
            
            // 如果两个API都失败，尝试使用讯飞TTS API
            tryXunfeiTTS(text);
        });
}

// 使用讯飞TTS API作为第三备选方案
function tryXunfeiTTS(text) {
    showToast('尝试第三备用语音服务... (Trying third backup service...)');
    
    // 创建音频元素
    const audio = new Audio();
    
    // 讯飞开放平台TTS API (通过代理)
    audio.src = `https://fanyi.sogou.com/reventondc/synthesis?text=${encodeURIComponent(text)}&speed=1&lang=zh-CHS&from=translateweb&speaker=1`;
    
    // 播放音频
    audio.play()
        .then(() => {
            console.log('第三备用音频播放成功');
            showToast('播放中... (Playing...)');
            
            // 播放完成后显示鼓励信息
            audio.onended = () => {
                if (Math.random() < 0.3) {
                    showAchievement('🎯', '发音真棒！(Great pronunciation!)');
                }
            };
        })
        .catch(error => {
            console.error('第三备用音频播放失败:', error);
            
            // 如果所有API都失败，显示模态对话框
            showTTSGuide(text);
        });
}

// 显示TTS指南对话框（作为最后的备选方案）
function showTTSGuide(text) {
    // 创建一个模态对话框
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.padding = '20px';
    
    // 创建内容容器
    const container = document.createElement('div');
    container.style.backgroundColor = 'white';
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.maxWidth = '90%';
    container.style.textAlign = 'center';
    
    // 添加标题
    const title = document.createElement('h2');
    title.textContent = '语音播放选项 (Audio Options)';
    title.style.marginBottom = '20px';
    container.appendChild(title);
    
    // 添加文本显示
    const textDisplay = document.createElement('div');
    textDisplay.style.fontSize = '2rem';
    textDisplay.style.padding = '20px';
    textDisplay.style.marginBottom = '20px';
    textDisplay.style.backgroundColor = '#f8f8f8';
    textDisplay.style.borderRadius = '5px';
    textDisplay.textContent = text;
    container.appendChild(textDisplay);
    
    // 添加说明
    const instructions = document.createElement('div');
    instructions.style.marginBottom = '20px';
    instructions.style.textAlign = 'left';
    instructions.innerHTML = `
        <p>请选择以下翻译服务来听发音：</p>
        <p style="color: #666;">Please select a translation service to hear pronunciation:</p>
    `;
    container.appendChild(instructions);
    
    // 添加按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.alignItems = 'center';
    buttonContainer.style.gap = '15px';
    buttonContainer.style.marginBottom = '20px';
    
    // 添加打开谷歌翻译按钮
    const openGoogleButton = document.createElement('button');
    openGoogleButton.textContent = '谷歌翻译 (Google Translate)';
    openGoogleButton.style.padding = '15px 25px';
    openGoogleButton.style.width = '90%';
    openGoogleButton.style.backgroundColor = '#4285F4';
    openGoogleButton.style.color = 'white';
    openGoogleButton.style.border = 'none';
    openGoogleButton.style.borderRadius = '5px';
    openGoogleButton.style.cursor = 'pointer';
    openGoogleButton.style.fontSize = '1.2rem';
    openGoogleButton.onclick = () => {
        window.open(`https://translate.google.com/?sl=zh-CN&tl=en&text=${encodeURIComponent(text)}&op=translate`, '_blank');
    };
    buttonContainer.appendChild(openGoogleButton);
    
    // 添加打开百度翻译按钮
    const openBaiduButton = document.createElement('button');
    openBaiduButton.textContent = '百度翻译 (Baidu Translate)';
    openBaiduButton.style.padding = '15px 25px';
    openBaiduButton.style.width = '90%';
    openBaiduButton.style.backgroundColor = '#2932E1';
    openBaiduButton.style.color = 'white';
    openBaiduButton.style.border = 'none';
    openBaiduButton.style.borderRadius = '5px';
    openBaiduButton.style.cursor = 'pointer';
    openBaiduButton.style.fontSize = '1.2rem';
    openBaiduButton.onclick = () => {
        window.open(`https://fanyi.baidu.com/#zh/en/${encodeURIComponent(text)}`, '_blank');
    };
    buttonContainer.appendChild(openBaiduButton);
    
    // 添加打开有道翻译按钮
    const openYoudaoButton = document.createElement('button');
    openYoudaoButton.textContent = '有道翻译 (Youdao Translate)';
    openYoudaoButton.style.padding = '15px 25px';
    openYoudaoButton.style.width = '90%';
    openYoudaoButton.style.backgroundColor = '#2A9D8F';
    openYoudaoButton.style.color = 'white';
    openYoudaoButton.style.border = 'none';
    openYoudaoButton.style.borderRadius = '5px';
    openYoudaoButton.style.cursor = 'pointer';
    openYoudaoButton.style.fontSize = '1.2rem';
    openYoudaoButton.onclick = () => {
        window.open(`https://www.youdao.com/w/eng/${encodeURIComponent(text)}/#keyfrom=dict2.index`, '_blank');
    };
    buttonContainer.appendChild(openYoudaoButton);
    
    // 添加Edge浏览器提示
    const edgeTip = document.createElement('div');
    edgeTip.style.backgroundColor = '#f0f8ff';
    edgeTip.style.padding = '15px';
    edgeTip.style.borderRadius = '5px';
    edgeTip.style.marginBottom = '15px';
    edgeTip.style.width = '90%';
    edgeTip.style.textAlign = 'left';
    edgeTip.style.fontSize = '0.9rem';
    edgeTip.innerHTML = `
        <p><strong>💡 提示 (Tip):</strong></p>
        <p>想要更好的语音体验？尝试使用手机版Edge浏览器并启用"允许跨域请求"。</p>
        <p style="color: #666;">For better voice experience, try using Edge browser on mobile and enable "Allow cross-origin requests".</p>
    `;
    buttonContainer.appendChild(edgeTip);
    
    // 添加关闭按钮
    const closeButton = document.createElement('button');
    closeButton.textContent = '关闭 (Close)';
    closeButton.style.padding = '12px 20px';
    closeButton.style.width = '50%';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '1rem';
    closeButton.onclick = () => document.body.removeChild(modal);
    buttonContainer.appendChild(closeButton);
    
    container.appendChild(buttonContainer);
    
    // 将容器添加到模态框
    modal.appendChild(container);
    
    // 将模态框添加到页面
    document.body.appendChild(modal);
    
    // 60秒后自动关闭模态框（如果用户没有关闭）
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 60000);
}

// 使用Web Speech API播放（非iOS设备）
function playWithWebSpeechAPI(text) {
    if (!window.speechSynthesis) {
        console.error('浏览器不支持语音合成');
        showToast('抱歉，你的浏览器不支持语音功能 😢 (Sorry, your browser does not support speech)');
        return;
    }
    
    try {
        // 在播放前取消所有正在进行的语音
        window.speechSynthesis.cancel();
        
        // 创建新的语音合成实例
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        utterance.volume = 1.0;
        
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

// 回退到百度翻译方案（最后的备选方案）
function fallbackToBaiduTranslate(text) {
    // 使用百度翻译朗读功能（通过重定向）
    const baiduUrl = `https://fanyi.baidu.com/#zh/en/${encodeURIComponent(text)}`;
    
    // 显示提示
    showToast('正在打开百度翻译... (Opening Baidu Translate...)');
    
    // 打开新窗口
    window.open(baiduUrl, '_blank');
    
    // 显示使用说明
    setTimeout(() => {
        showToast('点击百度翻译页面上的发音图标 (Click the pronunciation icon)');
    }, 2000);
}

// 使用在线TTS服务播放声音
function playOnlineTTS(text) {
    // 显示加载提示
    showToast('正在加载语音... (Loading audio...)');
    
    // 创建音频元素
    const audio = new Audio();
    
    // 使用免费的在线TTS API
    // 注意：这里使用的是公共API，可能有使用限制，实际应用中可能需要注册获取API密钥
    const apiUrl = `https://api.voicerss.org/?key=e0d7d5d0b2b24ed08f2e5d5f7c71b1a1&hl=zh-cn&src=${encodeURIComponent(text)}`;
    
    // 设置音频源
    audio.src = apiUrl;
    
    // 音频加载事件
    audio.onloadeddata = () => {
        console.log('音频加载完成');
        showToast('语音已准备好 (Audio ready)');
    };
    
    // 播放错误处理
    audio.onerror = (error) => {
        console.error('音频播放错误:', error);
        showToast('语音加载失败，请重试 (Audio loading failed, please try again)');
        
        // 尝试使用备用API
        tryBackupTTS(text);
    };
    
    // 播放完成处理
    audio.onended = () => {
        console.log('音频播放完成');
        // 随机显示鼓励信息
        if (Math.random() < 0.3) {
            showAchievement('🎯', '发音真棒！(Great pronunciation!)');
        }
    };
    
    // 播放音频
    audio.play().catch(error => {
        console.error('播放失败:', error);
        
        // 尝试使用备用API
        tryBackupTTS(text);
    });
}

// 尝试使用备用TTS API
function tryBackupTTS(text) {
    console.log('尝试使用备用TTS API');
    showToast('正在尝试备用语音服务... (Trying backup service...)');
    
    // 创建音频元素
    const audio = new Audio();
    
    // 使用备用的在线TTS API
    const backupApiUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-CN&client=tw-ob`;
    
    // 设置音频源
    audio.src = backupApiUrl;
    
    // 播放错误处理
    audio.onerror = (error) => {
        console.error('备用API音频播放错误:', error);
        showToast('语音服务暂时不可用 (Voice service temporarily unavailable)');
        
        // 显示系统朗读指南作为最后的备选方案
        showSystemReaderGuide(text);
    };
    
    // 播放完成处理
    audio.onended = () => {
        console.log('备用API音频播放完成');
        // 随机显示鼓励信息
        if (Math.random() < 0.3) {
            showAchievement('🎯', '发音真棒！(Great pronunciation!)');
        }
    };
    
    // 播放音频
    audio.play().catch(error => {
        console.error('备用API播放失败:', error);
        showToast('语音服务暂时不可用 (Voice service temporarily unavailable)');
        
        // 显示系统朗读指南作为最后的备选方案
        showSystemReaderGuide(text);
    });
}

// 显示系统朗读指南（作为最后的备选方案）
function showSystemReaderGuide(text) {
    // 显示提示
    showToast('请使用系统朗读功能 (Please use system reader)');
    
    // 创建一个模态对话框
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.padding = '20px';
    
    // 创建内容容器
    const container = document.createElement('div');
    container.style.backgroundColor = 'white';
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.maxWidth = '90%';
    container.style.textAlign = 'center';
    
    // 添加标题
    const title = document.createElement('h2');
    title.textContent = '如何听发音 (How to hear pronunciation)';
    title.style.marginBottom = '20px';
    container.appendChild(title);
    
    // 添加文本显示
    const textDisplay = document.createElement('div');
    textDisplay.style.fontSize = '2rem';
    textDisplay.style.padding = '20px';
    textDisplay.style.marginBottom = '20px';
    textDisplay.style.backgroundColor = '#f8f8f8';
    textDisplay.style.borderRadius = '5px';
    textDisplay.textContent = text;
    container.appendChild(textDisplay);
    
    // 添加说明
    const instructions = document.createElement('ol');
    instructions.style.textAlign = 'left';
    instructions.style.marginBottom = '20px';
    
    const steps = [
        '长按上方文字 (Long press the text above)',
        '在弹出菜单中选择"朗读所选内容" (Select "Speak" from the popup menu)',
        '系统将朗读选中的文字 (The system will read the selected text)'
    ];
    
    steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        li.style.marginBottom = '10px';
        instructions.appendChild(li);
    });
    
    container.appendChild(instructions);
    
    // 添加关闭按钮
    const closeButton = document.createElement('button');
    closeButton.textContent = '关闭 (Close)';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => document.body.removeChild(modal);
    container.appendChild(closeButton);
    
    // 将容器添加到模态框
    modal.appendChild(container);
    
    // 将模态框添加到页面
    document.body.appendChild(modal);
}

// 使用音频API播放预录制的声音（适用于iOS）
function playAudioFile(text) {
    console.log('使用音频API播放:', text);
    
    // 创建音频元素
    const audio = new Audio();
    
    // 根据文本选择合适的音频文件
    let audioFile = '';
    
    // 单个汉字的处理
    if (text.length === 1) {
        // 使用汉字的Unicode编码作为文件名
        const charCode = text.charCodeAt(0).toString(16);
        audioFile = `/audio/${charCode}.mp3`;
    } else {
        // 对于短语，使用MD5哈希作为文件名（简化版）
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash = hash & hash; // 转换为32位整数
        }
        audioFile = `/audio/phrase_${Math.abs(hash)}.mp3`;
    }
    
    // 如果没有预录制的音频，使用文本到语音API生成
    if (!audioExists(audioFile)) {
        generateAndPlayTTS(text);
        return;
    }
    
    // 设置音频源
    audio.src = audioFile;
    
    // 播放音频
    audio.play().then(() => {
        console.log('音频播放成功');
        // 随机显示鼓励信息
        if (Math.random() < 0.3) {
            showAchievement('🎯', '发音真棒！(Great pronunciation!)');
        }
    }).catch(error => {
        console.error('音频播放失败:', error);
        // 如果播放失败，尝试使用TTS
        generateAndPlayTTS(text);
    });
}

// 检查音频文件是否存在（简化版，实际应用中需要服务器端支持）
function audioExists(audioFile) {
    // 这里简化处理，假设所有基本汉字都有预录制音频
    // 实际应用中应该通过AJAX请求或其他方式检查文件是否存在
    const basicChars = ['我', '你', '他', '她', '的', '是', '日', '月', '水', '火', '山', '树', 
                        '一', '二', '三', '四', '五', '看', '说', '走', '来', '去', '爸', '妈', '家', '哥', '姐'];
    
    // 如果是单个基本汉字，假设有预录制音频
    if (audioFile.includes('/audio/') && basicChars.includes(String.fromCharCode(parseInt(audioFile.split('/').pop().split('.')[0], 16)))) {
        return true;
    }
    
    // 否则假设没有预录制音频
    return false;
}

// 使用替代方法生成和播放TTS（适用于iOS）
function generateAndPlayTTS(text) {
    console.log('使用替代TTS方法播放:', text);
    
    // 创建一个隐藏的iframe，加载包含TTS功能的页面
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = `/tts.html?text=${encodeURIComponent(text)}`;
    
    // 添加到文档中
    document.body.appendChild(iframe);
    
    // 5秒后移除iframe
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 5000);
    
    // 显示提示
    showToast('正在播放语音... (Playing audio...)');
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
    
    // iOS设备提示
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        console.log('iOS设备检测到，显示提示');
        
        // 显示提示，引导用户使用
        showToast('点击声音按钮将显示翻译选项 (Tap sound button to show translation options)');
    }
});

// 预加载常用汉字的音频
function preloadCommonAudio() {
    const commonChars = ['我', '你', '他', '她', '的', '是'];
    
    commonChars.forEach(char => {
        const audio = new Audio();
        const charCode = char.charCodeAt(0).toString(16);
        audio.src = `/audio/${charCode}.mp3`;
        
        // 只预加载，不播放
        audio.preload = 'auto';
        
        console.log(`预加载音频: ${char}`);
    });
}

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
