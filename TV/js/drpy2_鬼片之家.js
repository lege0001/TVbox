var rule = {
author: '小可乐/2411/第一版',
title: '鬼片之家',
类型: '影视',
//主域名
host: 'https://www.guipian360.com',
//主域名解析(主域名写发布页时，需主域名解析)
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

//推荐链接
homeUrl: '/',
//分类链接 筛选链接(fyfilter代表filter_url里的内容)
url: '/list/fyfilter.html',
filter_url: '{{fl.cateId}}-fypage',
//详情链接
detailUrl: '',
//搜索链接(搜索词**代替，页码fypage代替)
searchUrl: '/vodsearch/**----------fypage---.html',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

limit: 9,
double: false,
class_name: '鬼片大全&恐怖片&剧集&动漫',
class_url: '1&3&2&4',
//筛选默认设定值
filter_def: {
1: {cateId: '1'},
3: {cateId: '3'},
2: {cateId: '2'},
4: {cateId: '4'}
},

play_parse: true,
//播放地址解析
lazy: `js:
let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
let kurl = kcode.url;
if (/\\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl }
} else {
    input = { jx: 0, parse: 1, url: input }
}`,

//列表(双层列表);标题;图片;描述;链接;详情(可不写)，同一级一样可*代替
推荐: '*',
//列表;标题;图片;描述;链接;详情(可不写)
一级: 'article:has(.tags);h2&&Text;img&&src;.zhuangtai&&Text;a&&href',
二级: {
//标题;类型
title: 'h1&&Text;.article-tags&&Text',
//图片
img: '.img_wrap&&img&&data-original',
//状态;年份;地区;演员;导演
desc: '.fr&&Text;strong&&Text;地区;li.hidden-xs--span:eq(1)&&Text;li.hidden-xs--span:eq(0)&&Text',
//简介
content: '.jianjie-p&&Text',
//线路数组
tabs: '.menu&&a',
//线路标题
tab_text: 'body&&Text',
//播放数组 选集列表
lists: '.abc:eq(#id)&&a',
//选集标题
list_text: 'body&&Text',
//选集链接
list_url: 'a&&href'
},
//列表;标题;图片;描述;链接;详情(可不写)，同一级一样可*代替
搜索: '*',
//筛选
filter: {
"1":[
{"key":"cateId","name":"类型","value":[{"n":"全部","v":"1"},{"n":"大陆鬼片","v":"6"},{"n":"日韩鬼片","v":"7"},{"n":"林正英鬼片","v":"8"},{"n":"港台鬼片","v":"9"},{"n":"泰国鬼片","v":"10"},{"n":"欧美鬼片","v":"11"}]}
],
"2":[
{"key":"cateId","name":"类型","value":[{"n":"全部","v":"2"},{"n":"国产剧","v":"12"},{"n":"美剧","v":"13"},{"n":"韩剧","v":"14"},{"n":"日剧","v":"15"},{"n":"泰国剧","v":"16"},{"n":"港台剧","v":"20"},{"n":"其他剧","v":"22"}]}
]
}
}