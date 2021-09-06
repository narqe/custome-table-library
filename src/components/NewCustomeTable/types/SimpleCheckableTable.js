import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import DragNDropIcon from '@material-ui/icons/DragIndicator';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ReorderItems from '../helpers/ReorderItems';
import EnhancedTableToolbar from '../helpers/EnhancedTableToolbar';
import Paginator from '../helpers/Paginator';
import TableLoading from '../helpers/TableLoading';
import SelectedReducer, {
  updateSelected,
  resetSelected,
  INITIAL_STATE,
} from '../reducers/Selected.reducer';

const SimpleCheckableTable = ({
  title,
  subtitle,
  massiveActions,
  rowsData,
  columnsData,
  isLoading,
  pageNo,
  pageSize,
  totalPages,
  resultsPerPage,
  frontPagination,
  onChangePage,
  onChangeSizePage,
  actionsButtons,
  actionsByRow: ActionComponent,
  massiveActionOnSelect,
  massiveActionOnSelectClick,
  isDragNDrop,
  onDragNDrop = () => {},
  onDragNDropCancel = () => {},
  onDragNDropConfirm = () => {},
}) => {
  const { t } = useTranslation();
  const [selected, dispatch] = useReducer(SelectedReducer, INITIAL_STATE);
  const [page] = useState(pageNo);
  const [rowsPerPage] = useState(pageSize);
  const [changed, setChanged] = useState(false);

  const EnhancedTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <TableHead>
        <TableRow>
          {!!isDragNDrop && (
            <TableCell
              className="CustomTable__Cell__DraggingIndicator"
              align="center"
            ></TableCell>
          )}
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              id="CustomTable__Checkbox__SelectAll"
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

  const onDragEnd = ({ draggableId, source, destination }) => {
    const newTableRows = ReorderItems(
      rowsData,
      source.index,
      destination.index
    );

    onDragNDrop(newTableRows);
    setChanged(true);
  };

  if (!!isLoading) {
    return <TableLoading />;
  }

  return (
    <React.Fragment>
      <EnhancedTableToolbar
        title={title}
        subtitle={subtitle}
        numSelected={selected.idsSelected.length}
        massiveActions={massiveActions}
        massiveActionOnSelect={massiveActionOnSelect}
        onDragNDropConfirm={onDragNDropConfirm}
        onDragNDropCancel={onDragNDropCancel}
        hasChanged={changed}
        selectedOptions={selected}
        massiveActionOnSelectClick={massiveActionOnSelectClick}
      />
      <TableContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Table aria-labelledby="tableTitle" aria-label="enhanced table">
            <EnhancedTableHead
              numSelected={selected.idsSelected.length}
              onSelectAllClick={(e) => handleSelectAllClick(e, rowsData)}
              rowCount={rowsData.length}
            />
            <Droppable droppableId="custom-table-body-id">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {!!frontPagination
                    ? rowsData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rowsData.map((row, indexRow) => {
                        const isItemSelected = isSelected(
                          row.id ? row.id : row[Object.keys(row)[0]]
                        );
                        const labelId = `enhanced-table-checkbox-${indexRow}`;

                        return (
                          <Draggable
                            key={indexRow}
                            draggableId={indexRow.toString()}
                            index={indexRow}
                            isDragDisabled={!isDragNDrop}
                          >
                            {(provided) => {
                              return (
                                <TableRow
                                  key={`${row}${indexRow}-${Math.random()}`}
                                  innerRef={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  selected={isItemSelected}
                                >
                                  {!!isDragNDrop && (
                                    <TableCell
                                      className="CustomTable__Cell__DraggingIndicator"
                                      align="center"
                                    >
                                      <DragNDropIcon />
                                    </TableCell>
                                  )}
                                  <TableCell
                                    padding="checkbox"
                                    onClick={(event) => handleClick(event, row)}
                                  >
                                    <Checkbox
                                      checked={isItemSelected}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                    />
                                  </TableCell>
                                  {columnsData.map(
                                    ({
                                      label,
                                      valueFixed = null,
                                      translationsLabel = null,
                                    }) => {
                                      let translation = !!translationsLabel
                                        ? t(translationsLabel[`${row[label]}`])
                                        : '';
                                      return (
                                        <TableCell
                                          key={`${row[indexRow]}-${label}`}
                                          align="center"
                                        >
                                          {!valueFixed
                                            ? row[label]
                                            : valueFixed(
                                                row[label],
                                                translation
                                              )}
                                        </TableCell>
                                      );
                                    }
                                  )}
                                  {!!actionsButtons && (
                                    <TableCell align="center">
                                      <ActionComponent
                                        row={row}
                                        indexRow={indexRow}
                                      />
                                    </TableCell>
                                  )}
                                </TableRow>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </TableContainer>
      <Paginator
        onChangePage={onChangePage}
        onChangeSizePage={onChangeSizePage}
        pageNo={page}
        pageSize={rowsPerPage}
        totalPages={!!frontPagination ? rowsData.length : totalPages}
        resultsPerPage={resultsPerPage}
      />
    </React.Fragment>
  );
};

SimpleCheckableTable.propTypes = {
  actionsByRow:
    PropTypes.actionsButtons === true
      ? PropTypes.func.isRequired
      : PropTypes.func,
};

SimpleCheckableTable.defaultProps = {
  actionsByRow: () => {},
};

export default SimpleCheckableTable;
