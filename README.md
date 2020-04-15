# PhotoAlbum

## What is It ??

Its localhost solution for your photos app. It has a Python (Django) Server for retrieving data, analysing it, and passing it to the front-end React Server.

## Why is it required ??

Imagine you had Goodle Photos kind of capability on your collection of photos, without having to upload it anywhere. You could have your photos library on any folder you say. Apple has it's photos app, but you cannot have a folder wise structure in that, you cannot open a Photo Library on your Windows PC with the same folder, album structure. 

What we have is, just launch your server on any folder, it will analyse its content and run a localhost web application with all the features your photo library could do. You can create albums, sort by date, location, search through photos by image content, etc. 

## How to Use ??

### Backend

Run the main.py file with location of your folder containing images, and sub folders on Images. 

```bash
pip install requirements.txt
python main.py <Location to your Photos Folder>
```

This will run the python server on `localhost:8000`

### Frontend

Install the required node_modules, and start the server

```bash
cd PhotoAlbumReact
npm i
npm start
```

This will run the react development server on `localhost:3000`, or you can build the files and and run.
