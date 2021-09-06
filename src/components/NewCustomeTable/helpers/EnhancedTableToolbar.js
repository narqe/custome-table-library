import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import '../CustomeTable.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: '10px 5px',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    margin: '0px 5px',
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    title,
    subtitle,
    numSelected,
    massiveActions,
    massiveActionOnSelect,
    onDragNDropCancel,
    onDragNDropConfirm,
    massiveActionOnSelectClick,
    hasChanged,
    selectedOptions
  } = props;

  const handleMassiveClick = (selected) => () => massiveActionOnSelectClick(selected);

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
        <Typography color="inherit" variant="subtitle1" component="div">
          {subtitle}
        </Typography>
      </div>
      <div>
        {numSelected > 0 && !!massiveActionOnSelect &&
          massiveActionOnSelect.map((btn, index) => (
            <Tooltip key={index} title={t(btn.description)}>
              <Button
                id={`buttonMassiveOnSelect-${index}`}
                variant="outlined"
                color="primary"
                size="small"
                className={classes.button}
                endIcon={btn.icon}
                onClick={handleMassiveClick(selectedOptions)}
              >
                {t(btn.title)}
              </Button>
            </Tooltip>
          ))}
        {!!massiveActions &&
          massiveActions.map((action, i) => {
            return (
              <Tooltip title={t(action.description)} key={i}>
                <Button
                  id={`buttonMassive-${i}`}
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={classes.button}
                  endIcon={action.icon}
                  onClick={action.method}
                >
                  {t(action.title)}
                </Button>
              </Tooltip>
            );
          })}
        {!!hasChanged && (
          <React.Fragment>
            <Tooltip title={t('cancel')}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="CustomeTable__button"
                onClick={onDragNDropCancel}
              >
                {t('cancel')}
              </Button>
            </Tooltip>
            <Tooltip title={t('save')}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="CustomeTable__button"
                onClick={onDragNDropConfirm}
              >
                {t('save')}
              </Button>
            </Tooltip>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  massiveActionOnSelect: PropTypes.array,
  onDragNDrop: PropTypes.func,
  onDragNDropCancel: PropTypes.func,
  onDragNDropConfirm: PropTypes.func,
};

export default EnhancedTableToolbar;
