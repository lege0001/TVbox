var rule = {
    author: '乐哥250316',
    title: '影视工厂',
    host: 'https://ysgccc.com',
    url: '/lyvodshow/fyclass--------fypage---.html',
    homeUrl: '/',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_name: '电影&电视剧&综艺&动漫&豆瓣电影',
    class_url: '1&2&3&4&42',
    cate_exclude: '',
    double: false,
    推荐: '*',
    //推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    一级: 'body&&.fed-list-item:has(span);.fed-list-title&&Text;.fed-lazy&&data-original;.fed-text-center&&Text;a&&href', //列表;标题;图片;描述;链接;详情(可不写)
    // 一级: `js:
    // let klist=pdfa(request(input),'a:has(.module-item-pic)');
    // let k=[];
    //klist.forEach(it=>{
    // k.push({
    //  title: pdfh(it,'a&&title'),
    // pic_url: !pdfh(it,'.lazy.lazyload&&data-original||src').startsWith('http') ? HOST + pdfh(it,'.lazy.lazyload&&data-original||src') : pdfh(it,'.lazy.lazyload&&data-original||src'),     
    // desc: pdfh(it,'.module-item-note&&Text'),
    // url: pdfh(it,'a&&href'),    
    // content: ''    
    //   })
    // });
    //setResult(k)
    //`,

    二级: $js.toString(() => {
        VOD = {};
        let html = request(input);
        //影片标题
        VOD.vod_name = pdfh(html, "h3&&a&&Text");
        //图片
        VOD.vod_pic = pd(html, "dt&&a&&data-original");

        //类型
        VOD.type_name = pdfh(html, "dd&&li:eq(2)&&Text").replace("分类：", "");
        //状态备注
        VOD.vod_remarks = pdfh(html, "dt&&.fed-text-center&&Text");
        //年份
        VOD.vod_year = pdfh(html, "dd&&li:eq(4)&&Text");
        //地区
        VOD.vod_area = pdfh(html, "dd&&li:eq(3)&&Text").replace("地区：", "");
        //导演
        VOD.vod_director = pdfh(html, "dd&&li:eq(1)&&Text").replace("导演：", "");
        //演员
        VOD.vod_actor = pdfh(html, "dd&&li:eq(0)&&Text").replace("主演：", "");
        //简介
        VOD.vod_content = ("✨乐哥为您介绍剧情👉请不要相信视频中的广告，以免上当受骗！" + pdfh(html, "p&&Text"));
        let playFrom = [];
        let playUrl = [];
        //线路数组
        let tabs = pdfa(html, ".fed-tabs-foot&&li");
        //线路标题
        tabs.forEach((it, index) => {
            playFrom.push("✨乐哥推荐✨" + pdfh(it, "a&&Text"));
            //播放数组列表
            let playTag = ".fed-tabs-btm:eq(#id)(" + index + ") li";
            let tags = pdfa(html, playTag);
            //播放标题
            let mapUrl = tags.map((tag) => {
                let title = pdfh(tag, "a&&Text").trim();
                //播放链接
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
    //isVideo: 'http((?!http).){26,}\\.(m3u8|mp4|flv|avi|mkv|wmv|mpg|mpeg|mov|ts|3gp|rm|rmvb|asf|m4a|mp3|wma)',
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
    searchUrl: 'https://ysgccc.com/lyvodsearch/**----------fypage---.html',
    // 搜索: 'dl;h3&&Text;.fed-lazy&&data-original;.fed-text-center&&Text;.fed-deta-play&&href', 
    //列表;标题;图片;描述;链接;详情(可不写)
    搜索: `js:
let klist=pdfa(request(input),'body&&dl');
let k=[];
 klist.forEach(it=>{
    k.push({
         title: pdfh(it,'h3&&Text'),
         pic_url: pdfh(it,'.fed-lazy&&data-original'),
         desc: pdfh(it,'.fed-text-center&&Text'),
        url: pdfh(it,'a&&href'),              
     })
});
 setResult(k)`,

}