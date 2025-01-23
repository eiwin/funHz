const express = require('express');
const path = require('path');
const { characterCategories, detailedCharData } = require('./data/characters');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// 获取所有分类和汉字列表
app.get('/api/categories', (req, res) => {
    // 确保数据格式正确
    console.log('Sending categories:', characterCategories);
    res.json(characterCategories);
});

// 获取指定汉字的详细信息
app.get('/api/character/:char', (req, res) => {
    const char = req.params.char;
    console.log('Requested character:', char);
    console.log('Found data:', detailedCharData[char]);
    if (detailedCharData[char]) {
        res.json(detailedCharData[char]);
    } else {
        res.status(404).json({ error: 'Character not found' });
    }
});

// 获取随机汉字的详细信息
app.get('/api/random-character', (req, res) => {
    const allChars = Object.keys(detailedCharData);
    const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
    res.json(detailedCharData[randomChar]);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 