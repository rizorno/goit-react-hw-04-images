import React from 'react';
import PropTypes from 'prop-types';
import css from './image-gallery-item.module.scss';

function ImageGalleryItem({ listImages = [], onOpenModal }) {
  let elements = listImages.map(element => {
    const { id, tags, webformatURL, largeImageURL } = element;

    return (
      <li key={id} className={css.galleryItem}>
        <img
          src={webformatURL}
          name={largeImageURL}
          alt={tags}
          onClick={onOpenModal}
          className={css.galleryImage}
        />
      </li>
    );
  });

  return <>{elements}</>;
}

ImageGalleryItem.propTypes = {
  listImages: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
