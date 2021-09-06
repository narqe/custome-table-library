import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import '../../../translations/i18n';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ReorderItems from '../helpers/ReorderItems';
import DragNDropIcon from '@material-ui/icons/DragIndicator';
import EnhancedTableToolbar from '../helpers/EnhancedTableToolbar';
import Paginator from '../helpers/Paginator';
import TableLoading from '../helpers/TableLoading';

const SimpleTableType = ({
  title,
  subtitle,
  massiveActions,
  rowsData,
  columnsData,
  pageNo,
  pageSize,
  isLoading,
  resultsPerPage,
  frontPagination,
  onChangePage,
  onChangeSizePage,
  totalPages,
  actionsButtons,
  actionsByRow: ActionComponent,
  isDragNDrop,
  onDragNDrop = () => {},
  onDragNDropCancel = () => {},
  onDragNDropConfirm = () => {},
}) => {
  const { t } = useTranslation();
  const [changed, setChanged] = useState(false);

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
      <TableContainer>
        <EnhancedTableToolbar
          title={title}
          subtitle={subtitle}
          massiveActions={massiveActions}
          onDragNDropConfirm={onDragNDropConfirm}
          onDragNDropCancel={onDragNDropCancel}
          hasChanged={changed}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Table>
            <TableHead>
              <TableRow>
                {!!isDragNDrop && (
                  <TableCell
                    className="CustomTable__Cell__DraggingIndicator"
                    align="center"
                  ></TableCell>
                )}
                {columnsData.map(({ headerName }, indexCol) => (
                  <TableCell key={`header-${indexCol}`}>
                    {t(headerName)}
                  </TableCell>
                ))}
                {!!actionsButtons && (
                  <TableCell align="center">{t('actionsLabel')}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <Droppable droppableId="custom-table-body-id">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {!!frontPagination
                    ? rowsData.slice(
                        pageNo * pageSize,
                        pageNo * pageSize + pageSize
                      )
                    : rowsData.map((row, indexRow) => (
                        <Draggable
                          key={`${row}${indexRow}-row`}
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
                              >
                                {!!isDragNDrop && (
                                  <TableCell
                                    className="CustomTable__Cell__DraggingIndicator"
                                    align="center"
                                  >
                                    <DragNDropIcon />
                                  </TableCell>
                                )}
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
                                          : valueFixed(row[label], translation)}
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
                      ))}
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
        pageNo={pageNo}
        pageSize={pageSize}
        totalPages={totalPages}
        resultsPerPage={resultsPerPage}
      />
    </React.Fragment>
  );
};

SimpleTableType.propTypes = {
  actionsByRow:
    PropTypes.actionsButtons === true
      ? PropTypes.func.isRequired
      : PropTypes.func,
};

SimpleTableType.defaultProps = {
  actionsByRow: () => {},
};

export default SimpleTableType;
