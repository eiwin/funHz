const characterCategories = {
    basic: {
        name: "基础字",
        description: "最基本的汉字",
        chars: [
            { char: "我", level: 1, pinyin: "wǒ", meaning: "I, me" },
            { char: "你", level: 1, pinyin: "nǐ", meaning: "you" },
            { char: "他", level: 1, pinyin: "tā", meaning: "he" },
            { char: "她", level: 1, pinyin: "tā", meaning: "she" },
            { char: "的", level: 1, pinyin: "de", meaning: "of, 's" },
            { char: "是", level: 1, pinyin: "shì", meaning: "is, am, are" }
        ]
    },
    nature: {
        name: "自然",
        description: "自然相关的字",
        chars: [
            { char: "日", level: 1, pinyin: "rì", meaning: "sun" },
            { char: "月", level: 1, pinyin: "yuè", meaning: "moon" },
            { char: "水", level: 1, pinyin: "shuǐ", meaning: "water" },
            { char: "火", level: 1, pinyin: "huǒ", meaning: "fire" },
            { char: "山", level: 1, pinyin: "shān", meaning: "mountain" },
            { char: "树", level: 2, pinyin: "shù", meaning: "tree" }
        ]
    },
    numbers: {
        name: "数字",
        description: "数字和量词",
        chars: [
            { char: "一", level: 1, pinyin: "yī", meaning: "one" },
            { char: "二", level: 1, pinyin: "èr", meaning: "two" },
            { char: "三", level: 1, pinyin: "sān", meaning: "three" },
            { char: "四", level: 1, pinyin: "sì", meaning: "four" },
            { char: "五", level: 1, pinyin: "wǔ", meaning: "five" }
        ]
    },
    actions: {
        name: "动作",
        description: "常用动词",
        chars: [
            { char: "看", level: 1, pinyin: "kàn", meaning: "look/watch/read" },
            { char: "说", level: 1, pinyin: "shuō", meaning: "speak/say" },
            { char: "走", level: 1, pinyin: "zǒu", meaning: "walk" },
            { char: "来", level: 1, pinyin: "lái", meaning: "come" },
            { char: "去", level: 1, pinyin: "qù", meaning: "go" }
        ]
    },
    family: {
        name: "家庭",
        description: "家庭相关的字",
        chars: [
            { char: "爸", level: 1, pinyin: "bà", meaning: "father" },
            { char: "妈", level: 1, pinyin: "mā", meaning: "mother" },
            { char: "家", level: 1, pinyin: "jiā", meaning: "home" },
            { char: "哥", level: 1, pinyin: "gē", meaning: "older brother" },
            { char: "姐", level: 1, pinyin: "jiě", meaning: "older sister" }
        ]
    }
};

// 为每个汉字添加详细信息
const detailedCharData = {
    "我": {
        character: "我",
        pinyin: "wǒ",
        english: "I, me",
        words: [
            {
                chinese: "我们",
                pinyin: {"我": "wǒ", "们": "men"},
                english: "we, us"
            },
            {
                chinese: "我的",
                pinyin: {"我": "wǒ", "的": "de"},
                english: "my, mine"
            }
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
        ],
        funFact: {
            chinese: "「我」是最基本的人称代词，每个人都会用到。",
            english: "'我(wǒ)' is the most basic personal pronoun, everyone uses it."
        }
    },
    "你": {
        character: "你",
        pinyin: "nǐ",
        english: "you",
        words: [
            {
                chinese: "你好",
                pinyin: {"你": "nǐ", "好": "hǎo"},
                english: "hello"
            },
            {
                chinese: "谢谢你",
                pinyin: {"谢": "xiè", "谢": "xiè", "你": "nǐ"},
                english: "thank you"
            },
            {
                chinese: "你们",
                pinyin: {"你": "nǐ", "们": "men"},
                english: "you (plural)"
            },
            {
                chinese: "你的",
                pinyin: {"你": "nǐ", "的": "de"},
                english: "your, yours"
            }
        ],
        sentences: [
            {
                chinese: "你是中国人吗？",
                pinyin: {
                    "你": "nǐ",
                    "是": "shì",
                    "中": "zhōng",
                    "国": "guó",
                    "人": "rén",
                    "吗": "ma",
                    "？": ""
                },
                english: "Are you Chinese?"
            },
            {
                chinese: "你好，很高兴认识你。",
                pinyin: {
                    "你": "nǐ",
                    "好": "hǎo",
                    "很": "hěn",
                    "高": "gāo",
                    "兴": "xìng",
                    "认": "rèn",
                    "识": "shi",
                    "你": "nǐ",
                    "。": ""
                },
                english: "Hello, nice to meet you."
            }
        ],
        funFact: {
            chinese: "汉字'你'的左边是'亻'，表示和人有关。右边的'尔'在古代是'你'的意思。这个字就是用来称呼别人的！",
            english: "The character '你' has '亻' on the left, which relates to people. The '尔' on the right meant 'you' in ancient Chinese. This character is used to address others!"
        }
    },
    "他": {
        character: "他",
        pinyin: "tā",
        english: "he",
        words: [
            {
                chinese: "他们",
                pinyin: {"他": "tā", "们": "men"},
                english: "they (male/mixed group)"
            },
            {
                chinese: "他的",
                pinyin: {"他": "tā", "的": "de"},
                english: "his"
            },
            {
                chinese: "他是",
                pinyin: {"他": "tā", "是": "shì"},
                english: "he is"
            },
            {
                chinese: "和他",
                pinyin: {"和": "hé", "他": "tā"},
                english: "with him"
            }
        ],
        sentences: [
            {
                chinese: "他是我的朋友。",
                pinyin: {
                    "他": "tā",
                    "是": "shì",
                    "我": "wǒ",
                    "的": "de",
                    "朋": "péng",
                    "友": "yǒu",
                    "。": ""
                },
                english: "He is my friend."
            },
            {
                chinese: "他在学习中文。",
                pinyin: {
                    "他": "tā",
                    "在": "zài",
                    "学": "xué",
                    "习": "xí",
                    "中": "zhōng",
                    "文": "wén",
                    "。": ""
                },
                english: "He is learning Chinese."
            }
        ],
        funFact: {
            chinese: "'他'字的左边是'亻'，表示人。右边是'也'，在古代是一个代词。这个字专门用来指代男性或不确定性别的人！",
            english: "The character '他' has '亻' (person) on the left and '也' on the right, which was a pronoun in ancient Chinese. This character is used specifically for males or when gender is unknown!"
        }
    },
    "她": {
        character: "她",
        pinyin: "tā",
        english: "she",
        words: [
            {
                chinese: "她们",
                pinyin: {"她": "tā", "们": "men"},
                english: "they (female group)"
            },
            {
                chinese: "她的",
                pinyin: {"她": "tā", "的": "de"},
                english: "her"
            },
            {
                chinese: "是她",
                pinyin: {"是": "shì", "她": "tā"},
                english: "is her"
            },
            {
                chinese: "和她",
                pinyin: {"和": "hé", "她": "tā"},
                english: "with her"
            }
        ],
        sentences: [
            {
                chinese: "她是老师。",
                pinyin: {
                    "她": "tā",
                    "是": "shì",
                    "老": "lǎo",
                    "师": "shī",
                    "。": ""
                },
                english: "She is a teacher."
            },
            {
                chinese: "她喜欢看书。",
                pinyin: {
                    "她": "tā",
                    "喜": "xǐ",
                    "欢": "huan",
                    "看": "kàn",
                    "书": "shū",
                    "。": ""
                },
                english: "She likes reading books."
            }
        ],
        funFact: {
            chinese: "'她'是一个比较新的汉字！在20世纪初才创造出来，专门用来指代女性。左边的'女'字表示女性，这让我们很容易记住它的意思。",
            english: "The character '她' is relatively new! It was created in the early 20th century specifically for females. The '女' (female) radical on the left makes it easy to remember its meaning."
        }
    },
    "树": {
        character: "树",
        pinyin: "shù",
        english: "tree",
        words: [
            {
                chinese: "大树",
                pinyin: {"大": "dà", "树": "shù"},
                english: "big tree"
            },
            {
                chinese: "树叶",
                pinyin: {"树": "shù", "叶": "yè"},
                english: "leaf"
            },
            {
                chinese: "果树",
                pinyin: {"果": "guǒ", "树": "shù"},
                english: "fruit tree"
            },
            {
                chinese: "种树",
                pinyin: {"种": "zhòng", "树": "shù"},
                english: "plant trees"
            }
        ],
        sentences: [
            {
                chinese: "院子里有一棵大树。",
                pinyin: {
                    "院": "yuàn",
                    "子": "zi",
                    "里": "lǐ",
                    "有": "yǒu",
                    "一": "yī",
                    "棵": "kē",
                    "大": "dà",
                    "树": "shù",
                    "。": ""
                },
                english: "There is a big tree in the yard."
            },
            {
                chinese: "果树上结满了果子。",
                pinyin: {
                    "果": "guǒ",
                    "树": "shù",
                    "上": "shàng",
                    "结": "jiē",
                    "满": "mǎn",
                    "了": "le",
                    "果": "guǒ",
                    "子": "zi",
                    "。": ""
                },
                english: "The fruit tree is full of fruits."
            }
        ],
        funFact: {
            chinese: "树是大自然送给我们的礼物！大树能给我们遮阳，果树能给我们水果。春天的时候，树叶变绿了，人们也开始种树。大自然真是太神奇了！",
            english: "Trees are nature's gift to us! Big trees provide us with shade, and fruit trees give us fruits. In spring, the leaves turn green, and people start planting trees. Nature is amazing!"
        }
    },
    "水": {
        character: "水",
        pinyin: "shuǐ",
        english: "water",
        words: [
            {
                chinese: "水果",
                pinyin: {"水": "shuǐ", "果": "guǒ"},
                english: "fruit"
            },
            {
                chinese: "饮水",
                pinyin: {"饮": "yǐn", "水": "shuǐ"},
                english: "drink water"
            },
            {
                chinese: "水平",
                pinyin: {"水": "shuǐ", "平": "píng"},
                english: "level"
            },
            {
                chinese: "海水",
                pinyin: {"海": "hǎi", "水": "shuǐ"},
                english: "seawater"
            }
        ],
        sentences: [
            {
                chinese: "妈妈买了新鲜的水果。",
                pinyin: {
                    "妈": "mā",
                    "妈": "ma",
                    "买": "mǎi",
                    "了": "le",
                    "新": "xīn",
                    "鲜": "xiān",
                    "的": "de",
                    "水": "shuǐ",
                    "果": "guǒ",
                    "。": ""
                },
                english: "Mom bought fresh fruit."
            },
            {
                chinese: "海水很蓝很清澈。",
                pinyin: {
                    "海": "hǎi",
                    "水": "shuǐ",
                    "很": "hěn",
                    "蓝": "lán",
                    "很": "hěn",
                    "清": "qīng",
                    "澈": "chè",
                    "。": ""
                },
                english: "The seawater is blue and clear."
            }
        ],
        funFact: {
            chinese: "水是生命之源！这个字的形状像流动的水。在古代，人们就住在河流附近，因为水对生活非常重要。我们每天都要饮水，水果里面也含有水分。大海里的海水可以变成云，然后变成雨水，就像变魔术一样神奇！",
            english: "Water is the source of life! This character looks like flowing water. In ancient times, people lived near rivers because water was essential for life. We need to drink water every day, and fruits contain water too. The seawater in the ocean can turn into clouds and then rain, like magic!"
        }
    },
    "火": {
        character: "火",
        pinyin: "huǒ",
        english: "fire",
        words: [
            {
                chinese: "火车",
                pinyin: {"火": "huǒ", "车": "chē"},
                english: "train"
            },
            {
                chinese: "火焰",
                pinyin: {"火": "huǒ", "焰": "yàn"},
                english: "flame"
            },
            {
                chinese: "火柴",
                pinyin: {"火": "huǒ", "柴": "chái"},
                english: "match"
            },
            {
                chinese: "火山",
                pinyin: {"火": "huǒ", "山": "shān"},
                english: "volcano"
            }
        ],
        sentences: [
            {
                chinese: "火车从北京开往上海。",
                pinyin: {
                    "火": "huǒ",
                    "车": "chē",
                    "从": "cóng",
                    "北": "běi",
                    "京": "jīng",
                    "开": "kāi",
                    "往": "wǎng",
                    "上": "shàng",
                    "海": "hǎi",
                    "。": ""
                },
                english: "The train goes from Beijing to Shanghai."
            },
            {
                chinese: "火山喷出红色的火焰。",
                pinyin: {
                    "火": "huǒ",
                    "山": "shān",
                    "喷": "pēn",
                    "出": "chū",
                    "红": "hóng",
                    "色": "sè",
                    "的": "de",
                    "火": "huǒ",
                    "焰": "yàn",
                    "。": ""
                },
                english: "The volcano erupts with red flames."
            }
        ],
        funFact: {
            chinese: "火是人类最重要的发现之一！这个字的形状像上升的火焰。古代人用火取暖、照明和烹饪。现在我们有了火车这样快速的交通工具，也知道了火山会喷出火焰。火给我们带来了温暖和光明，但我们也要小心使用它！",
            english: "Fire is one of humanity's most important discoveries! This character looks like rising flames. Ancient people used fire for warmth, light, and cooking. Now we have trains for fast transportation and know that volcanoes erupt with flames. Fire brings us warmth and light, but we must use it carefully!"
        }
    },
    "山": {
        character: "山",
        pinyin: "shān",
        english: "mountain",
        words: [
            {
                chinese: "山水",
                pinyin: {"山": "shān", "水": "shuǐ"},
                english: "landscape"
            },
            {
                chinese: "火山",
                pinyin: {"火": "huǒ", "山": "shān"},
                english: "volcano"
            },
            {
                chinese: "山路",
                pinyin: {"山": "shān", "路": "lù"},
                english: "mountain road"
            },
            {
                chinese: "爬山",
                pinyin: {"爬": "pá", "山": "shān"},
                english: "climb mountains"
            }
        ],
        sentences: [
            {
                chinese: "这座山很高很美。",
                pinyin: {
                    "这": "zhè",
                    "座": "zuò",
                    "山": "shān",
                    "很": "hěn",
                    "高": "gāo",
                    "很": "hěn",
                    "美": "měi",
                    "。": ""
                },
                english: "This mountain is very tall and beautiful."
            },
            {
                chinese: "周末我们去爬山。",
                pinyin: {
                    "周": "zhōu",
                    "末": "mò",
                    "我": "wǒ",
                    "们": "men",
                    "去": "qù",
                    "爬": "pá",
                    "山": "shān",
                    "。": ""
                },
                english: "We go mountain climbing on weekends."
            }
        ],
        funFact: {
            chinese: "山这个字的形状就像三座连在一起的山峰！中国有很多著名的山，比如泰山、黄山。古代很多诗人都喜欢写关于山水的诗。人们常说'山高水长'，形容大自然的壮美。",
            english: "The character '山' looks like three mountain peaks connected together! China has many famous mountains like Mount Tai and Huangshan. Ancient poets loved to write about mountains and waters. People often say 'mountains high and waters long' to describe nature's grandeur."
        }
    },
    "日": {
        character: "日",
        pinyin: "rì",
        english: "sun/day",
        words: [
            {
                chinese: "日出",
                pinyin: {"日": "rì", "出": "chū"},
                english: "sunrise"
            },
            {
                chinese: "生日",
                pinyin: {"生": "shēng", "日": "rì"},
                english: "birthday"
            },
            {
                chinese: "日记",
                pinyin: {"日": "rì", "记": "jì"},
                english: "diary"
            },
            {
                chinese: "今日",
                pinyin: {"今": "jīn", "日": "rì"},
                english: "today"
            }
        ],
        sentences: [
            {
                chinese: "太阳每天从东方升起。",
                pinyin: {
                    "太": "tài",
                    "阳": "yáng",
                    "每": "měi",
                    "天": "tiān",
                    "从": "cóng",
                    "东": "dōng",
                    "方": "fāng",
                    "升": "shēng",
                    "起": "qǐ",
                    "。": ""
                },
                english: "The sun rises from the east every day."
            },
            {
                chinese: "今天是我的生日。",
                pinyin: {
                    "今": "jīn",
                    "天": "tiān",
                    "是": "shì",
                    "我": "wǒ",
                    "的": "de",
                    "生": "shēng",
                    "日": "rì",
                    "。": ""
                },
                english: "Today is my birthday."
            }
        ],
        funFact: {
            chinese: "'日'的形状就像一个圆圆的太阳！这个字在甲骨文中就是一个圆圈，代表太阳。古人通过观察太阳来计算时间，所以'日'也表示'天'的意思。每天写日记，记录生活中的点点滴滴，日子过得真快啊！",
            english: "The character '日' looks like a round sun! In ancient oracle bone inscriptions, it was a circle representing the sun. Ancient people used the sun to measure time, so '日' also means 'day'. Writing a diary every day helps us record our daily life - time flies!"
        }
    },
    "月": {
        character: "月",
        pinyin: "yuè",
        english: "moon/month",
        words: [
            {
                chinese: "月亮",
                pinyin: {"月": "yuè", "亮": "liàng"},
                english: "moon"
            },
            {
                chinese: "月饼",
                pinyin: {"月": "yuè", "饼": "bǐng"},
                english: "mooncake"
            },
            {
                chinese: "本月",
                pinyin: {"本": "běn", "月": "yuè"},
                english: "this month"
            },
            {
                chinese: "月光",
                pinyin: {"月": "yuè", "光": "guāng"},
                english: "moonlight"
            }
        ],
        sentences: [
            {
                chinese: "月亮在夜空中很明亮。",
                pinyin: {
                    "月": "yuè",
                    "亮": "liàng",
                    "在": "zài",
                    "夜": "yè",
                    "空": "kōng",
                    "中": "zhōng",
                    "很": "hěn",
                    "明": "míng",
                    "亮": "liàng",
                    "。": ""
                },
                english: "The moon is bright in the night sky."
            },
            {
                chinese: "中秋节我们吃月饼。",
                pinyin: {
                    "中": "zhōng",
                    "秋": "qiū",
                    "节": "jié",
                    "我": "wǒ",
                    "们": "men",
                    "吃": "chī",
                    "月": "yuè",
                    "饼": "bǐng",
                    "。": ""
                },
                english: "We eat mooncakes during the Mid-Autumn Festival."
            }
        ],
        funFact: {
            chinese: "'月'字的形状像一弯新月！月亮每个月都会经历圆缺变化，所以古人用月亮的圆缺周期来计算月份。中秋节的时候，人们赏月吃月饼，寄托着对团圆的思念。",
            english: "The character '月' looks like a crescent moon! The moon's phases helped ancient people measure months. During the Mid-Autumn Festival, people admire the moon and eat mooncakes, expressing their longing for family reunion."
        }
    },
    "一": {
        character: "一",
        pinyin: "yī",
        english: "one",
        words: [
            {
                chinese: "第一",
                pinyin: {"第": "dì", "一": "yī"},
                english: "first"
            },
            {
                chinese: "一起",
                pinyin: {"一": "yī", "起": "qǐ"},
                english: "together"
            },
            {
                chinese: "一天",
                pinyin: {"一": "yī", "天": "tiān"},
                english: "one day"
            },
            {
                chinese: "统一",
                pinyin: {"统": "tǒng", "一": "yī"},
                english: "unite"
            }
        ],
        sentences: [
            {
                chinese: "他是我的第一个朋友。",
                pinyin: {
                    "他": "tā",
                    "是": "shì",
                    "我": "wǒ",
                    "的": "de",
                    "第": "dì",
                    "一": "yī",
                    "个": "gè",
                    "朋": "péng",
                    "友": "yǒu",
                    "。": ""
                },
                english: "He is my first friend."
            },
            {
                chinese: "我们一起学习。",
                pinyin: {
                    "我": "wǒ",
                    "们": "men",
                    "一": "yī",
                    "起": "qǐ",
                    "学": "xué",
                    "习": "xí",
                    "。": ""
                },
                english: "We study together."
            }
        ],
        funFact: {
            chinese: "'一'是最简单的汉字之一！它就像地平线一样平直。这个字代表'开始'和'统一'的意思。在写汉字时，'一'是最基本的横线，几乎所有汉字都离不开这个基本笔画！",
            english: "The character '一' is one of the simplest Chinese characters! It looks like a horizon line. It represents 'beginning' and 'unity'. When writing Chinese characters, '一' is the most basic horizontal stroke, almost all characters contain this fundamental stroke!"
        }
    },
    "二": {
        character: "二",
        pinyin: "èr",
        english: "two",
        words: [
            {
                chinese: "二月",
                pinyin: {"二": "èr", "月": "yuè"},
                english: "February"
            },
            {
                chinese: "第二",
                pinyin: {"第": "dì", "二": "èr"},
                english: "second"
            },
            {
                chinese: "二手",
                pinyin: {"二": "èr", "手": "shǒu"},
                english: "second-hand"
            },
            {
                chinese: "二胡",
                pinyin: {"二": "èr", "胡": "hú"},
                english: "erhu (Chinese violin)"
            }
        ],
        sentences: [
            {
                chinese: "我住在二楼。",
                pinyin: {
                    "我": "wǒ",
                    "住": "zhù",
                    "在": "zài",
                    "二": "èr",
                    "楼": "lóu",
                    "。": ""
                },
                english: "I live on the second floor."
            },
            {
                chinese: "二月是春节的时候。",
                pinyin: {
                    "二": "èr",
                    "月": "yuè",
                    "是": "shì",
                    "春": "chūn",
                    "节": "jié",
                    "的": "de",
                    "时": "shí",
                    "候": "hòu",
                    "。": ""
                },
                english: "February is when the Spring Festival occurs."
            }
        ],
        funFact: {
            chinese: "'二'就是两条横线，一上一下！这个字很容易记，因为它就是两个'一'。有趣的是，'二'在中国文化中并不总是好的意思，比如'二手'表示用过的，'二流'表示不是最好的。但是二胡这个乐器却非常优美！",
            english: "The character '二' is simply two horizontal lines, one above the other! It's easy to remember as it's just two '一's. Interestingly, '二' doesn't always have positive connotations in Chinese culture - '二手' means second-hand, '二流' means second-rate. However, the erhu (二胡) is a beautiful musical instrument!"
        }
    },
    "三": {
        character: "三",
        pinyin: "sān",
        english: "three",
        words: [
            {
                chinese: "三月",
                pinyin: {"三": "sān", "月": "yuè"},
                english: "March"
            },
            {
                chinese: "第三",
                pinyin: {"第": "dì", "三": "sān"},
                english: "third"
            },
            {
                chinese: "三角",
                pinyin: {"三": "sān", "角": "jiǎo"},
                english: "triangle"
            },
            {
                chinese: "三明治",
                pinyin: {"三": "sān", "明": "míng", "治": "zhì"},
                english: "sandwich"
            }
        ],
        sentences: [
            {
                chinese: "我有三个好朋友。",
                pinyin: {
                    "我": "wǒ",
                    "有": "yǒu",
                    "三": "sān",
                    "个": "gè",
                    "好": "hǎo",
                    "朋": "péng",
                    "友": "yǒu",
                    "。": ""
                },
                english: "I have three good friends."
            },
            {
                chinese: "他住在三楼。",
                pinyin: {
                    "他": "tā",
                    "住": "zhù",
                    "在": "zài",
                    "三": "sān",
                    "楼": "lóu",
                    "。": ""
                },
                english: "He lives on the third floor."
            }
        ],
        funFact: {
            chinese: "'三'的形状就是三条横线！在中国文化中，三是一个很吉利的数字。'三'常常表示'多'的意思，比如'三思而行'意思是好好想一想再做。有趣的是，三明治虽然是外国食物，但是用'三'字来翻译，因为它通常是三层的！",
            english: "The character '三' consists of three horizontal lines! In Chinese culture, three is a lucky number. '三' often means 'many', like in the saying '三思而行' (think thrice before acting). Interestingly, 'sandwich' is translated using '三' because it typically has three layers!"
        }
    },
    "四": {
        character: "四",
        pinyin: "sì",
        english: "four",
        words: [
            {
                chinese: "四季",
                pinyin: {"四": "sì", "季": "jì"},
                english: "four seasons"
            },
            {
                chinese: "四方",
                pinyin: {"四": "sì", "方": "fāng"},
                english: "square; all directions"
            },
            {
                chinese: "四月",
                pinyin: {"四": "sì", "月": "yuè"},
                english: "April"
            },
            {
                chinese: "四周",
                pinyin: {"四": "sì", "周": "zhōu"},
                english: "surroundings"
            }
        ],
        sentences: [
            {
                chinese: "一年有四个季节。",
                pinyin: {
                    "一": "yī",
                    "年": "nián",
                    "有": "yǒu",
                    "四": "sì",
                    "个": "gè",
                    "季": "jì",
                    "节": "jié",
                    "。": ""
                },
                english: "There are four seasons in a year."
            },
            {
                chinese: "我们家在四楼。",
                pinyin: {
                    "我": "wǒ",
                    "们": "men",
                    "家": "jiā",
                    "在": "zài",
                    "四": "sì",
                    "楼": "lóu",
                    "。": ""
                },
                english: "Our home is on the fourth floor."
            }
        ],
        funFact: {
            chinese: "'四'这个字的发音和'死'很像，所以在中国文化中常常被认为是不吉利的数字。但是'四季'、'四方'这样的词却很常用。春夏秋冬四个季节轮回交替，展现着大自然的规律！",
            english: "The character '四' sounds similar to '死' (death), so it's often considered unlucky in Chinese culture. However, words like '四季' (four seasons) and '四方' (all directions) are commonly used. The cycle of spring, summer, autumn, and winter shows nature's rhythm!"
        }
    },
    "五": {
        character: "五",
        pinyin: "wǔ",
        english: "five",
        words: [
            {
                chinese: "五月",
                pinyin: {"五": "wǔ", "月": "yuè"},
                english: "May"
            },
            {
                chinese: "五行",
                pinyin: {"五": "wǔ", "行": "xíng"},
                english: "five elements"
            },
            {
                chinese: "五官",
                pinyin: {"五": "wǔ", "官": "guān"},
                english: "facial features"
            },
            {
                chinese: "五颜六色",
                pinyin: {"五": "wǔ", "颜": "yán", "六": "liù", "色": "sè"},
                english: "colorful"
            }
        ],
        sentences: [
            {
                chinese: "现在是五点钟。",
                pinyin: {
                    "现": "xiàn",
                    "在": "zài",
                    "是": "shì",
                    "五": "wǔ",
                    "点": "diǎn",
                    "钟": "zhōng",
                    "。": ""
                },
                english: "It's five o'clock now."
            },
            {
                chinese: "五月的天气很舒服。",
                pinyin: {
                    "五": "wǔ",
                    "月": "yuè",
                    "的": "de",
                    "天": "tiān",
                    "气": "qì",
                    "很": "hěn",
                    "舒": "shū",
                    "服": "fú",
                    "。": ""
                },
                english: "The weather in May is very comfortable."
            }
        ],
        funFact: {
            chinese: "'五'在中国文化中是很重要的数字！中国传统文化中有'五行'（金木水火土）、'五味'（酸甜苦辣咸）、'五官'（眼耳鼻舌身）等概念。'五颜六色'形容色彩丰富，让生活充满趣味！",
            english: "The number '五' is significant in Chinese culture! Traditional Chinese culture includes concepts like the 'Five Elements' (metal, wood, water, fire, earth), 'Five Tastes' (sour, sweet, bitter, spicy, salty), and 'Five Senses' (eyes, ears, nose, tongue, body). '五颜六色' describes colorful variety, making life more interesting!"
        }
    },
    "看": {
        character: "看",
        pinyin: "kàn",
        english: "look/watch/read",
        words: [
            {
                chinese: "看书",
                pinyin: {"看": "kàn", "书": "shū"},
                english: "read books"
            },
            {
                chinese: "看见",
                pinyin: {"看": "kàn", "见": "jiàn"},
                english: "see"
            },
            {
                chinese: "看病",
                pinyin: {"看": "kàn", "病": "bìng"},
                english: "see a doctor"
            },
            {
                chinese: "看电影",
                pinyin: {"看": "kàn", "电": "diàn", "影": "yǐng"},
                english: "watch a movie"
            }
        ],
        sentences: [
            {
                chinese: "我喜欢看中文书。",
                pinyin: {
                    "我": "wǒ",
                    "喜": "xǐ",
                    "欢": "huān",
                    "看": "kàn",
                    "中": "zhōng",
                    "文": "wén",
                    "书": "shū",
                    "。": ""
                },
                english: "I like reading Chinese books."
            },
            {
                chinese: "他去医院看病了。",
                pinyin: {
                    "他": "tā",
                    "去": "qù",
                    "医": "yī",
                    "院": "yuàn",
                    "看": "kàn",
                    "病": "bìng",
                    "了": "le",
                    "。": ""
                },
                english: "He went to the hospital to see a doctor."
            }
        ],
        funFact: {
            chinese: "'看'字的上面是'手'，下面是'目'，表示用手遮在眼睛上看远处。这个字的用法很广，可以是用眼睛看，也可以是看病、看书等引申意义。'看'字让我们知道古人是多么形象地造字！",
            english: "The character '看' has '手' (hand) on top and '目' (eye) at the bottom, depicting someone shading their eyes with their hand to look into the distance. This character has many uses, from literally seeing with eyes to extended meanings like seeing a doctor or reading books. It shows how vividly ancient Chinese created characters!"
        }
    },
    "说": {
        character: "说",
        pinyin: "shuō",
        english: "speak/say",
        words: [
            {
                chinese: "说话",
                pinyin: {"说": "shuō", "话": "huà"},
                english: "speak"
            },
            {
                chinese: "说明",
                pinyin: {"说": "shuō", "明": "míng"},
                english: "explain"
            },
            {
                chinese: "游说",
                pinyin: {"游": "yóu", "说": "shuō"},
                english: "persuade"
            },
            {
                chinese: "听说",
                pinyin: {"听": "tīng", "说": "shuō"},
                english: "hear about"
            }
        ],
        sentences: [
            {
                chinese: "他说中文说得很好。",
                pinyin: {
                    "他": "tā",
                    "说": "shuō",
                    "中": "zhōng",
                    "文": "wén",
                    "说": "shuō",
                    "得": "de",
                    "很": "hěn",
                    "好": "hǎo",
                    "。": ""
                },
                english: "He speaks Chinese very well."
            },
            {
                chinese: "我听说你要去中国。",
                pinyin: {
                    "我": "wǒ",
                    "听": "tīng",
                    "说": "shuō",
                    "你": "nǐ",
                    "要": "yào",
                    "去": "qù",
                    "中": "zhōng",
                    "国": "guó",
                    "。": ""
                },
                english: "I heard that you are going to China."
            }
        ],
        funFact: {
            chinese: "'说'字的左边是'讠'（言字旁），表示和说话有关。右边的'兑'是声旁，提供发音线索。这个字告诉我们交流的重要性，'好好说话'是中国人常说的一句话，意思是要用友善的方式交流。",
            english: "The character '说' has '讠' (speech radical) on the left, indicating it's related to speaking. The '兑' on the right provides pronunciation hints. This character reminds us of the importance of communication. Chinese people often say '好好说话', meaning to communicate in a friendly way."
        }
    },
    "走": {
        character: "走",
        pinyin: "zǒu",
        english: "walk/go",
        words: [
            {
                chinese: "走路",
                pinyin: {"走": "zǒu", "路": "lù"},
                english: "walk"
            },
            {
                chinese: "走开",
                pinyin: {"走": "zǒu", "开": "kāi"},
                english: "go away"
            },
            {
                chinese: "走访",
                pinyin: {"走": "zǒu", "访": "fǎng"},
                english: "visit"
            },
            {
                chinese: "走进",
                pinyin: {"走": "zǒu", "进": "jìn"},
                english: "walk into"
            }
        ],
        sentences: [
            {
                chinese: "我每天走路去学校。",
                pinyin: {
                    "我": "wǒ",
                    "每": "měi",
                    "天": "tiān",
                    "走": "zǒu",
                    "路": "lù",
                    "去": "qù",
                    "学": "xué",
                    "校": "xiào",
                    "。": ""
                },
                english: "I walk to school every day."
            },
            {
                chinese: "他走进了商店。",
                pinyin: {
                    "他": "tā",
                    "走": "zǒu",
                    "进": "jìn",
                    "了": "le",
                    "商": "shāng",
                    "店": "diàn",
                    "。": ""
                },
                english: "He walked into the store."
            }
        ],
        funFact: {
            chinese: "'走'字的形状像一个人迈着步子往前走。这个字在甲骨文中是一个人的脚印。'走'不仅表示走路，还可以表示离开，比如'走了'就是'离开了'的意思。走路对健康很重要，所以中国人常说'走走更健康'！",
            english: "The character '走' looks like a person taking steps forward. In oracle bone inscriptions, it was a footprint. '走' means not only walking but also leaving, like in '走了' (gone). Walking is important for health, so Chinese people often say '走走更健康' (walking makes you healthier)!"
        }
    },
    "来": {
        character: "来",
        pinyin: "lái",
        english: "come",
        words: [
            {
                chinese: "来自",
                pinyin: {"来": "lái", "自": "zì"},
                english: "come from"
            },
            {
                chinese: "未来",
                pinyin: {"未": "wèi", "来": "lái"},
                english: "future"
            },
            {
                chinese: "来回",
                pinyin: {"来": "lái", "回": "huí"},
                english: "back and forth"
            },
            {
                chinese: "欢迎光临",
                pinyin: {"欢": "huān", "迎": "yíng", "光": "guāng", "临": "lín"},
                english: "welcome"
            }
        ],
        sentences: [
            {
                chinese: "他来自中国。",
                pinyin: {
                    "他": "tā",
                    "来": "lái",
                    "自": "zì",
                    "中": "zhōng",
                    "国": "guó",
                    "。": ""
                },
                english: "He comes from China."
            },
            {
                chinese: "请来我家做客。",
                pinyin: {
                    "请": "qǐng",
                    "来": "lái",
                    "我": "wǒ",
                    "家": "jiā",
                    "做": "zuò",
                    "客": "kè",
                    "。": ""
                },
                english: "Please come to my home as a guest."
            }
        ],
        funFact: {
            chinese: "'来'字在甲骨文中是一株禾苗，表示庄稼生长。后来引申为'到来'的意思。这个字很有意思，因为它既可以表示空间上的来，比如'他来了'，也可以表示时间上的来，比如'未来'（还没到来的时间）。",
            english: "In oracle bone inscriptions, '来' was a growing grain plant. It later evolved to mean 'come'. Interestingly, it can indicate both spatial movement like in '他来了' (he came) and temporal movement like in '未来' (future, time that hasn't come yet)."
        }
    },
    "去": {
        character: "去",
        pinyin: "qù",
        english: "go",
        words: [
            {
                chinese: "去年",
                pinyin: {"去": "qù", "年": "nián"},
                english: "last year"
            },
            {
                chinese: "出去",
                pinyin: {"出": "chū", "去": "qù"},
                english: "go out"
            },
            {
                chinese: "去掉",
                pinyin: {"去": "qù", "掉": "diào"},
                english: "remove"
            },
            {
                chinese: "要去",
                pinyin: {"要": "yào", "去": "qù"},
                english: "will go"
            }
        ],
        sentences: [
            {
                chinese: "我要去北京。",
                pinyin: {
                    "我": "wǒ",
                    "要": "yào",
                    "去": "qù",
                    "北": "běi",
                    "京": "jīng",
                    "。": ""
                },
                english: "I will go to Beijing."
            },
            {
                chinese: "去年我去了上海。",
                pinyin: {
                    "去": "qù",
                    "年": "nián",
                    "我": "wǒ",
                    "去": "qù",
                    "了": "le",
                    "上": "shàng",
                    "海": "hǎi",
                    "。": ""
                },
                english: "Last year I went to Shanghai."
            }
        ],
        funFact: {
            chinese: "'去'字的上面是'土'，下面是'厶'，古代表示私人的意思。这个字除了表示离开，还可以表示过去的时间，比如'去年'。'来来去去'是形容人们互相往来，非常热闹！",
            english: "The character '去' has '土' (earth) on top and '厶' (private) at the bottom. Besides meaning 'go', it can also indicate past time, like in '去年' (last year). '来来去去' (coming and going) describes busy human interactions!"
        }
    },
    "爸": {
        character: "爸",
        pinyin: "bà",
        english: "father",
        words: [
            {
                chinese: "爸爸",
                pinyin: {"爸": "bà", "爸": "ba"},
                english: "dad"
            },
            {
                chinese: "干爸",
                pinyin: {"干": "gān", "爸": "bà"},
                english: "godfather"
            },
            {
                chinese: "爸妈",
                pinyin: {"爸": "bà", "妈": "mā"},
                english: "parents"
            },
            {
                chinese: "老爸",
                pinyin: {"老": "lǎo", "爸": "bà"},
                english: "dad (informal)"
            }
        ],
        sentences: [
            {
                chinese: "我爸爸在公司工作。",
                pinyin: {
                    "我": "wǒ",
                    "爸": "bà",
                    "爸": "ba",
                    "在": "zài",
                    "公": "gōng",
                    "司": "sī",
                    "工": "gōng",
                    "作": "zuò",
                    "。": ""
                },
                english: "My dad works at a company."
            },
            {
                chinese: "爸爸带我去公园玩。",
                pinyin: {
                    "爸": "bà",
                    "爸": "ba",
                    "带": "dài",
                    "我": "wǒ",
                    "去": "qù",
                    "公": "gōng",
                    "园": "yuán",
                    "玩": "wán",
                    "。": ""
                },
                english: "Dad takes me to play in the park."
            }
        ],
        funFact: {
            chinese: "'爸'字的左边是'父'字旁，表示父亲。这个字是从小孩学说话时发出的音演变而来的。在中国文化中，父亲是一家之主，但现代家庭更强调父母平等。'爸爸'这个词重复使用，显得更亲切！",
            english: "The character '爸' has '父' (father) radical on the left. This character evolved from the sound babies make. In Chinese culture, fathers were traditionally the head of the family, but modern families emphasize parental equality. The word '爸爸' uses repetition to sound more endearing!"
        }
    },
    "妈": {
        character: "妈",
        pinyin: "mā",
        english: "mother",
        words: [
            {
                chinese: "妈妈",
                pinyin: {"妈": "mā", "妈": "ma"},
                english: "mom"
            },
            {
                chinese: "干妈",
                pinyin: {"干": "gān", "妈": "mā"},
                english: "godmother"
            },
            {
                chinese: "妈咪",
                pinyin: {"妈": "mā", "咪": "mī"},
                english: "mommy"
            },
            {
                chinese: "老妈",
                pinyin: {"老": "lǎo", "妈": "mā"},
                english: "mom (informal)"
            }
        ],
        sentences: [
            {
                chinese: "妈妈在做饭。",
                pinyin: {
                    "妈": "mā",
                    "妈": "ma",
                    "在": "zài",
                    "做": "zuò",
                    "饭": "fàn",
                    "。": ""
                },
                english: "Mom is cooking."
            },
            {
                chinese: "我爱妈妈。",
                pinyin: {
                    "我": "wǒ",
                    "爱": "ài",
                    "妈": "mā",
                    "妈": "ma",
                    "。": ""
                },
                english: "I love mom."
            }
        ],
        funFact: {
            chinese: "'妈'字的左边是'女'字旁，表示女性。这个字也是从小孩学说话时的声音演变而来。在中国传统文化中，母亲象征着温暖和关爱。母亲节的时候，人们会送康乃馨给妈妈表达感恩！",
            english: "The character '妈' has '女' (female) radical on the left. Like '爸', it evolved from baby sounds. In Chinese culture, mothers symbolize warmth and care. On Mother's Day, people give carnations to their moms to express gratitude!"
        }
    },
    "家": {
        character: "家",
        pinyin: "jiā",
        english: "home/family",
        words: [
            {
                chinese: "家人",
                pinyin: {"家": "jiā", "人": "rén"},
                english: "family members"
            },
            {
                chinese: "回家",
                pinyin: {"回": "huí", "家": "jiā"},
                english: "go home"
            },
            {
                chinese: "国家",
                pinyin: {"国": "guó", "家": "jiā"},
                english: "country"
            },
            {
                chinese: "家庭",
                pinyin: {"家": "jiā", "庭": "tíng"},
                english: "family"
            }
        ],
        sentences: [
            {
                chinese: "我的家在北京。",
                pinyin: {
                    "我": "wǒ",
                    "的": "de",
                    "家": "jiā",
                    "在": "zài",
                    "北": "běi",
                    "京": "jīng",
                    "。": ""
                },
                english: "My home is in Beijing."
            },
            {
                chinese: "全家人一起吃饭。",
                pinyin: {
                    "全": "quán",
                    "家": "jiā",
                    "人": "rén",
                    "一": "yī",
                    "起": "qǐ",
                    "吃": "chī",
                    "饭": "fàn",
                    "。": ""
                },
                english: "The whole family eats together."
            }
        ],
        funFact: {
            chinese: "'家'字的上面是'宀'，表示房子的屋顶，下面是'豕'，是猪的象形。古代人家养猪是富裕的象征，所以这个字代表了有房有粮的居所。现在'家'字更多地表示温暖的家庭和亲情。",
            english: "The character '家' has '宀' (roof) on top and '豕' (pig) below. In ancient times, keeping pigs symbolized wealth, so this character represented a well-provided home. Today, '家' more commonly represents the warmth of family and kinship."
        }
    },
    "哥": {
        character: "哥",
        pinyin: "gē",
        english: "older brother",
        words: [
            {
                chinese: "哥哥",
                pinyin: {"哥": "gē", "哥": "ge"},
                english: "older brother"
            },
            {
                chinese: "大哥",
                pinyin: {"大": "dà", "哥": "gē"},
                english: "eldest brother"
            },
            {
                chinese: "表哥",
                pinyin: {"表": "biǎo", "哥": "gē"},
                english: "male cousin"
            },
            {
                chinese: "哥们",
                pinyin: {"哥": "gē", "们": "men"},
                english: "brothers/buddies"
            }
        ],
        sentences: [
            {
                chinese: "我哥哥在上大学。",
                pinyin: {
                    "我": "wǒ",
                    "哥": "gē",
                    "哥": "ge",
                    "在": "zài",
                    "上": "shàng",
                    "大": "dà",
                    "学": "xué",
                    "。": ""
                },
                english: "My older brother is in college."
            },
            {
                chinese: "他是我的表哥。",
                pinyin: {
                    "他": "tā",
                    "是": "shì",
                    "我": "wǒ",
                    "的": "de",
                    "表": "biǎo",
                    "哥": "gē",
                    "。": ""
                },
                english: "He is my male cousin."
            }
        ],
        funFact: {
            chinese: "'哥'字的左边是'口'字旁，表示说话。在中国家庭中，哥哥要照顾弟弟妹妹，承担更多责任。'哥们'这个词现在也用来称呼要好的朋友，表示亲密的关系。",
            english: "The character '哥' has '口' (mouth) radical on the left. In Chinese families, older brothers are expected to care for younger siblings and take on more responsibilities. The term '哥们' is now also used among close friends to show intimacy."
        }
    },
    "姐": {
        character: "姐",
        pinyin: "jiě",
        english: "older sister",
        words: [
            {
                chinese: "姐姐",
                pinyin: {"姐": "jiě", "姐": "jie"},
                english: "older sister"
            },
            {
                chinese: "大姐",
                pinyin: {"大": "dà", "姐": "jiě"},
                english: "eldest sister"
            },
            {
                chinese: "表姐",
                pinyin: {"表": "biǎo", "姐": "jiě"},
                english: "female cousin"
            },
            {
                chinese: "小姐",
                pinyin: {"小": "xiǎo", "姐": "jiě"},
                english: "miss"
            }
        ],
        sentences: [
            {
                chinese: "我姐姐在教我画画。",
                pinyin: {
                    "我": "wǒ",
                    "姐": "jiě",
                    "姐": "jie",
                    "在": "zài",
                    "教": "jiāo",
                    "我": "wǒ",
                    "画": "huà",
                    "画": "huà",
                    "。": ""
                },
                english: "My older sister is teaching me how to draw."
            },
            {
                chinese: "她是我的表姐。",
                pinyin: {
                    "她": "tā",
                    "是": "shì",
                    "我": "wǒ",
                    "的": "de",
                    "表": "biǎo",
                    "姐": "jiě",
                    "。": ""
                },
                english: "She is my female cousin."
            }
        ],
        funFact: {
            chinese: "'姐'字的左边是'女'字旁，表示女性。在中国家庭中，姐姐常常像小妈妈一样照顾弟弟妹妹。'小姐'这个词在不同地区有不同的含义，在一些地方是对年轻女性的尊称。",
            english: "The character '姐' has '女' (female) radical on the left. In Chinese families, older sisters often act like little mothers to their younger siblings. The term '小姐' (miss) has different connotations in different regions, but it's generally a respectful way to address young women."
        }
    },
    "的": {
        character: "的",
        pinyin: "de",
        english: "of, 's (possessive particle)",
        words: [
            {
                chinese: "我的",
                pinyin: {"我": "wǒ", "的": "de"},
                english: "my, mine"
            },
            {
                chinese: "他的",
                pinyin: {"他": "tā", "的": "de"},
                english: "his"
            },
            {
                chinese: "你的",
                pinyin: {"你": "nǐ", "的": "de"},
                english: "your, yours"
            },
            {
                chinese: "她的",
                pinyin: {"她": "tā", "的": "de"},
                english: "her, hers"
            }
        ],
        sentences: [
            {
                chinese: "这是我的书。",
                pinyin: {
                    "这": "zhè",
                    "是": "shì",
                    "我": "wǒ",
                    "的": "de",
                    "书": "shū"
                },
                english: "This is my book."
            },
            {
                chinese: "那是你的吗？",
                pinyin: {
                    "那": "nà",
                    "是": "shì",
                    "你": "nǐ",
                    "的": "de",
                    "吗": "ma"
                },
                english: "Is that yours?"
            }
        ],
        funFact: {
            chinese: "「的」是最常用的汉字之一，用来表示所属关系。",
            english: "'的(de)' is one of the most commonly used characters in Chinese, used to show possession."
        }
    },
    "是": {
        character: "是",
        pinyin: "shì",
        english: "is, am, are",
        words: [
            {
                chinese: "是的",
                pinyin: {"是": "shì", "的": "de"},
                english: "yes"
            },
            {
                chinese: "不是",
                pinyin: {"不": "bù", "是": "shì"},
                english: "no, is not"
            },
            {
                chinese: "就是",
                pinyin: {"就": "jiù", "是": "shì"},
                english: "exactly, precisely"
            },
            {
                chinese: "是否",
                pinyin: {"是": "shì", "否": "fǒu"},
                english: "whether"
            }
        ],
        sentences: [
            {
                chinese: "今天是星期一。",
                pinyin: {
                    "今": "jīn",
                    "天": "tiān",
                    "是": "shì",
                    "星": "xīng",
                    "期": "qī",
                    "一": "yī"
                },
                english: "Today is Monday."
            },
            {
                chinese: "他是我的朋友。",
                pinyin: {
                    "他": "tā",
                    "是": "shì",
                    "我": "wǒ",
                    "的": "de",
                    "朋": "péng",
                    "友": "yǒu"
                },
                english: "He is my friend."
            }
        ],
        funFact: {
            chinese: "「是」是最常用的动词之一，用来表示肯定或判断。",
            english: "'是(shì)' is one of the most commonly used verbs in Chinese, used to express affirmation or make judgments."
        }
    }
    // ... 其他汉字的详细数据
};

module.exports = {
    characterCategories,
    detailedCharData
}; 