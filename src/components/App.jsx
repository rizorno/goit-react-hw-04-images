import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { getImages } from '../services/imageAPI';
import { FETCH_STATUS } from 'constants/fetchStatus';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    imageName: '',
    imageList: [],
    currentPage: 1,
    currentHits: null,
    totalHits: null,
    status: FETCH_STATUS.start,
    isOpenModal: false,
    modalImg: '',
    alt: '',
  };

  async componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.currentPage;
    const nextPage = this.state.currentPage;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: FETCH_STATUS.loading });

      try {
        const response = await getImages({
          q: nextName,
          page: nextPage,
        });

        if (response.totalHits > 0) {
          if (nextPage === 1) {
            Notify.success(`Hooray! We found ${response.totalHits} images.`);
          }
          this.setState(prevState => ({
            imageList: [...prevState.imageList, ...response.hits],
            currentHits: prevState.imageList.length + response.hits.length,
            totalHits: response.totalHits,
          }));

          if (response.totalHits > 12) {
            this.setState({ status: FETCH_STATUS.fullfilled });
          }
        }
        if (response.totalHits === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        console.log(error);
        this.setState({ status: FETCH_STATUS.rejected });
      }
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName, imageList: [], currentPage: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleOpenModal = e => {
    const { name, alt } = e.target;
    if ((name, alt)) {
      this.setState({ isOpenModal: true, modalImg: name, alt: alt });
    }
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false, modalImg: '' });
  };

  render() {
    const {
      imageList,
      currentHits,
      totalHits,
      status,
      isOpenModal,
      modalImg,
      alt,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery>
          <ImageGalleryItem
            listImages={imageList}
            onOpenModal={this.handleOpenModal}
          />
        </ImageGallery>
        {status === FETCH_STATUS.fullfilled ? (
          <Button
            fetchNextPage={this.handleLoadMore}
            disabled={currentHits === totalHits}
          />
        ) : (
          <></>
        )}

        {isOpenModal && (
          <Modal
            bigImage={modalImg}
            alt={alt}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}
