import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import css from './modal.module.scss';

const Modal = ({ bigImage, alt, onCloseModal }) => {
  useEffect(() => {
    const closeBtnEscBackdrop = ({ target, currentTarget, code }) => {
      if (code === 'Escape' || target === currentTarget) {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', closeBtnEscBackdrop);

    return () => {
      window.removeEventListener('keydown', closeBtnEscBackdrop);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCloseModal]);

  const closeBtnEscBackdrop = ({ target, currentTarget, code }) => {
    if (code === 'Escape' || target === currentTarget) {
      onCloseModal();
    }
  };

  Loading.pulse({
    svgColor: 'orange',
  });
  const template = (
    <div className={css.overlay} onClick={closeBtnEscBackdrop}>
      <div className={css.modal}>
        <button
          type="button"
          className={css['btn-close']}
          aria-label="Close"
          onClick={closeBtnEscBackdrop}
        />

        <img src={bigImage} name="" alt="" width="800" height="600" />
        <p className={css.description}>{alt}</p>
      </div>
    </div>
  );
  Loading.remove();
  return createPortal(template, document.getElementById('modal'));
};

Modal.propTypes = {
  bigImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
