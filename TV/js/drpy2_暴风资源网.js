var rule = {
author: '小可乐/240524/第一版',
title: '暴风资源网',
host: 'https://bfzyapi.com',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/api.php/provide/vod/?ac=detail',
url: '/api.php/provide/vod/?ac=detail&t=fyfilter&pg=fypage',
filter_url: '{{fl.cateId}}',
detailUrl: '/api.php/provide/vod/?ac=detail&ids=fyid',
searchUrl: '/api.php/provide/vod/?ac=detail&wd=**&pg=fypage',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

class_name: '电影&剧集&综艺&动漫&短剧(穿越年代)&足球',
class_url: '20&30&45&39&66&54',
filter_def: {
20: {cateId: '20'},
30: {cateId: '30'},
45: {cateId: '45'},
39: {cateId: '39'},
66: {cateId: '66'},
54: {cateId: '54'}
},

tab_rename: {'bfzym3u8': '暴风'},
play_parse: true,
parse_url: '',
lazy: `js:
if (/\\.(m3u8|mp4)/.test(input)) {
    { jx: 0, parse: 0, url: input }
} else {
    if (rule.parse_url.startsWith('json:')) {
        let kurl = rule.parse_url.replace('json:','')+input;
        kurl = JSON.parse(request(kurl)).url;
        input = { jx: 0, parse: 0, url: kurl }
    } else {
        input = rule.parse_url+input
    }
}
`,

limit: 9,
double: false,
推荐: '*',
一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id;vod_play_from',
二级: `js:
let html=request(input);
html=JSON.parse(html);
let data=html.list;
VOD=data[0];`,
搜索: '*',

filter: {
"20":[
{"key":"cateId","name":"类型","value":[{"n":"全部","v":"20"},{"n":"动作片","v":"21"},{"n":"喜剧片","v":"22"},{"n":"恐怖片","v":"23"},{"n":"科幻片","v":"24"},{"n":"爱情片","v":"25"},{"n":"剧情片","v":"26"},{"n":"战争片","v":"27"},{"n":"纪录片","v":"28"},{"n":"动画片","v":"50"},{"n":"电影解说","v":"51"},{"n":"预告","v":"52"},{"n":"理论片","v":"29"}]}
],
"30":[
{"key":"cateId","name":"类型","value":[{"n":"全部","v":"30"},{"n":"国产剧","v":"31"},{"n":"香港剧","v":"33"},{"n":"台湾剧","v":"35"},{"n":"韩国剧","v":"34"},{"n":"日本剧","v":"36"},{"n":"欧美剧","v":"32"},{"n":"泰国剧","v":"38"},{"n":"海外剧","v":"37"}]}
],
"45":[
{"key":"cateId","name":"类型","value":[{"n":"全部","v":"45"},{"n":"大陆综艺","v":"46"},{"n":"港台综艺","v":"47"},{"n":"日韩综艺","v":"48"},{"n":"欧美综艺","v":"49"}]}
],
"39":[
{"key":"cateId","name":"类型","value":[{"n":"全部","v":"39"},{"n":"国产动漫","v":"40"},{"n":"港台动漫","v":"43"},{"n":"日韩动漫","v":"41"},{"n":"欧美动漫","v":"42"},{"n":"海外动漫","v":"44"}]}
],
"66":[
{"key":"cateId","name":"类型","value":[{"n":"穿越年代","v":"66"},{"n":"重生民国","v":"65"},{"n":"现代言情","v":"67"},{"n":"反转爽文","v":"68"},{"n":"女恋总裁","v":"69"},{"n":"都市脑洞","v":"70"},{"n":"闪婚闪离","v":"71"},{"n":"古装仙侠","v":"72"}]}
],
"54":[
{"key":"cateId","name":"类型","value":[{"n":"足球","v":"54"},{"n":"篮球","v":"55"},{"n":"网球","v":"56"},{"n":"斯诺克","v":"57"}]}
]
}
}