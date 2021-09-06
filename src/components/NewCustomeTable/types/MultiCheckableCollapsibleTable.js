import React, {useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EnhancedTableToolbar from '../helpers/EnhancedTableToolbar';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { Checkbox } from '@material-ui/core';
import Paginator from '../helpers/Paginator';
import TableLoading from '../helpers/TableLoading';
import SelectedReducer, {
  updateSelected,
  resetSelected,
  INITIAL_STATE,
} from '../reducers/Selected.reducer';

const MultiCheckableCollapsibleTable = ({
  title,
  subtitle,
  massiveActions,
  rowsData,
  columnsData,
  actionsButtons,
  pageNo,
  pageSize,
  isLoading,
  totalPages,
  resultsPerPage,
  frontPagination,
  onChangePage,
  onChangeSizePage,
  massiveActionOnSelect,
  massiveActionOnSelectClick,
  actionsByRow: ActionComponent,
  collapsibleComponent: CollapsibleComponent,
}) => {
  const { t } = useTranslation();
  const [selected, dispatch] = useReducer(SelectedReducer, INITIAL_STATE);
  const EnhancedTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnsData.map(({ headerName }, indexCol) => (
            <TableCell key={indexCol}>{t(headerName)}</TableCell>
          ))}
          {!!actionsButtons && (
            <TableCell align="center">{t('actionsLabel')}</TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  };

  const handleSelectAllClick = (event, data) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => 
        n.id ? n.id : n[Object.keys(n)[0]]
      );
      const newSelectedsArray = data;
      dispatch(updateSelected(newSelecteds, newSelectedsArray));
      return;
    }
    dispatch(resetSelected(INITIAL_STATE));
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.idsSelected.indexOf(
      row.id ? row.id : row[Object.keys(row)[0]]
    );
    const selectedIndexArray = selected.rowsSelected.indexOf(row);

    let newSelected = [];
    let arraySelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(
        selected.idsSelected, 
        row.id ? row.id : row[Object.keys(row)[0]]
      );
      arraySelected = arraySelected.concat(selected.rowsSelected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.idsSelected.slice(1));
      arraySelected = arraySelected.concat(selected.rowsSelected.slice(1));
    } else if (selectedIndex === selected.idsSelected.length - 1) {
      newSelected = newSelected.concat(selected.idsSelected.slice(0, -1));
      arraySelected = arraySelected.concat(selected.rowsSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.idsSelected.slice(0, selectedIndex),
        selected.idsSelected.slice(selectedIndex + 1)
      );

      arraySelected = arraySelected.concat(
        selected.rowsSelected.slice(0, selectedIndexArray),
        selected.rowsSelected.slice(selectedIndexArray + 1)
      );
    }
    dispatch(updateSelected(newSelected, arraySelected));
  };

  const isSelected = (id) => selected.idsSelected.indexOf(id) !== -1;

  if (!!isLoading) {
    return <TableLoading />;
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <EnhancedTableToolbar
          title={title}
          subtitle={subtitle}
          massiveActions={massiveActions}
          numSelected={selected.idsSelected.length}
          onSelectAllClick={(e) => handleSelectAllClick(e, rowsData)}
          rowCount={rowsData.length}
          massiveActionOnSelect={massiveActionOnSelect}
          selectedOptions={selected}
          massiveActionOnSelectClick={massiveActionOnSelectClick}
        />
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            numSelected={selected.idsSelected.length}
            onSelectAllClick={(e) => handleSelectAllClick(e, rowsData)}
            rowCount={rowsData.length}
          />
          <TableBody>
            {!!frontPagination
              ? rowsData.slice(pageNo * pageSize, pageNo * pageSize + pageSize)
              : rowsData.map((row, rowIndex) => {
                  const isItemSelected = isSelected(
                    row.id ? row.id : row[Object.keys(row)[0]]
                  );

                  return (
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
                      actionEvent={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    />
                  );
                })}
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
    selected,
    actionEvent,
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
        <TableCell padding="checkbox" onClick={() => actionEvent()}>
          <Checkbox checked={selected} />
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
              <TableCell
                key={`${row[indexRow]}-${label}${Math.random()}`}
                align="center"
              >
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

MultiCheckableCollapsibleTable.propTypes = {
  CollapsibleComponent: PropTypes.func.isRequired,
  massiveActionOnSelect: PropTypes.array.isRequired,
};

MultiCheckableCollapsibleTable.defaultProps = {
  CollapsibleComponent: () => {},
  onUpdate: () => {},
  actionsByRow: () => {},
};

export default MultiCheckableCollapsibleTable;
