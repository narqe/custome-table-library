import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    minHeight: 300,
  },
}));

const TableLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress size={80} thickness={1.5} />
    </div>
  );
};

export default TableLoading;
