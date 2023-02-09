import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './search-bar.module.scss';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button} aria-label="Submit">
            <span className="button-label"></span>
          </button>

          <input
            className={css.input}
            value={this.state.imageName}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
