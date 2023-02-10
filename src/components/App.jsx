import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { getImages } from '../services/imageAPI';
import { FETCH_STATUS } from 'constants/fetchStatus';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [imageList, setImageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentHits, setCurrentHits] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState(FETCH_STATUS.start);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const fetchImages = async () => {
      try {
        const response = await getImages({
          q: imageName,
          page: currentPage,
        });

        if (response.totalHits > 0) {
          if (currentPage === 1) {
            Notify.success(`Hooray! We found ${response.totalHits} images.`);
          }
          setImageList(prev => [...prev, ...response.hits]);
          setCurrentHits(prev => prev + response.hits.length);
          setTotalHits(response.totalHits);

          if (response.totalHits > 12) {
            setStatus(FETCH_STATUS.fullfilled);
          }
        }
        if (response.totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        console.log(error);
        setStatus(FETCH_STATUS.rejected);
      }
    };

    if (imageName !== '' || currentHits !== totalHits) {
      setStatus(FETCH_STATUS.loading);
      // eslint-disable-next-line no-undef
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName, currentPage]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImageList([]);
    setCurrentPage(1);
    setCurrentHits(null);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleOpenModal = e => {
    const { name, alt } = e.target;
    if ((name, alt)) {
      setIsOpenModal(true);
      setModalImg(name);
      setAlt(alt);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setModalImg('');
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery>
        <ImageGalleryItem
          listImages={imageList}
          onOpenModal={handleOpenModal}
        />
      </ImageGallery>
      {status === FETCH_STATUS.fullfilled ? (
        <Button
          fetchNextPage={handleLoadMore}
          disabled={currentHits === totalHits}
        />
      ) : (
        <></>
      )}

      {isOpenModal && (
        <Modal bigImage={modalImg} alt={alt} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};
