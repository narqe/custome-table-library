import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: { 
    textAlign: 'center',
    fontWeight: 500,
    padding: 25,
    borderRadius: 4,
  },
}));

const EmptyState = ({ title, subtitle }) => {
  const classes = useStyles();

  return (
    <div
      id="no-result-message"
      className={classes.paper}
    >
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <img
        src={ require('../assets/noResults.png').default }
        alt={title}
        className="EmptyState__TableContainer__NoResultsMessage__NoResultsImage"
      />
    </div>
  );
};

EmptyState.defaultProps = {
  title: '',
  subtitle: '',
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default EmptyState;
