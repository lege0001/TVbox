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
from datetime import datetime
from Crypto.Cipher import AES
from bs4 import BeautifulSoup
from base64 import b64decode
import urllib.request
import urllib.parse
import binascii
import requests
import datetime
import base64
import json
import time
import sys
import re
import os

sys.path.append('..')

xurl = "https://xifan-api-cn.youlishipin.com"

headerx = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; DUK-AL20 Build/HUAWEIDUK-AL20; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044353 Mobile Safari/537.36 MicroMessenger/6.7.3.1360(0x26070333) NetType/WIFI Language/zh_CN Process/tools'
          }

pm = ''

class Spider(Spider):
    global xurl
    global headerx
    global headers

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
        result = {"class": [{"type_id": "%E9%83%BD%E5%B8%82", "type_name": "都市"},
                            {"type_id": "%E9%9D%92%E6%98%A5", "type_name": "青春"},
                            {"type_id": "%E7%8E%B0%E4%BB%A3", "type_name": "现代"},
                            {"type_id": "%E8%B1%AA%E9%97%A8", "type_name": "豪门"},
                            {"type_id": "%E9%80%86%E8%A2%AD", "type_name": "逆袭"},
                            {"type_id": "%E7%A9%BF%E8%B6%8A", "type_name": "穿越"},
                            {"type_id": "%E6%89%93%E8%84%B8%E8%99%90%E6%B8%A3", "type_name": "打脸"}],
                 }

        return result

    def homeVideoContent(self):
        videos = []
        current_timestamp = int(datetime.datetime.now().timestamp())

        try:
            url = xurl + f"/xifan/drama/portalPage?reqType=aggregationPage&offset=0&quickEngineVersion=-1&scene=&categoryNames=&categoryVersion=&density=1.5&pageID=page_theater&version=2001001&androidVersionCode=28&requestId={current_timestamp}d4aa487d53e646c2&appId=drama&teenMode=false&userBaseMode=false&session=eyJpbmZvIjp7InVpZCI6IiIsInJ0IjoiMTc0MDY0NjA2MiIsInVuIjoiT1BHXzYzZTYyMTdhZGJhMDQ4NGI5OWNmYTdkOWMyNmU2NTIwIiwiZnQiOiIxNzQwNjQ2MDYyIn19&feedssession=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dHlwIjowLCJidWlkIjoxNjMzODY1NTEzMDAzNzYyNjg4LCJhdWQiOiJkcmFtYSIsInZlciI6MiwicmF0IjoxNzQwNjQ2MDYyLCJ1bm0iOiJPUEdfNjNlNjIxN2FkYmEwNDg0Yjk5Y2ZhN2Q5YzI2ZTY1MjAiLCJpZCI6Ijg4MmM2M2U3ZDRhYTQ4N2Q1M2U2NDZjMjQxMjg0NTcxIiwiZXhwIjoxNzQxMjUwODYyLCJkYyI6ImJqaHQifQ.zWhF-1Y92_NwuTzUQ_5dNoJwJN8g6UbMfVuH2QrSjjQ"
            response = requests.get(url=url, headers=headerx)
            if response.status_code == 200:
                response_data = response.json()
                js = response_data['result']['elements']

                for soups in js:
                    for vod in soups['contents']:

                        name = vod['duanjuVo']['title']

                        id = vod['duanjuVo']['duanjuId']

                        id1 = vod['duanjuVo']['source']

                        pic = vod['duanjuVo']['coverImageUrl']

                        remark = "集多推荐"

                        video = {
                            "vod_id": id + "#" + id1,
                            "vod_name": name,
                            "vod_remarks": remark,
                            "vod_pic": pic
                                }
                        videos.append(video)

            result = {'list': videos}
            return result
        except:
            pass

    def categoryContent(self, cid, pg, filter, ext):
        result = {}
        videos = []

        page_number = int(pg)
        page = (page_number - 1) * 30

        current_timestamp = int(datetime.datetime.now().timestamp())

        try:
            if '%E9%83%BD%E5%B8%82' in cid or '%E9%9D%92%E6%98%A5' in cid or '%E7%8E%B0%E4%BB%A3' in cid:
                url = xurl + f"/xifan/drama/portalPage?reqType=aggregationPage&offset={page}&categoryId=68&quickEngineVersion=-1&scene=&categoryNames={cid}&categoryVersion=1&density=1.5&pageID=page_theater&version=2001001&androidVersionCode=28&requestId={current_timestamp}aa498144140ef297&appId=drama&teenMode=false&userBaseMode=false&session=eyJpbmZvIjp7InVpZCI6IiIsInJ0IjoiMTc0MDY1ODI5NCIsInVuIjoiT1BHXzFlZGQ5OTZhNjQ3ZTQ1MjU4Nzc1MTE2YzFkNzViN2QwIiwiZnQiOiIxNzQwNjU4Mjk0In19&feedssession=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dHlwIjowLCJidWlkIjoxNjMzOTY4MTI2MTQ4NjQxNTM2LCJhdWQiOiJkcmFtYSIsInZlciI6MiwicmF0IjoxNzQwNjU4Mjk0LCJ1bm0iOiJPUEdfMWVkZDk5NmE2NDdlNDUyNTg3NzUxMTZjMWQ3NWI3ZDAiLCJpZCI6IjNiMzViZmYzYWE0OTgxNDQxNDBlZjI5N2JkMDY5NGNhIiwiZXhwIjoxNzQxMjYzMDk0LCJkYyI6Imd6cXkifQ.JS3QY6ER0P2cQSxAE_OGKSMIWNAMsYUZ3mJTnEpf-Rc"
                response = requests.get(url=url, headers=headerx)
                if response.status_code == 200:
                    response_data = response.json()

                    js = response_data['result']['elements']

                    for soups in js:
                        for vod in soups['contents']:
                            name = vod['duanjuVo']['title']

                            id = vod['duanjuVo']['duanjuId']

                            id1 = vod['duanjuVo']['source']

                            pic = vod['duanjuVo']['coverImageUrl']

                            remark = "集多推荐"

                            video = {
                                "vod_id": id + "#" + id1,
                                "vod_name": name,
                                "vod_remarks": remark,
                                "vod_pic": pic
                                    }
                            videos.append(video)
            else:
                url = xurl + f"/xifan/drama/portalPage?reqType=aggregationPage&offset={page}&categoryId=67&quickEngineVersion=-1&scene=&categoryNames={cid}&categoryVersion=1&density=1.5&pageID=page_theater&version=2001001&androidVersionCode=28&requestId={current_timestamp}aa498144140ef297&appId=drama&teenMode=false&userBaseMode=false&session=eyJpbmZvIjp7InVpZCI6IiIsInJ0IjoiMTc0MDY1ODI5NCIsInVuIjoiT1BHXzFlZGQ5OTZhNjQ3ZTQ1MjU4Nzc1MTE2YzFkNzViN2QwIiwiZnQiOiIxNzQwNjU4Mjk0In19&feedssession=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dHlwIjowLCJidWlkIjoxNjMzOTY4MTI2MTQ4NjQxNTM2LCJhdWQiOiJkcmFtYSIsInZlciI6MiwicmF0IjoxNzQwNjU4Mjk0LCJ1bm0iOiJPUEdfMWVkZDk5NmE2NDdlNDUyNTg3NzUxMTZjMWQ3NWI3ZDAiLCJpZCI6IjNiMzViZmYzYWE0OTgxNDQxNDBlZjI5N2JkMDY5NGNhIiwiZXhwIjoxNzQxMjYzMDk0LCJkYyI6Imd6cXkifQ.JS3QY6ER0P2cQSxAE_OGKSMIWNAMsYUZ3mJTnEpf-Rc"
                response = requests.get(url=url, headers=headerx)
                if response.status_code == 200:
                    response_data = response.json()

                    js = response_data['result']['elements']

                    for soups in js:
                        for vod in soups['contents']:
                            name = vod['duanjuVo']['title']

                            id = vod['duanjuVo']['duanjuId']

                            id1 = vod['duanjuVo']['source']

                            pic = vod['duanjuVo']['coverImageUrl']

                            remark = "集多推荐"

                            video = {
                                "vod_id": id + "#" + id1,
                                "vod_name": name,
                                "vod_remarks": remark,
                                "vod_pic": pic
                                    }
                            videos.append(video)
        except:
            pass
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

        bofang = ""
        fenge = did.split("#")

        url = xurl + f"/xifan/drama/getDuanjuInfo?duanjuId={fenge[0]}&source={fenge[1]}&openFrom=homescreen&type=&pageID=page_inner_flow&density=1.5&version=2001001&androidVersionCode=28&requestId=1740658944980aa498144140ef297&appId=drama&teenMode=false&userBaseMode=false&session=eyJpbmZvIjp7InVpZCI6IiIsInJ0IjoiMTc0MDY1ODI5NCIsInVuIjoiT1BHXzFlZGQ5OTZhNjQ3ZTQ1MjU4Nzc1MTE2YzFkNzViN2QwIiwiZnQiOiIxNzQwNjU4Mjk0In19&feedssession=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dHlwIjowLCJidWlkIjoxNjMzOTY4MTI2MTQ4NjQxNTM2LCJhdWQiOiJkcmFtYSIsInZlciI6MiwicmF0IjoxNzQwNjU4Mjk0LCJ1bm0iOiJPUEdfMWVkZDk5NmE2NDdlNDUyNTg3NzUxMTZjMWQ3NWI3ZDAiLCJpZCI6IjNiMzViZmYzYWE0OTgxNDQxNDBlZjI5N2JkMDY5NGNhIiwiZXhwIjoxNzQxMjYzMDk0LCJkYyI6Imd6cXkifQ.JS3QY6ER0P2cQSxAE_OGKSMIWNAMsYUZ3mJTnEpf-Rc"
        response = requests.get(url=url, headers=headerx)
        if response.status_code == 200:
            response_data = response.json()

        url = 'https://fs-im-kefu.7moor-fs1.com/ly/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1732707176882/jiduo.txt'
        response = requests.get(url)
        response.encoding = 'utf-8'
        code = response.text
        name = self.extract_middle_text(code, "s1='", "'", 0)
        Jumps = self.extract_middle_text(code, "s2='", "'", 0)

        content = '😸集多🎉为您介绍剧情📢' + response_data['result']['qualification']

        if name not in content:
            bofang = Jumps
            xianlu = '1'
        else:
            soup = response_data['result']['episodeList']
            for sou in soup:

                name = sou['title']

                id = sou['playUrl']

                bofang = bofang + name + '$' + id + '#'

            bofang = bofang[:-1] + '$$$'

        bofang = bofang[:-3]
        xianlu = '集多专线'

        videos.append({
            "vod_id": did,
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
        result["header"] = headerx
        return result

    def searchContentPage(self, key, quick, page):
        result = {}
        videos = []

        current_timestamp = int(datetime.datetime.now().timestamp())

        url = xurl + f"/xifan/search/getSearchList?keyword={key}84&pageIndex={page}&version=2001001&androidVersionCode=28&requestId={current_timestamp}ea3a14bc0317d76f&appId=drama&teenMode=false&userBaseMode=false&session=eyJpbmZvIjp7InVpZCI6IiIsInJ0IjoiMTc0MDY2ODk4NiIsInVuIjoiT1BHX2U5ODQ4NTgzZmM4ZjQzZTJhZjc5ZTcxNjRmZTE5Y2JjIiwiZnQiOiIxNzQwNjY4OTg2In19&feedssession=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dHlwIjowLCJidWlkIjoxNjM0MDU3ODE4OTgxNDk5OTA0LCJhdWQiOiJkcmFtYSIsInZlciI6MiwicmF0IjoxNzQwNjY4OTg2LCJ1bm0iOiJPUEdfZTk4NDg1ODNmYzhmNDNlMmFmNzllNzE2NGZlMTljYmMiLCJpZCI6ImVhZGE1NmEyZWEzYTE0YmMwMzE3ZDc2ZmVjODJjNzc3IiwiZXhwIjoxNzQxMjczNzg2LCJkYyI6ImJqaHQifQ.IwuI0gK077RF4G10JRxgxx4GCG502vR8Z0W9EV4kd-c"
        response = requests.get(url=url, headers=headerx)
        if response.status_code == 200:
            response_data = response.json()
            js = response_data['result']['elements']

            for soups in js:
                for vod in soups['contents']:
                    name = vod['duanjuVo']['title']

                    id = vod['duanjuVo']['duanjuId']

                    id1 = vod['duanjuVo']['source']

                    pic = vod['duanjuVo']['coverImageUrl']

                    remark = "集多推荐"

                    video = {
                        "vod_id": id + "#" + id1,
                        "vod_name": name,
                        "vod_remarks": remark,
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




