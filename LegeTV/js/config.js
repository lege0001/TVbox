// 全局常量配置
const PROXY_URL = '/proxy/';    // 适用于 Cloudflare, Netlify (带重写), Vercel (带重写)
// const HOPLAYER_URL = 'https://hoplayer.com/index.html';
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

// 密码保护配置
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',  // 存储验证状态的键名
    verificationTTL: 90 * 24 * 60 * 60 * 1000,  // 验证有效期（90天，约3个月）
    adminLocalStorageKey: 'adminPasswordVerified'  // 新增的管理员验证状态的键名
};

// 网站信息配置
const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv.is-an.org',
    description: '免费在线视频搜索与观看平台',
    logo: 'image/logo.png',
    version: '1.0.3'
};

// API站点配置
const API_SITES = {
    dyttzy: {
        api: 'http://caiji.dyttzyapi.com/api.php/provide/vod/',
        name: '电影天堂资源',
        detail: 'http://caiji.dyttzyapi.com'
    },
	tenxun: {
        api: 'http://110.42.33.133:12121/api.php/provide/vod/',
        name: '腾讯资源'
    },
	okzy: {
        api: 'http://api.okzyw.net/api.php/provide/vod/',
        name: 'OK资源'
    },
	okzy: {
        api: 'http://api.okzyw.net/api.php/provide/vod/',
        name: 'OK资源'
    },
    //yzzy: {
    //    api: 'https://api.yzzy-api.com/inc/api_mac10_all.php',
	//	备用api: 'https://api.yzzy-api.com/inc/apijson.php',
    //    name: '优质资源'
    //},
	mtzy: {
        api: 'https://caiji.maotaizy.cc/api.php/provide/vod',
        name: '茅台资源'
    },
	myzy: {
        api: 'https://api.maoyanapi.top/api.php/provide/vod',
        name: '猫眼资源'
    },
	jazy: {
        api: 'http://154.219.117.232:9981/jacloudapi.php/provide/vod',
        name: '建安资源'
    },
	xmyzy: {
        api: 'https://vs.okcdn100.top/api.php/provide/vod/',
        name: '小绵羊资源'
    },
	wyzy: {
        api: 'https://www.wyvod.com/api.php/provide/vod/',
        name: '无忧资源'
    },
	kpzy: {
        api: 'https://bf.xoxowin86cisyap.com/api.php/provide/vod',
        name: '看片资源'
    },
	hhzy: {
        api: 'https://hhzyapi.com/api.php/provide/vod/',
        name: '火狐资源'
    },
	klzy: {
        api: 'https://lz.118318.xyz/api.php/provide/vod/',
        name: '快龙资源'
    },
	dbzy: {
        api: 'https://caiji.dbzy.tv/api.php/provide/vod/',
        name: '独播资源'
    },
    bfzy: {
        api: 'https://bfzyapi.com/api.php/provide/vod/',
        name: '暴风资源'
    },
    tyyszy: {
        api: 'https://tyyszy.com/api.php/provide/vod/',
        name: '天涯资源'
    },
    xiaomaomi: {
        api: 'https://zy.xmm.hk/api.php/provide/vod/',
        name: '小猫咪资源'
    },
    ffzy: {
        api: 'http://ffzy5.tv/api.php/provide/vod/',
        name: '非凡影视',
        detail: 'http://ffzy5.tv'
    },
    heimuer: {
        api: 'https://json.heimuer.xyz/api.php/provide/vod/',
        name: '黑木耳',
        detail: 'https://heimuer.tv'
    },
    zy360: {
        api: 'https://360zy.com/api.php/provide/vod/',
        name: '360资源'
    },
    iqiyi: {
        api: 'https://www.iqiyizyapi.com/api.php/provide/vod/',
        name: 'iqiyi资源'
    },
    wolong: {
        api: 'https://wolongzyw.com/api.php/provide/vod/',
        name: '卧龙资源'
    },
    hwba: {
        api: 'https://cjhwba.com/api.php/provide/vod/',
        name: '华为吧资源'
    },
    jisu: {
        api: 'https://jszyapi.com/api.php/provide/vod/',
        name: '极速资源',
        detail: 'https://jszyapi.com'
    },
    dbzy: {
        api: 'https://dbzy.tv/api.php/provide/vod/',
        name: '豆瓣资源'
    },
    mozhua: {
        api: 'https://mozhuazy.com/api.php/provide/vod/',
        name: '魔爪资源'
    },
    mdzy: {
        api: 'https://www.mdzyapi.com/api.php/provide/vod/',
        name: '魔都资源'
    },
    zuid: {
        api: 'https://api.zuidapi.com/api.php/provide/vod/',
        name: '最大资源'
    },
    yinghua: {
        api: 'https://m3u8.apiyhzy.com/api.php/provide/vod/',
        name: '樱花资源'
    },
    baidu: {
        api: 'https://api.apibdzy.com/api.php/provide/vod/',
        name: '百度云资源'
    },
    wujin: {
        api: 'https://api.wujinapi.me/api.php/provide/vod/',
        name: '无尽资源'
    },
    ikun: {
        api: 'https://ikunzyapi.com/api.php/provide/vod/',
        name: 'iKun资源'
    },
	subo: {
        api: 'https://subocaiji.com/api.php/provide/vod',
        name: '速播资源'
    },
    fczy: {
        api: 'https://api.fczy888.me/api.php/provide/vod',
        name: '蜂巢资源'
    },
    ukzy: {
        api: 'https://api.ukuapi88.com/api.php/provide/vod',
        name: 'U酷资源'
    },
    lzi: {
        api: 'https://cj.lziapi.com/api.php/provide/vod/',
        name: '量子资源站'
    },
    modu: {
        api: 'https://caiji.moduapi.cc/api.php/provide/vod/',
        name: '魔都资源2'
    },
    zyku: {
        api: 'https://api.1080zyku.com/inc/apijson.php',
        name: '1080资源库'
    },
	seacms: {
      api: 'https://www.seacms.org/zyapi.php',
      name: '海洋资源',
    },
    plzy: {
        api: 'https://p2100.net/api.php/provide/vod/',
        name: '飘零资源'
    },
	sjzy: {
	  api: 'https://www.394tv.com/api.php/provide/vod/',
      name: '三九影视',
    },
    lovedan: {
        api: 'https://lovedan.net/api.php/provide/vod/',
        name: 'lovedan'
    },
    sdzy: {
        api: 'http://sdzyapi.com/api.php/provide/vod/',
        name: '闪电资源'
    },
    bdzy: {
        api: 'https://api.apibdzy.com/api.php/provide/vod/',
        name: '百度资源'
    },
    hongniu: {
        api: 'https://www.hongniuzy2.com/api.php/provide/vod/',
        name: '红牛资源'
    },
	gszy: {
        api: 'https://api.guangsuapi.com/api.php/provide/vod/',
        name: '光速资源',
    },
	xlzy: {
        api: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/',
        name: '新浪资源',
    },
	//huya: {
    //    api: 'https://www.huyaapi.com/api.php/provide/vod/',
    //    name: '虎牙资源',
    //},
	jinyingzy: {
      api: 'https://jinyingzy.com/provide/vod/',
	  备用地址: '1:https://jyzyapi.com/provide/vod/2:https://jyzyapi.com/provide/vod/from/jinyingm3u8/,3:https://jinyingzy.com/api.php/provide/vod/',
      name: '金鹰资源',
    },
    suoni: {
        api: 'https://suoniapi.com/api.php/provide/vod/',
        name: '索尼资源'
    },
    taopian: {
        api: 'https://taopianapi.com/cjapi/mc10/vod/',
        name: '淘片'
    },
	hhzy: {
      api: 'https://hhzyapi.com/api.php/provide/vod/',
      name: '豪华资源',
    },
    nnzy: {
        api: 'https://api.niuniuzy.me/api.php/provide/vod/',
        name: '牛牛资源'
    },
    yayazy: {
        api: 'https://cj.yayazy.net/api.php/provide/vod/',
        name: '丫丫资源'
    },
    wwzy: {
        api: 'https://wwzy.tv/api.php/provide/vod/',
        name: '旺旺短剧'
    },
    testSource: {
        api: 'https://www.example.com/api.php/provide/vod/',
        name: '空内容测试源',
        adult: true
    },
    // 下面是一些成人内容的API源，默认隐藏，使用本项目浏览黄色内容违背项目初衷
    // 互联网上传播的色情内容将人彻底客体化、工具化，是性别解放和人类平等道路上的巨大障碍。
    // 这些黄色影片是资本主义父权制压迫的最恶毒体现，它将暴力和屈辱商品化，践踏人的尊严，对受害者造成无法弥愈的伤害，并毒害社会关系。
    // 资本为了利润，不惜将最卑劣的剥削（包括对受害者和表演者的剥削）和暴力商品化，
    // 把性别剥削塑造成“性享受”麻痹观众的意识，转移我们对现实生活中矛盾和压迫的注意力。
    // 这些影片和背后的产业已经使数百万男女“下海”，出卖自己的身体，甚至以此为生计。
    // 而作为观众无辜吗？毫无疑问，他们促成了黄色产业链的再生产。
    // 我们提供此警告，是希望您能认清这些内容的本质——它们是压迫和奴役的工具，而非娱乐。
    // ckzy: {
    //     api: 'https://ckzy.me/api.php/provide/vod/',
    //     name: 'CK资源',
    //     adult: true
    // },
    // jkun: {
    //     api: 'https://jkunzyapi.com/api.php/provide/vod/',
    //     name: 'jkun资源',
    //     adult: true
    // },
    // bwzy: {
    //     api: 'https://api.bwzym3u8.com/api.php/provide/vod/',
    //     name: '百万资源',
    //     adult: true
    // },
    // souav: {
    //     api: 'https://api.souavzy.vip/api.php/provide/vod/',
    //     name: 'souav资源',
    //     adult: true
    // },
    // r155: {
    //     api: 'https://155api.com/api.php/provide/vod/',
    //     name: '155资源',
    //     adult: true
    // },
    // lsb: {
    //     api: 'https://apilsbzy1.com/api.php/provide/vod/',
    //     name: 'lsb资源',
    //     adult: true
    // },
    // huangcang: {
    //     api: 'https://hsckzy.vip/api.php/provide/vod/',
    //     name: '黄色仓库',
    //     adult: true,
    //     detail: 'https://hsckzy.vip'
    // },
    // yutuzy: {
    //     api: 'https://yutuzy10.com/api.php/provide/vod/',
    //     name: '玉兔资源',
    //     adult: true
    // },
    // yutu: {
    //     api: 'https://apiyutu.com/api.php/provide/vod/',
    //     name: '玉兔资源|AV',
	//     adult: true
    // },
    // jymd: {
    //     api: 'https://91md.me/api.php/provide/vod/',
    //     name: '91|AV',
	//     adult: true
    // },
	// naixx: {
    //     api: 'https://naixxzy.com/api.php/provide/vod/',
    //     name: '奶香香|AV'
	//     adult: true
    // },
    // xxibao: {
    //     api: 'https://www.xxibaozyw.com/api.php/provide/vod/',
    //     name: '性细胞|AV'
	//     adult: true
    // },
    // danaizi: {
    //     api: 'https://apidanaizi.com/api.php/provide/vod/',
    //     name: '大奶子|AV'
	//     adult: true
    // },
    // siwa: {
    //     api: 'http://siwazyw.tv/api.php/provide/vod/',
    //     name: '丝袜资源|AV',
	//     adult: true
    // },
    // aosika: {
    //     api: 'https://aosikazy.com/api.php/provide/vod/',
    //     name: '奥斯卡资源|AV',
	//     adult: true
    // },
    // slzy: {
    //     api: 'https://slapibf.com/api.php/provide/vod/',
    //     name: '森林资源|AV',
	//     adult: true
    // },
    // shayu: {
    //     api: 'https://shayuapi.com/api.php/provide/vod/',
    //     name: '鲨鱼资源|AV',
	//     adult: true
    // },
    // lajiao: {
    //     api: 'http://apilj.com/api.php/provide/vod/',
    //     name: '辣椒资源|AV',
	//     adult: true
    // },
    // msnzy: {
    //     api: 'https://www.msnii.com/api/xml.php',
    //     name: '美少女资源|AV',
	//     adult: true
    // },
    // ysjzy:{
    //     api: 'https://www.xrbsp.com/api/xml.php',
    //     name: '淫水机资源|AV',    
	//     adult: true
    // },
    // xner: {
    //     api: 'https://www.gdlsp.com/api/xml.php',
    //     name: '香奶儿资源|AV',
	//     adult: true
    // },
    // baip: {
    //     api: 'https://www.kxgav.com/api/xml.php',
    //     name: '白嫖资源|AV',
	//     adult: true
    // },
    // lebo: {
    //     api: 'https://lbapi9.com/api.php/provide/vod/',
    //     name: '乐播资源|AV',
	//     adult: true
    // },
    // fanhao: {
    //     api: 'http://fhapi9.com/api.php/provide/vod/',
    //     name: '番号资源|AV',
	//     adult: true
    // },
    // dadi: {
    //     api: 'http://dadiapi.com/sea_api.php',
    //     name: '大地资源|AV',
	//     adult: true
    // },
    // kczy: {
    //     api: 'https://caiji.kczyapi.com/api.php/provide/vod/from/kcm3u8',
    //     name: '快车资源|AV',
	//     adult: true
    // },
    // lbapi: {
    //     api: 'http://lbapiby.com/api.php/provide/vod/at/json',
    //     name: 'AIvin|AV',
	//     adult: true
    // },
    // jingpin: {
    //     api: 'https://www.jingpinx.com/api.php/provide/vod/',
    //     name: '精品资源|AV',
	//     adult: true
    // },
    // pgxdy: {
    //     api: 'https://www.pgxdy.com/api/xml.php',
    //     name: '黄AV资源',
	//     adult: true
    //},
	// gayapi: {
    //     api: 'https://gayapi.com/api.php/provide/vod/',
    //     name: 'GAY资源',
	//     adult: true
    //},
	// thzy: {
    //     api: 'https://thzy1.me/api.php/provide/vod/',
    //     name: '桃花资源',
	//     adult: true
    //},
	// btzy: {
    //     api: 'https://8day.icu/api.php/provide/vod/',
    //     name: '八天资源',
	//     adult: true
    //},
	// xxavs: {
    //     api: 'https://xxavs.com/api.php/provide/vod/',
    //     name: '湿乐园',
	//     adult: true
    //},
	// uezy: {
    //     api: 'https://a.uezy.pw/api.php/provide/vod/',
    //     name: '优异资源',
	//     adult: true
    //},
	// jmzy: {
    //     api: 'https://to.to-long.com/api.php/provide/vod/',
    //     name: '橘猫资源',
	//     adult: true
    //},
	// smzy: {
    //     api: 'https://caiji.semaozy.net/inc/apijson_vod.php',
    //     name: '色猫资源',
	//     adult: true
    //},
	// dd: {
    //     api: 'https://api.ddapi.cc/api.php/provide/vod/',
    //     name: '滴滴资源',
	//     adult: true
    //},
	// sexng: {
    //     api: 'https://api.sexnguon.com/api.php/provide/vod/',
    //     name: '色南国资源',
	//     adult: true
    //},
	// vnzy: {
    //     api: 'https://vnzyz.com/api.php/provide/vod/',
    //     name: '越南资源',
	//     adult: true
    //},
	// jyav: {
    //     api: 'https://91av.cyou/api.php/provide/vod/',
    //     name: '91视频',
	//     adult: true
    //},

    // 下面是资源失效率高的API源，不建议使用
    // ##: {
    //     api: '##',
    //     name: '##',
    // },
};

// 添加聚合搜索的配置选项
const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,             // 是否启用聚合搜索
    timeout: 8000,            // 单个源超时时间（毫秒）
    maxResults: 10000,          // 最大结果数量
    parallelRequests: true,   // 是否并行请求所有源
    showSourceBadges: true    // 是否显示来源徽章
};

// 抽象API请求配置
const API_CONFIG = {
    search: {
        // 只拼接参数部分，不再包含 /api.php/provide/vod/
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 50, // 最大获取页数
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        // 只拼接参数部分
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    }
};

// 优化后的正则表达式模式
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;

// 添加自定义播放器URL
const CUSTOM_PLAYER_URL = 'player.html'; // 使用相对路径引用本地player.html

// 增加视频播放相关配置
const PLAYER_CONFIG = {
    autoplay: true,
    allowFullscreen: true,
    width: '100%',
    height: '600',
    timeout: 15000,  // 播放器加载超时时间
    filterAds: true,  // 是否启用广告过滤
    autoPlayNext: true,  // 默认启用自动连播功能
    adFilteringEnabled: true, // 默认开启分片广告过滤
    adFilteringStorage: 'adFilteringEnabled' // 存储广告过滤设置的键名
};

// 增加错误信息本地化
const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，服务器响应时间过长',
    API_ERROR: 'API接口返回错误，请尝试更换数据源',
    PLAYER_ERROR: '播放器加载失败，请尝试其他视频源',
    UNKNOWN_ERROR: '发生未知错误，请刷新页面重试'
};

// 添加进一步安全设置
const SECURITY_CONFIG = {
    enableXSSProtection: true,  // 是否启用XSS保护
    sanitizeUrls: true,         // 是否清理URL
    maxQueryLength: 100,        // 最大搜索长度
    // allowedApiDomains 不再需要，因为所有请求都通过内部代理
};

// 添加多个自定义API源的配置
const CUSTOM_API_CONFIG = {
    separator: ',',           // 分隔符
    maxSources: 5,            // 最大允许的自定义源数量
    testTimeout: 5000,        // 测试超时时间(毫秒)
    namePrefix: 'Custom-',    // 自定义源名称前缀
    validateUrl: true,        // 验证URL格式
    cacheResults: true,       // 缓存测试结果
    cacheExpiry: 5184000000,  // 缓存过期时间(2个月)
    adultPropName: 'isAdult' // 用于标记成人内容的属性名
};

// 隐藏内置黄色采集站API的变量
const HIDE_BUILTIN_ADULT_APIS = false;
