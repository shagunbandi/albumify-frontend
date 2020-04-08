import fileinput, re
import os, sys

from os.path import isfile, join
import sys


# path = "/Users/shabandi/Desktop/All Photos/Shikharji Bandi Family Oct. 2019"
path = sys.argv[1]

def modify_file(value):
    file_name = join(os.getcwd(), 'DjangoServer/settings.py')
    replacement_text = "MEDIA_ROOT = \"" + value + "\"";

    # regex = re.compile(r"^MEDIA_ROOT.*$", re.IGNORECASE)
    regex = "MEDIA_ROOT.*"


    readFile = open(file_name)
    lines = readFile.readlines()
    readFile.close()
    w = open(file_name, 'w')
    w.writelines([item for item in lines[:-1]])
    w.writelines(replacement_text)
    w.close()


modify_file(path)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DjangoServer.settings")

from django.core.management import call_command
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
call_command('runserver',  '127.0.0.1:8000')