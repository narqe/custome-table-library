import React, { useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    display: 'block',
    color: 'black',
    background: 'white',
    height: 'auto',
    fontSize: 12,
    borderRadius: 0,
  },
}));

const Paginator = (props) => {
  const {
    onChangePage,
    onChangeSizePage,
    pageNo,
    pageSize,
    totalPages,
    resultsPerPage,
  } = props;
  const [page, setPage] = useState(pageNo);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    onChangeSizePage(+event.target.value);
    setPage(0);
  };

  return (
    <TablePagination
      classes={classes}
      rowsPerPageOptions={resultsPerPage}
      component="div"
      count={totalPages}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      nextIconButtonText={t('nextPageLabel')}
      backIconButtonText={t('backPageLabel')}
      labelRowsPerPage={t('rowsPerPageLabel')}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} ${t('ofLabel')} ${
          count !== -1 ? count : `${t('moreThanLabel')} ${to}`
        }`
      }
    />
  );
};

export default Paginator;
