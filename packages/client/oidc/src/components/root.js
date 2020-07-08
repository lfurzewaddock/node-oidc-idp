import React from "react";
import PropTypes from "prop-types";

function Root({ children }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Root;
