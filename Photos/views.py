from django.http import HttpResponse

import os
from os import listdir
from os.path import isfile, join
import pathlib
from django.conf import settings

path = settings.MEDIA_ROOT


def index(request):

    photos_in_directory = [f for f in listdir(path) if isfile(join(path, f))]
    urls_in_directory = [join('/media', f) for f in photos_in_directory]
    image_tags_in_directory = ["<img src='" + f + "' alt='image' style=\"max-height:300px\"/>" for f in urls_in_directory]

    # return HttpResponse("WIP")
    return HttpResponse("\n".join(image_tags_in_directory))
