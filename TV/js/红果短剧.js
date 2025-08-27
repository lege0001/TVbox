var rule = {
    title: '红果短剧',
    author: '走,钓鱼去',
    host: 'https://www.hongguodj.cc/',
    url: '/type/fyclass-fypage.html',
    detailUrl: '/voddetail/fyid',
    searchUrl: '/search/**----------fypage---.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    编码: 'utf-8',
    timeout: 5000,
    class_name: "首页&重生民国&现代言情&穿越年代&反转爽文&女恋总裁&闪婚离婚&都市脑洞&古装仙侠",
    class_url: "/&1&6&2&7&8&9&10&11",
    play_parse: true,
    lazy: `js:
let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
let kurl = kcode.url;
if (/\\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl }
} else {
    input = { jx: 0, parse: 1, url: input }
}`,
    limit: 6,
    double: true,
    一级: '.show.rows&&li;h3&&Text;img&&data-src;span&&Text;a&&href', 
    二级: {
        title: 'h1&&Text',
        img: 'img&&src',
        desc: '.info&&p:lt(6)&&Text',
        content: '.text&&Text',
        tabs: '.title.slip&&a',
        lists: '.rows.xx&&li',
        tab_text: 'a&&Text',
        list_text: 'a&&Text',
        list_url: 'a&&href',
    },
    搜索: '*',
}