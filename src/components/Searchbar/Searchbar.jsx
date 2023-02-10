import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './search-bar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button} aria-label="Submit">
          <span className="button-label"></span>
        </button>

        <input
          className={css.input}
          value={imageName}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
