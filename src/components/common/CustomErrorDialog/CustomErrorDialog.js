import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './CustomErrorDialog.css';
import '../../../translations/i18n';

const useStyles = makeStyles(() => ({
  paper: { minWidth: '800px', background: '#FBFBFB', padding: "10px" },
  image: { width: '285px', height: 'auto' }
}));

const CustomErrorDialog = ({
  fullpage,
  type,
  header,
  title,
  message,
  open,
  img,
}) => {
  const classes = useStyles();

  return (
      <Dialog
        fullScreen={fullpage}
        classes={{ paper: classes.paper }}
        open={open}
        className={`CustomDialog CustomDialog__Container CustomDialog--${type.toLowerCase()}`}
      >
        <Grid
          container
          direction="row"
          alignItems="stretch"
          justify="center"
          spacing={0}
          className={`CustomErrorDialog__Grid CustomErrorDialog--${fullpage}`}
        >
          <Grid key={0} item xs={7}>
            <DialogTitle className="CustomErrorDialog__Header">
              <Typography variant="overline">
                <span>{header}</span>
              </Typography>
            </DialogTitle>
            <DialogTitle className="CustomErrorDialog__Title">
              <Typography variant="button">
                <span>{title}</span>
              </Typography>
            </DialogTitle>
            <DialogContent className="CustomErrorDialog__Content">
              <DialogContentText
                component={'div'}
                className="CustomErrorDialog__Content__Text"
              >
                {message}
              </DialogContentText>

            </DialogContent>
          </Grid>
          <Grid key={1} item xs={5}>
            <DialogContent>
              <img className={classes.image} src={img} alt={title} />
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
  );
};

CustomErrorDialog.defaultProps = {
  type: 'error',
  buttonText: 'closeLabel',
};

CustomErrorDialog.propTypes = {
  type: PropTypes.string,
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  buttonText: PropTypes.string,
  img: PropTypes.string,
};

export default CustomErrorDialog;
