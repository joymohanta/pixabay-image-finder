import React, { Component } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

class ImageResult extends Component {
  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <ImageList cols={3}>
          {images.map((img) => (
            <ImageListItem title={img.tags} key={img.id}>
              <img src={img.largeImageURL} alt="" />
            </ImageListItem>
          ))}
        </ImageList>
      );
    } else {
      imageListContent = null;
    }

    return <div>{imageListContent}</div>;
  }
}

export default ImageResult;
