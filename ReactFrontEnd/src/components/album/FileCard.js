import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    setGalleryComponents
} from '../../actions/galleryAction';

export class FileCard extends Component {

    showGalleryView = () => {
        console.log(this.props)
        const { images, current } = this.props;
        this.props.setGalleryComponents({
            current: current,
            images: images,
            show: true
        })
    }

    render() {
        const { fileData } = this.props;
        const imageUrl = 'http://localhost:8000/' + fileData;
        return (
            <div className="card file-card">
                <img className="file-card-image" src={imageUrl} alt={fileData} onClick={this.showGalleryView} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
});


export default connect(
    mapStateToProps,
    { setGalleryComponents }
)(FileCard);