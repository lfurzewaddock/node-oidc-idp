import React from "react";
import PropTypes from "prop-types";

import Routes from "./Routes";
import Root from "./components/root";

import styles from "./comp-app.module.css";

const CompApp = ({ history }) => {
  return (
    <section className={styles.sectionContainer}>
      <article className={styles.articleContainer}>
        <Root>
          <Routes history={history} />
        </Root>
      </article>
    </section>
  );
};

CompApp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CompApp;
