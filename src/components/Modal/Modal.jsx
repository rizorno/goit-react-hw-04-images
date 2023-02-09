import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import css from './modal.module.scss';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeBtnEscBackdrop);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeBtnEscBackdrop);
  }

  closeBtnEscBackdrop = ({ target, currentTarget, code }) => {
    if (code === 'Escape' || target === currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    Loading.pulse({
      svgColor: 'orange',
    });
    const template = (
      <div className={css.overlay} onClick={this.closeBtnEscBackdrop}>
        <div className={css.modal}>
          <button
            type="button"
            className={css['btn-close']}
            aria-label="Close"
            onClick={this.closeBtnEscBackdrop}
          />

          <img
            src={this.props.bigImage}
            name=""
            alt=""
            width="800"
            height="600"
          />
          <p className={css.description}>{this.props.alt}</p>
        </div>
      </div>
    );
    Loading.remove();
    return createPortal(template, document.getElementById('modal'));
  }
}

Modal.propTypes = {
  bigImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
