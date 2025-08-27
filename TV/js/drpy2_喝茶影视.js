var rule = {
author: '小可乐/2411/第一版',
title: '喝茶影视',
类型: '影视',
host: 'https://www.zds-wl.com',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/dylist/fyfilter.html',
filter_url: '{{fl.cateId}}-fypage',
detailUrl: '',
searchUrl: '/search.html?page=fypage&searchword=**&searchtype=',
searchable: 1, 
quickSearch: 1, 
filterable: 1, 

limit: 9,
double: false,
class_name: '电影&剧集&综艺&动漫',
class_url: '1&2&4&3',
filter_def: {
1: {cateId: '1'},
2: {cateId: '2'},
4: {cateId: '4'},
3: {cateId: '3'}
},

play_parse: true,
lazy: `js:
let kcode = request(input).match(/<iframe(.*?)nextPage/)[1];
let kurl = 'http'+kcode.match(/http(.*?),/)[1];
if (/\\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl }
} else {
    input = { jx: 0, parse: 1, url: input }
}`,

推荐: '*',
一级: '.lazyload;a&&title;a&&data-original;.pic-text&&Text;a&&href',
二级: {
title: 'h1&&Text;.data:eq(0)&&a:eq(0)&&Text',
img: '.pic&&img&&data-original',
desc: '.pic&&.pic-text&&Text;.data:eq(0)&&a:eq(-1)&&Text;.data:eq(0)&&a:eq(1)&&Text;.data--span:eq(1)&&Text;.data--span:eq(-1)&&Text',
content: '.col-pd:eq(1)&&Text',
tabs: '.dropdown-menu&&a',
tab_text: 'body&&Text',
lists: '.playlink:eq(#id)&&a:not([rel])',
list_text: 'body&&Text',
list_url: 'a&&href'
},
搜索: '*',

filter: {
"1":[
{"key":"cateId","name":"类型","value":[{"n":"全部","v":"1"},{"n":"动作片","v":"5"},{"n":"喜剧片","v":"6"},{"n":"科幻片","v":"7"},{"n":"恐怖片","v":"8"},{"n":"爱情片","v":"9"},{"n":"剧情片","v":"10"},{"n":"战争片","v":"11"},{"n":"记录片","v":"12"},{"n":"悬疑片","v":"13"},{"n":"动画片","v":"14"},{"n":"犯罪片","v":"15"},{"n":"奇幻片","v":"16"},{"n":"邵氏电影","v":"17"},{"n":"惊悚片","v":"18"}]}
],
"2":[
{"key":"cateId","name":"类型","value":[{"n":"全部","v":"2"},{"n":"大陆剧","v":"19"},{"n":"欧美剧","v":"20"},{"n":"香港剧","v":"21"},{"n":"韩国剧","v":"22"},{"n":"台湾剧","v":"23"},{"n":"日本剧","v":"24"},{"n":"海外剧","v":"25"},{"n":"泰国剧","v":"26"},{"n":"短剧","v":"27"}]}
]
}
}