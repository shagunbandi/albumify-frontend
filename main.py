import fileinput, re
import sys
import os
from os.path import isfile, join


path="/Users/shabandi/Desktop/All Photos"


def modify_file(value):
    print("Here")
    file_name = join(os.getcwd(), 'DjangoServer/settings.py')
    fh = fileinput.input(file_name, inplace=True)
    for line in fh:
        replacement = "MEDIA_ROOT=\"" + value + "\""
        line = re.sub('MEDIA_ROOT=.+', replacement, line)
        sys.stdout.write(line)
    fh.close()


modify_file(path)

#

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DjangoServer.settings")
#
# from django.core.management import call_command
# from django.core.wsgi import get_wsgi_application
# application = get_wsgi_application()
# call_command('runserver',  '127.0.0.1:8000')
