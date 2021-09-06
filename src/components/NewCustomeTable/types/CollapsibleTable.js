import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EnhancedTableToolbar from '../helpers/EnhancedTableToolbar';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import Paginator from '../helpers/Paginator';
import TableLoading from '../helpers/TableLoading';

const CollapsibleTable = ({
  title,
  subtitle,
  massiveActions,
  rowsData,
  columnsData,
  isLoading,
  pageNo,
  pageSize,
  resultsPerPage,
  frontPagination,
  onChangePage,
  onChangeSizePage,
  totalPages,
  actionsButtons,
  actionsByRow: ActionComponent,
  collapsibleComponent: CollapsibleComponent,
}) => {
  const { t } = useTranslation();

  if (!!isLoading) {
    return <TableLoading />;
  }

  return (
    <React.Fragment>
      <TableContainer>
        <EnhancedTableToolbar
          title={title}
          subtitle={subtitle}
          massiveActions={massiveActions}
        />
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton aria-label="expand row" size="small" />
              </TableCell>
              {columnsData.map(({ headerName }, indexCol) => (
                <TableCell key={indexCol}>{t(headerName)}</TableCell>
              ))}
              {!!actionsButtons && (
                <TableCell align="center">{t('actionsLabel')}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!frontPagination
              ? rowsData.slice(pageNo * pageSize, pageNo * pageSize + pageSize)
              : rowsData.map((row, rowIndex) => (
                  <RowLoop
                    key={Math.random()}
                    index={Math.random()}
                    row={row}
                    columnsData={columnsData}
                    collapsibleComponent={
                      <CollapsibleComponent row={row} indexRow={rowIndex} />
                    }
                    actionsButtons={actionsButtons}
                    actionsByRow={
                      <ActionComponent row={row} indexRow={rowIndex} />
                    }
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginator
        onChangePage={onChangePage}
        onChangeSizePage={onChangeSizePage}
        pageNo={pageNo}
        pageSize={pageSize}
        totalPages={!!frontPagination ? rowsData.length : totalPages}
        resultsPerPage={resultsPerPage}
      />
    </React.Fragment>
  );
};

const RowLoop = (props) => {
  const {
    row,
    collapsibleComponent,
    columnsData,
    actionsButtons,
    actionsByRow,
  } = props;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columnsData.map(
          (
            { label, valueFixed = null, translationsLabel = null },
            indexRow
          ) => {
            let translation = !!translationsLabel
              ? t(translationsLabel[`${row[label]}`])
              : '';
            return (
              <TableCell key={`${row[indexRow]}-${label}`} align="center">
                {!valueFixed ? row[label] : valueFixed(row[label], translation)}
              </TableCell>
            );
          }
        )}
        {!!actionsButtons && (
          <TableCell align="center">{actionsByRow}</TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {collapsibleComponent}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

CollapsibleTable.propTypes = {
  CollapsibleComponent: PropTypes.func.isRequired,
};

CollapsibleTable.defaultProps = {
  CollapsibleComponent: () => {},
};

export default CollapsibleTable;
