# 趣学汉字 - 技术架构文档 (v1.0)

## 项目结构
```
project/
├── docs/                    # 文档目录
│   ├── technical-architecture.md
│   └── requirements.md
├── public/                  # 前端文件
│   ├── index.html          # 主页面
│   ├── styles.css          # 样式表
│   └── script.js           # 前端逻辑
├── data/                    # 数据文件
│   └── characters.js       # 汉字数据
└── server.js               # 服务器入口
```

## 技术栈
- 前端：原生 JavaScript, HTML5, CSS3
- 后端：Node.js, Express
- 数据存储：JavaScript 对象（内存存储）

## 核心模块

### 1. 数据结构
#### 1.1 分类数据 (characterCategories)
```javascript
{
    basic: {
        name: "基础字",
        description: "最基本的汉字",
        chars: [
            { char: "我", level: 1, pinyin: "wǒ", meaning: "I, me" }
            // ...
        ]
    }
    // ... 其他分类
}
```

#### 1.2 详细数据 (detailedCharData)
```javascript
{
    "我": {
        character: "我",
        pinyin: "wǒ",
        english: "I, me",
        words: [
            {
                chinese: "我们",
                pinyin: {"我": "wǒ", "们": "men"},
                english: "we"
            }
            // ... 更多词语
        ],
        sentences: [
            {
                chinese: "我是学生。",
                pinyin: {
                    "我": "wǒ", 
                    "是": "shì", 
                    "学": "xué",
                    "生": "shēng"
                },
                english: "I am a student."
            }
            // ... 更多例句
        ],
        funFact: {
            chinese: "趣味解释",
            english: "fun fact"
        }
    }
}
```

### 2. 前端模块
#### 2.1 页面结构 (index.html)
- 头部导航：分类切换、难度选择
- 汉字列表：分页显示、搜索功能
- 主内容区：汉字详情展示
- 学习内容：词语、例句、趣味解释

#### 2.2 样式设计 (styles.css)
- 响应式布局：适配不同屏幕尺寸
- 网格系统：词语和例句展示
- 交互动效：按钮和切换动画
- 主题定制：字体、颜色、间距

#### 2.3 交互逻辑 (script.js)
- 数据管理：加载和缓存数据
- 筛选系统：分类和难度筛选
- 分页控制：上一页/下一页
- 语音朗读：使用 Web Speech API
- 动态更新：内容实时更新

### 3. 后端模块 (server.js)
#### 3.1 服务器配置
- Express 服务器设置
- 静态文件服务
- API 路由处理
- 错误处理中间件

#### 3.2 API接口
```javascript
GET /api/categories
- 获取所有分类数据
- 返回：characterCategories 对象

GET /api/character/:char
- 获取指定汉字详细信息
- 参数：char (汉字)
- 返回：对应的 detailedCharData 对象

GET /api/random-character
- 获取随机汉字信息
- 返回：随机的 detailedCharData 对象
```

### 4. 数据模块 (data/characters.js)
#### 4.1 数据组织
- 分类管理：5个主要分类
- 难度划分：2个难度等级
- 详细信息：每字包含完整学习内容

#### 4.2 数据更新
- 手动更新：直接修改源文件
- 数据验证：确保格式正确
- 版本控制：记录数据变更

## 系统特点
1. 前后端分离：便于独立开发和维护
2. 模块化设计：功能独立，易于扩展
3. 响应式布局：支持多种设备访问
4. 实时交互：动态内容更新
5. 双语支持：中英文对照学习

## 技术考量
1. 选择原生技术栈：降低复杂度，便于维护
2. 内存数据存储：适合小规模数据，快速响应
3. 前端筛选：减少服务器压力，提升用户体验
4. 语音集成：利用浏览器原生API，无需额外依赖

## 未来扩展
1. 数据存储：迁移到数据库系统
2. 用户系统：添加账号和进度管理
3. 缓存层：引入Redis提升性能
4. API优化：支持批量操作和缓存
5. 前端框架：考虑使用Vue或React重构 