import os
import sys
from os.path import isfile, join
from django.core.management import call_command
from django.core.wsgi import get_wsgi_application

# path = "/Users/shabandi/Desktop/All photos/Shikharji Bandi Family Oct. 2019"
path = sys.argv[1]


def modify_file(value):
    file_name = join(os.getcwd(), 'DjangoServer/settings.py')
    replacement_text = "MEDIA_ROOT = \"" + value + "\"";
    readFile = open(file_name)
    lines = readFile.readlines()
    readFile.close()
    w = open(file_name, 'w')
    w.writelines([item for item in lines[:-1]])
    w.writelines(replacement_text)
    w.close()


modify_file(path)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DjangoServer.settings")
application = get_wsgi_application()
call_command('runserver', '127.0.0.1:8000')
