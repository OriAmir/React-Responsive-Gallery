
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import styles from './grid.module.scss';

const Row = ({ children }) => (
  <div className={styles.rowElement}>
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node
};

export default Row;
