    var rule = {
    author: '书虫/2503156/第1️⃣版',
    title: '游子视频',
    类型: '影视',
    //首页网址
    host: 'https://youzisp.tv/',
    hostJs: ``,
    headers: {'User-Agent':'Mozilla/5.0',
    },
    编码: 'utf-8',
    timeout: 5000,
    homeUrl: '/',
    //分类页
    url: '/vodshow/fyclass--------fypage---.html',
    //筛选页
    filter_url: '',
    detailUrl: '',  
    searchUrl: '/vodsearch/**----------fypage---.html',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    limit: 10,
    double: false,
    class_name: '电影&电视剧&综艺&动漫&纪录片',
    //静态分类值
    class_url: 'dianying&dianshiju&zongyi&dongman&jilupian',
    
    //推荐列表可以单独写也是几个参数，和一级列表部分参数一样的可以用*代替，不一样写不一样的，全和一级一样，可以用一个*代替
    推荐: '*',
    
    //数组、标题、图片、副标题、链接，分类页找参数
    一级:  'a:has(.module-item-pic);a&&title;.lazy.lazyload&&data-original;.module-item-note&&Text;a&&href',
    //搜索页找参数  数组标题图片副标题链接
    搜索: 'a:has(.module-item-pic);.lazy.lazyload&&alt;*;*;*',
    
    
    //详情页找参数
        //第一部分分别是对应参数式中的标题、图片、类型、备注、年份、地区、导演、主演、简介
    //第二部分分别对应参数式中的线路数组和线路标题
    //第三部分分别对应参数式中的播放列表、播放标题、播放链接
    
    二级: $js.toString(() => {
    VOD = {};
    let html = request(input);
    //定位详情页标题
VOD.vod_name = pdfh(html, "h1&&Text");
    //定位详情页图片链接
    VOD.vod_pic = pd(html, ".lazyload&&data-original");
    
    //定位详情页类型
    VOD.type_name = pdfh(html, ".module-info-tag-link:eq(2)&&Text");
    //定位详情页备注
    VOD.vod_remarks = pdfh(html, ".module-info-item-content:eq(3)&&Text");
    //定位详情页年份
    VOD.vod_year = pdfh(html, ".module-info-tag-link:eq(0)&&Text");
    //定位详情页地区
    VOD.vod_area = pdfh(html, ".module-info-tag-link:eq(1)&&Text");
    //定位详情页导演
    VOD.vod_director = pdfh(html, ".module-info-item-content:eq(0)&&Text");
    //定位详情页演员
    VOD.vod_actor = pdfh(html, ".module-info-item-content:eq(1)&&Text");
    //定位详情页简介
    VOD.vod_content = ("书虫祝您观影愉快！现为您介绍剧情:" + pdfh(html, "p&&Text"));
   
let playFrom = [];
    let playUrl = [];
    //定位详情页线路数组
    let tabs = pdfa(html, ".module-tab-item:has(small)");
 //定位详情页线路标题
    tabs.forEach((it, index) => {
        playFrom.push(pdfh(it, "span&&Text"));
        
        //定位详情页播放数列表
        let playTag = ".module-play-list-content:eq(#id)(" + index + ") a";
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