from django.http import JsonResponse
from os import listdir
from os.path import isfile, join
from django.conf import settings
from PIL import Image
from PIL.ExifTags import TAGS
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


path = settings.MEDIA_ROOT
MEDIA_URL = settings.MEDIA_URL

jsomSample = {
    '/': {
        'folders': {
            'folder1': {
                'folders': {},
                'files': []
            },
            'folder 2': {
                'folders': {},
                'files': ['/folder2/img1', 'img2']
            }
        },
        'files': ['/img1', '/img2']
    }
}


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
    try:
        return JsonResponse({
        'response': "Success",
        'data': get_image_url_rec(path, '/media/')[:10]
        })
    except:
        return JsonResponse({
            'response': "Failed",
            'data': []
            })


# @api_view(['GET'])
# def all_images_urls(request):
    # return Response({'data': get_image_url_rec(path, '/media/')[:10]})


def all_images(request):
    # return JsonResponse(get_all_file_urls(path, '/media/'), safe=False)

    urls_list = get_image_url_rec(path, '/media/')[:10]

    return render(request, 'photos/gallery.html', {
        'data': urls_list,
    })