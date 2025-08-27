var rule = {
  title: '自用',
  host: 'http://103.110.80.224:38888',
  url: '/index.php/vod/show/id/fyclass/page/fypage.html',
  searchUrl: '/search/page/fypage/wd/**.html',
  detailUrl: '/detail/fyid',
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  class_name: '电影&电视剧&动漫&综艺&纪录片&短剧&老库',
  class_url: '1&2&3&4&5&34&21',
  headers: {
    'User-Agent': 'Mozilla/5.0',
  },
  timeout: 5000,
  cate_exclude: '',
  play_parse: 0,
  lazy: `js:
let kcode = request(input).match(/<script(.*?)url/)[1];
let kurl = 'http'+kcode.match(/http(.*?),/)[1];
if (/\\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl }
} else {
    input = { jx: 0, parse: 1, url: input }
}`,
  double: true,
  推荐:'*',
  一级: '.gcol.l;a&&title;.inlist.ec-jabj.eclazy&&data-original;.packscore&&Text;a&&href',
   二级: `js:
 let html = request(input);
VOD = {};
 VOD.vod_id = input;
        //定位详情页标题
        VOD.vod_name = pdfh(html, "h1&&Text");
        VOD.vod_pic = pd(html, "img&&src");
        VOD.vod_area = pdfh(html, ".detailinfo&&p:eq(5)&&Text").replace("地区：", "");
          VOD.vod_year = pdfh(html, ".detailinfo&&p:eq(7)&&Text").replace("年份：", "");
        VOD.type_name = pdfh(html, ".detailinfo&&p:eq(-1)&&Text").replace("类型：", "");
        VOD.vod_actor = pdfh(html, ".detailinfo&&p:eq(2)&&Text").replace("主演：", "");
        VOD.vod_director = pdfh(html, ".detailinfo&&p:eq(1)&&Text").replace("导演：", "");
        VOD.vod_remarks =  pdfh(html, ".detailinfo&&p:eq(0)&&Text").replace("状态：", "");
        VOD.vod_content = ("✨乐哥为您介绍剧情👉请不要相信视频中的广告，以免上当受骗！" + pdfh(html, ".tjuqing&&p&&Text"));
         //线路
       let r_ktabs = pdfa(html,'#play&&li');
 let ktabs = r_ktabs.map(it => ("✨乐哥推荐✨" +pdfh(it, 'li&&Text')));
 VOD.vod_play_from = ktabs.join('$$$');
 let klists = [];
 //播放
let r_plists = pdfa(html, '.videolist');
 r_plists.forEach((rp) => {
     let klist = pdfa(rp, 'a').map((it) => {
     return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', input);
     });
    klist = klist.join('#');
     klists.push(klist);
});
 VOD.vod_play_url = klists.join('$$$')
 `,
  
  搜索: '.myui-vodbox-content;.title&&Text;img&&src;.tag.text-overflow&&Text;a&&href',
}