import React from 'react';
import PropTypes from 'prop-types'; // ES6

const ReactColorSquare = (props) => {
  const {
    text
  } = props;
  return (
    <div
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'green'
      }}
    >
      {text}
    </div>
  );
};

// "@babel/preset-react": "^7.0.0",

ReactColorSquare.propTypes = {
  text: PropTypes.string
};

ReactColorSquare.defaultProps = {
  text: 'hello world'
};
export default ReactColorSquare;
