# coding = utf-8
# !/usr/bin/python

"""

作者 丢丢喵 🚓 内容均从互联网收集而来 仅供交流学习使用 版权归原创者所有 如侵犯了您的权益 请通知作者 将及时删除侵权内容
                    ====================Diudiumiao====================

"""

from Crypto.Util.Padding import unpad
from urllib.parse import unquote
from Crypto.Cipher import ARC4
from urllib.parse import quote
from base.spider import Spider
from Crypto.Cipher import AES
from bs4 import BeautifulSoup
from base64 import b64decode
import urllib.request
import urllib.parse
import binascii
import requests
import base64
import json
import time
import sys
import re
import os

sys.path.append('..')

xurl = "https://app.whjzjx.cn"

headerz = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36'
          }

headerx = {
    "personalized_recommend_status": "1",
    "app_version": "3.2.0.1",
    "device_id": "23b07cf840c8b3eeca8c01fc56f0f0a09",
    "os_version": "11",
    "channel": "default",
    "Connection": "Keep-Alive",
    "User-Agent": "okhttp/4.10.0",
    "Referer": "https://app.whjzjx.cn",
    "device_type": "M2012K10C",
    "Host": "app.whjzjx.cn",
    "dev_token": "BY1wFZd4K0vDqzVMbtHXNmlQ29ovO5peS5MsZ7VX1rQUXDwAqskxkJtiPMZCEj6MaW-40xNnbvn12F68nLEAMkRoD7tpoieO4nkUE-GLOYxqCs0xmxWgXAh0-7NmmGCHi95SlyZlpHeit94JfJPkpo-hl4JFru2wUI-4P0AwDc5Y*",
    "uuid": "randomUUID_f87c01c7-3d61-4feb-ade0-3d6d45d24dfd",
    "platform": "1",
    "manufacturer": "Xiaomi",
    "msa_oaid": "9494817a02a93435",
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDIzMTI2MTYsIlVzZXJJZCI6NTA5MDg3NDEsInJlZ2lzdGVyX3RpbWUiOiIyMDI0LTA3LTA5IDIwOjUwOjIxIiwiaXNfbW9iaWxlX2JpbmQiOmZhbHNlLCJkIjoiMjQyNTA2ODNhM2JkYjNmMTE4ZGZmMjViYTRiMWNiYTFhIn0.f_h9Ah05SGdmd24FLyd97SkVstIe9UxTfVRWV-JFElE",
    "version_name": "3.2.0.1",
    "support_h265": "1",
    "X-App-Id": "7",
    "device_brand": "Redmi",
    "device_platform": "android",
    "raw_channel": "default",
    "user_agent": "Mozilla/5.0 (Linux; Android 11; M2012K10C Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36",
    "oaid": "9494817a02a93435",
    "Accept-Encoding": "gzip, deflate"
           }

pm = ''

class Spider(Spider):
    global xurl
    global headerx

    def getName(self):
        return "首页"

    def init(self, extend):
        pass

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def extract_middle_text(self, text, start_str, end_str, pl, start_index1: str = '', end_index2: str = ''):
        if pl == 3:
            plx = []
            while True:
                start_index = text.find(start_str)
                if start_index == -1:
                    break
                end_index = text.find(end_str, start_index + len(start_str))
                if end_index == -1:
                    break
                middle_text = text[start_index + len(start_str):end_index]
                plx.append(middle_text)
                text = text.replace(start_str + middle_text + end_str, '')
            if len(plx) > 0:
                purl = ''
                for i in range(len(plx)):
                    matches = re.findall(start_index1, plx[i])
                    output = ""
                    for match in matches:
                        match3 = re.search(r'(?:^|[^0-9])(\d+)(?:[^0-9]|$)', match[1])
                        if match3:
                            number = match3.group(1)
                        else:
                            number = 0
                        if 'http' not in match[0]:
                            output += f"#{match[1]}${number}{xurl}{match[0]}"
                        else:
                            output += f"#{match[1]}${number}{match[0]}"
                    output = output[1:]
                    purl = purl + output + "$$$"
                purl = purl[:-3]
                return purl
            else:
                return ""
        else:
            start_index = text.find(start_str)
            if start_index == -1:
                return ""
            end_index = text.find(end_str, start_index + len(start_str))
            if end_index == -1:
                return ""

        if pl == 0:
            middle_text = text[start_index + len(start_str):end_index]
            return middle_text.replace("\\", "")

        if pl == 1:
            middle_text = text[start_index + len(start_str):end_index]
            matches = re.findall(start_index1, middle_text)
            if matches:
                jg = ' '.join(matches)
                return jg

        if pl == 2:
            middle_text = text[start_index + len(start_str):end_index]
            matches = re.findall(start_index1, middle_text)
            if matches:
                new_list = [f'{item}' for item in matches]
                jg = '$$$'.join(new_list)
                return jg

    def homeContent(self, filter):
        result = {}
        result = {"class": [{"type_id": "2", "type_name": "集多热播剧🌠"},
                            {"type_id": "8", "type_name": "集多会员专享🌠"},
                            {"type_id": "7", "type_name": "集多星选好剧🌠"},
                            {"type_id": "3", "type_name": "集多新剧🌠"},
                            {"type_id": "5", "type_name": "集多阳光剧场🌠"}],
                 }

        return result

    def homeVideoContent(self):
        videos = []

        url = xurl + f"/cloud/v2/theater/home_page?theater_class_id=1&type=1&class2_ids=0&page_num=1&page_size=24"
        response = requests.get(url=url, headers=headerx, verify=False)
        if response.status_code == 200:
            response_data = response.json()
            data = response_data.get('data')

            js = data['list']

            for vod in js:
                name = vod['theater']['title']

                id = vod['theater']['id']

                pic = vod['theater']['cover_url']

                remark = vod['theater']['play_amount_str']

                video = {
                    "vod_id": id,
                    "vod_name": name,
                    "vod_pic": pic
                        }
                videos.append(video)

        result = {'list': videos}
        return result

    def categoryContent(self, cid, pg, filter, ext):
        result = {}
        videos = []

        url = xurl + f"/cloud/v2/theater/home_page?theater_class_id={cid}&type=1&class2_ids=0&page_num={pg}&page_size=24"
        response = requests.get(url=url, headers=headerx, verify=False)
        if response.status_code == 200:
            response_data = response.json()
            data = response_data.get('data')

            js = data['list']

            for vod in js:
                name = vod['theater']['title']

                id = vod['theater']['id']

                pic = vod['theater']['cover_url']

                video = {
                    "vod_id": id,
                    "vod_name": name,
                    "vod_pic": pic
                        }
                videos.append(video)

        result = {'list': videos}
        result['page'] = pg
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result

    def detailContent(self, ids):
        global pm
        did = ids[0]
        result = {}
        videos = []

        url = xurl + f"/v2/theater_parent/detail?theater_parent_id={did}"
        response = requests.get(url=url, headers=headerx, verify=False)
        if response.status_code == 200:
            response_data = response.json()
            data = response_data.get('data')

        url = 'https://fs-im-kefu.7moor-fs1.com/ly/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1732707176882/jiduo.txt'
        response = requests.get(url)
        response.encoding = 'utf-8'
        code = response.text
        name = self.extract_middle_text(code, "s1='", "'", 0)
        Jumps = self.extract_middle_text(code, "s2='", "'", 0)

        content = '😸集多🎉为您介绍剧情📢' + data['introduction']

        remarks = data['filing']

        if name not in content:
            bofang = Jumps
            xianlu = '1'
        else:
            xianlu = ''
            bofang = ''

            for soup in data['theaters']:

                name = str(soup['num'])

                id = soup['son_video_url']

                bofang = bofang + name + '$' + id + '#'

        bofang = bofang[:-1]

        xianlu = '集多专线'

        videos.append({
            "vod_id": did,
            "vod_remarks": remarks,
            "vod_content": content,
            "vod_play_from": xianlu,
            "vod_play_url": bofang
                     })

        result['list'] = videos
        return result

    def playerContent(self, flag, id, vipFlags):

        result = {}
        result["parse"] = 0
        result["playUrl"] = ''
        result["url"] = id
        result["header"] = headerz
        return result

    def searchContentPage(self, key, quick, page):
        result = {}
        videos = []

        payload = {
            "text": key
                  }

        url = xurl + f"/v2/search"
        response = requests.post(url=url, headers=headerx, json=payload, verify=False)
        if response.status_code == 200:
            response_data = response.json()
            data = response_data.get('data')

            js = data['search_data']

            for vod in js:

                name = vod['title']

                id = vod['id']

                pic = vod['cover_url']

                video = {
                    "vod_id": id,
                    "vod_name": name,
                    "vod_pic": pic
                        }
                videos.append(video)

        result['list'] = videos
        result['page'] = page
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result

    def searchContent(self, key, quick, pg="1"):
        return self.searchContentPage(key, quick, '1')

    def localProxy(self, params):
        if params['type'] == "m3u8":
            return self.proxyM3u8(params)
        elif params['type'] == "media":
            return self.proxyMedia(params)
        elif params['type'] == "ts":
            return self.proxyTs(params)
        return None











