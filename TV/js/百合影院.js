var rule = {
    author: '书虫/250317/第1版',
    title: '百合影视',
    类型: '影视',
    //首页网址
    host: 'https://www.baiheqd.com',
    hostJs: ``,
    headers: {'User-Agen':'tMozilla/5.0'},

    编码: 'utf-8',
    timeout: 5000,
    homeUrl: '/',
    //分类页
    url: '/vodtype/fyclass-fypage.html',
    //筛选页
    filter_url: '',
    detailUrl: '',  
    searchUrl: 'https://www.baiheqd.com/vodsearch/**----------fypage---.html',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    limit: 10,
    double: false,
    class_name: '电影&剧集&综艺&动漫&影视解说',
    //静态分类值
    class_url: '1&2&3&4&5',
    //推荐列表可以单独写也是几个参数，和一级列表部分参数一样的可以用*代替，不一样写不一样的，全和一级一样，可以用一个*代替
    推荐: '*',
    
    //数组、标题、图片、副标题、链接，分类页找参数
    
 一级: `js:
 let klist=pdfa(request(input),'li.hl-list-item:has(div)');
 let k=[];
klist.forEach(it=>{
 k.push({
        title: pdfh(it,'a&&title'),
        pic_url: !pdfh(it,'a&&data-original').startsWith('http') ? HOST + pdfh(it,'a&&data-original') : pdfh(it,'a&&data-original'),     
        desc: pdfh(it,'.remarks&&Text'),
        url: pdfh(it,'a&&href'),    
        content: ''    
     })
 });
 setResult(k)
 `,
 
 //搜索数组标题图片副标题链接

搜索:'.hl-one-list&&li;a&&title;a&&data-original;.remarks&&Text;a&&href',
// 搜索: `js:
// let klist=pdfa(request(input),'.hl-one-list&&li');
// let k=[];
//klist.forEach(it=>{
// k.push({
       // title: pdfh(it,'a&&title'),
       // pic_url: !pdfh(it,'a&&data-original').startsWith('http') ? HOST + pdfh(it,'a&&data-original') : pdfh(it,'a&&data-original'),     
       // desc: pdfh(it,'.remarks&&Text'),
       // url: pdfh(it,'a&&href'),    
       // content: ''    
    // })
// });
 //setResult(k)
 //`,
    
    //详情页找参数
        //第一部分分别是对应参数式中的标题、图片、类型、备注、年份、地区、导演、主演、简介
    //第二部分分别对应参数式中的线路数组和线路标题
    //第三部分分别对应参数式中的播放列表、播放标题、播放链接
    
    
   二级: $js.toString(() => {
    VOD = {};
    let html = request(input);
    //定位详情页标题
VOD.vod_name = pdfh(html, "h2&&Text");
    //定位详情页图片链接
    VOD.vod_pic = pd(html, ".hl-item-thumb&&data-original");
    
    //定位详情页类型
    VOD.type_name = pdfh(html, "li.hl-col-xs-12:eq(6)&&Text").replace("类型：","");
    //定位详情页状态备注
    VOD.vod_remarks = pdfh(html, "li.hl-col-xs-12:eq(1)&&Text").replace("状态：","");
    //定位详情页年份
    VOD.vod_year = pdfh(html, "li.hl-col-xs-12:eq(4)&&Text").replace("年份：","");
    //定位详情页地区
    VOD.vod_area = pdfh(html, "li.hl-col-xs-12:eq(5)&&Text").replace("地区：","");
    //定位详情页导演
    VOD.vod_director = pdfh(html, "li.hl-col-xs-12:eq(3)&&Text").replace("导演：","");
    //定位详情页演员
    VOD.vod_actor = pdfh(html, "li.hl-col-xs-12:eq(2)&&Text").replace("主演：","");
    //定位详情页简介
    VOD.vod_content = "书虫祝您观影愉快！现为您介绍剧情:" + pdfh(html, ".hl-content-text&&Text");
let playFrom = [];
    let playUrl = [];
    //定位详情页线路数组，可采用类名、id、has等方法定位，最好定位到子类一级。
    let tabs = pdfa(html, ".hl-from-list&&li");
 //定位详情页线路标题
    tabs.forEach((it, index) => {
        playFrom.push(pdfh(it, "li&&Text"));
        
        //定位详情页播放数列表
        let playTag = "#hl-plays-list:eq(" + index + ") li";
        let tags = pdfa(html, playTag);
        //定位详情页播放标题
        let mapUrl = tags.map((tag) => {
            let title = pdfh(tag, "a&&Text").trim();
            //定位详情页播放链接
            let purl = pd(tag, "a&&href", input);
            return title + "$" + purl;
        });
        playUrl.push(mapUrl.join("#"));
    });
    VOD.vod_play_from = playFrom.join("$$$");
    VOD.vod_play_url = playUrl.join("$$$");
}),
    //是否启用辅助嗅探: 1,0
    sniffer: 0,
    // 辅助嗅探规则
    isVideo: 'http((?!http).){26,}\\.(m3u8|mp4|flv|avi|mkv|wmv|mpg|mpeg|mov|ts|3gp|rm|rmvb|asf|m4a|mp3|wma)',

play_parse: true,
    //播放地址通用解析
    lazy: `js:
let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
let kurl = kcode.url;
if (kcode.encrypt == '1') {
url = unescape(url)
} else if (kcode.encrypt == '2') {
url = unescape(base64Decode(url))
};
if (/\\.(m3u8|mp4)/.test(kurl)) {
input = { jx: 0, parse: 0, url: kurl }
} else {
input = { jx: 0, parse: 1, url: input }
}`,
    filter: {}
}