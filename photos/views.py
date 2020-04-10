from django.http import JsonResponse
from os import listdir
from os.path import isfile, join
from django.conf import settings
from PIL import Image
from PIL.ExifTags import TAGS
from django.shortcuts import render
import math

path = settings.MEDIA_ROOT
MEDIA_URL = settings.MEDIA_URL
IMAGES_PER_PAGE = 50


def get_metadata(path):
    image = Image.open(path)
    exifdata = image.getexif()

    metadata = {}

    for tag_id in exifdata:
        tag = TAGS.get(tag_id, tag_id)
        data = exifdata.get(tag_id)
        if isinstance(data, bytes):
            data = data.decode('utf-8')
        metadata[tag] = data
    return metadata


# def get_all_file_urls(path, join_with):
#     photos_in_directory = {
#         'files': [],
#         'folders': {}
#     }
#     for f in listdir(path):
#         if isfile(join(path, f)):
#             url = join(join_with, f)
#             # metadata = {}
#             # try:
#             #     metadata = get_metadata(join(path, f))
#             #     metadata[url] = url
#             # except:
#             #     metadata[url] = url
#             photos_in_directory['files'].append(url)
#         else:
#             photos_in_directory['folders'][f] = get_all_file_urls(join(path, f), join(join_with, f))
#     return photos_in_directory


def get_image_url_rec(path, join_with):
    photos_in_directory = []
    for f in listdir(path):
        if isfile(join(path, f)):
            url = join(join_with, f)
            photos_in_directory.append(url)
        else:
            photos_in_directory += get_image_url_rec(join(path, f), join(join_with, f))
    return photos_in_directory


def all_images_urls(request):
    page = 1
    if request.method == 'GET':
        page = int(request.GET['page'])

    data = get_image_url_rec(path, '/media/')
    total_files = len(data)
    total_pages = math.ceil(total_files / IMAGES_PER_PAGE)


    index_start = IMAGES_PER_PAGE * (page - 1)
    index_end = IMAGES_PER_PAGE * page

    data = data[index_start:index_end]
    return JsonResponse({
        'response': "Success",
        'data': data,
        'total_pages': total_pages,
        'total_files':  total_files,
        'total_till_now': (page - 1) * IMAGES_PER_PAGE + len(data),
        'page_number': page
    })
