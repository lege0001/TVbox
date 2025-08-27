var rule = {
    author: '乐哥250316',
    title: '老牛影视',
    类型: '影视',
    //首页网址
    host: 'http://www.aucma-ev.com/',
    hostJs: ``,
    headers: {
        'User-Agent': 'Mozilla/5.0',
    },
    编码: 'utf-8',
    timeout: 5000,
    homeUrl: '/',
    //分类页
    url: '/modshow/fyclass--------fypage---.html',
    //筛选页
    filter_url: '',
    detailUrl: '',
    searchUrl: '/modsearch/**----------fypage---.html',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    limit: 10,
    double: false,
    class_name: '电影&电视剧&综艺&动漫&纪实&解说',
    //静态分类值
    class_url: 'movie&tv&variety&cartoon&documentary&jieshuo',

    //推荐列表可以单独写也是几个参数，和一级列表部分参数一样的可以用*代替，不一样写不一样的，全和一级一样，可以用一个*代替
    推荐: '*',

    //数组、标题、图片、副标题、链接，分类页找参数
    一级: '.col-xs-4;.video-img.lazyload&&title;.video-img.lazyload&&data-original;.ngstyle-vidactors&&Text;a&&href',
    //搜索页找参数  数组标题图片副标题链接
    搜索: 'article;a&&title;.lazyload&&data-original;;*',


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
        VOD.type_name = pdfh(html, "p:eq(2)&&Text").replace("类型：", "");
        //状态备注
        VOD.vod_remarks = pdfh(html, "p:eq(5)&&Text").replace("提醒：", "");
        //年份
        VOD.vod_year = pdfh(html, "p:eq(4)&&Text").replace("年份：", "");
        //地区
        VOD.vod_area = pdfh(html, "p:eq(3)&&Text").replace("地区：", "");
        //导演
        VOD.vod_director = pdfh(html, "p:eq(1)&&Text").replace("导演：", "");
        //演员
        VOD.vod_actor = pdfh(html, "p:eq(0)&&Text").replace("主演：", "");
        //简介
        VOD.vod_content = ("✨乐哥为您介绍剧情👉请不要相信视频中的广告，以免上当受骗！" + pdfh(html, "dd&&Text"));

        let playFrom = [];
        let playUrl = [];
        //定位详情页线路数组，可采用类名或id方法定位，如#y-playList&&.module-tab-item，注意定位到子类的类名。
        let tabs = pdfa(html, ".playlist-box&&");
        //定位详情页线路标题
        tabs.forEach((it, index) => {
            playFrom.push("✨乐哥推荐✨" + pdfh(it, ".ngstyle-wdgtlsttle&&Text"));

            //定位详情页播放数列表
            let playTag = ".playlist:eq(#id)(" + index + ") li";
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