# -*- coding: utf-8 -*-
import urllib
import urllib2
import re
import os
from bs4 import BeautifulSoup
#通过url获取页面信息
def getPage (url):
    #传入url，通过request类将url存储在response中
    request=urllib2.Request(url)
    response=urllib2.urlopen(request)
    #read()获取网页信息
    page=response.read().decode('utf-8')

    return page

def getImage(page,i):
    #通过正则表达式获取图片url地址
    #<img class="BDE_Image" src="https://imgsa.一大堆东西.jpg" pic_ext="jpeg"  width="480" height="480">
    item =re.compile(r'src="(https://imgsa.*?\.jpg)"')
    #findall（）返回在page的所有图片url
    items=re.findall(item ,page)
    #打印图片url
    for item in items:
        print(item)
        print i
        path='D:\picture'
        #图片存入本地，按i命名，本地需要新建一个命名为picture的文件
        createDir(path)
        urllib.urlretrieve(item,'D:\picture\%d.jpg' %i)
        i += 1
    return i

#创建文件夹
def createDir(path):
    # 去除开头的空格
    path=path.strip()
    #去除末尾的//
    path=path.rstrip("//")
    flag=os.path.exists(path)
    #若存在文件返回True，若文件不存在，创建
    if flag:
        return True
    else:
        os.makedirs(path)
        return False


i=1
url = 'https://tieba.baidu.com/p/3467842065?pn='
for j in range(1,5):
    #打印贴吧1到5页图片
    urln = url + str(j)
    print urln
    page = getPage(urln)
    i=getImage(page,i)