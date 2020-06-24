import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import './stylesheet/App.css';

import Navbar from './components/layout/Navbar';
import NavBarOptions from './components/layout/NavBarOptions'

import DirectoryLanding from './components/directory/DirectoryLanding';
import PhotosLanding from './components/photos/PhotosLanding';
import GalleryLanding from './components/galleryView/GalleryLanding';
import store from './store';
import AlbumLanding from './components/album/AlbumLanding';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="black-bg">
            <Navbar />
            <NavBarOptions />
            <GalleryLanding />
            <Route path="/directory" component={DirectoryLanding} />
            <Route path="/album" component={AlbumLanding} />
            <Route path='/photos' component={PhotosLanding} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
