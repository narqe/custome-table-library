import React from 'react'
import PropTypes from 'prop-types';
import './components/NewCustomeTable/CustomeTable.css';
import SimpleCheckableTable from './components/NewCustomeTable/types/SimpleCheckableTable';
import CollapsibleTable from './components/NewCustomeTable/types/CollapsibleTable';
import errors from './components/common/Errors/errors';
import CustomErrorDialog from './components/common/CustomErrorDialog';
import EmptyState from './components/common/EmptyState';
import MultiCheckableCollapsibleTable from './components/NewCustomeTable/types/MultiCheckableCollapsibleTable';
import TableLoading from './components/NewCustomeTable/helpers/TableLoading';
import SimpleTableType from './components/NewCustomeTable/types/SimpleTable';

export const CustomeTable = ({
    title,
    subtitle,
    massiveActions,
    type,
    emptyTitle,
    emptySubtitle,
    errorTitle,
    errorSubtitle,
    isLoading,
    rowsData,
    columnsData,
    error,
    statusCode,
    pageNo,
    pageSize,
    resultsPerPage,
    totalPages,
    onChangePage,
    onChangeSizePage,
    actionsByRow,
    actionsButtons,
    checkable,
    massiveActionOnSelect,
    isDragNDrop,
    onDragNDrop,
    onDragNDropCancel,
    onDragNDropConfirm,
    collapsibleComponent,
    massiveActionOnSelectClick,
    frontPagination
  }) => {

  const errorData = errors[statusCode];

  if (!!isLoading) {
    return <TableLoading />;
  }

  if (!!error) {
    return (
      <CustomErrorDialog
        open
        fullpage={false}
        header={errorData.header}
        img={errorData.svg}
        title={errorTitle}
        message={errorSubtitle}
        buttonText={errorData.buttonText}
        showDetails={errorData.showDetails}
      />
    );
  } else {
    if (!rowsData || !rowsData.length) {
      return <EmptyState title={emptyTitle} subtitle={emptySubtitle} />;
    } else {
      switch (type) {
        case 'collapsible':
          const collapsibleProps = {
            title,
            subtitle,
            emptyTitle,
            emptySubtitle,
            errorTitle,
            errorSubtitle,
            rowsData,
            columnsData,
            isLoading,
            pageNo,
            pageSize,
            totalPages,
            onChangePage,
            onChangeSizePage,
            resultsPerPage,
            actionsByRow,
            massiveActions,
            actionsButtons,
            collapsibleComponent,
          };
          return <CollapsibleTable {...collapsibleProps} />;

        case 'multi-collapsible':
          const multiCollapsibleProps = {
            title,
            subtitle,
            emptyTitle,
            emptySubtitle,
            errorTitle,
            errorSubtitle,
            rowsData,
            columnsData,
            isLoading,
            pageNo,
            pageSize,
            totalPages,
            resultsPerPage,
            onChangePage,
            onChangeSizePage,
            actionsByRow,
            massiveActions,
            actionsButtons,
            collapsibleComponent,
            massiveActionOnSelect,
            frontPagination,
            massiveActionOnSelectClick
          }
          return <MultiCheckableCollapsibleTable {...multiCollapsibleProps} />

        default:
          const simpleProps = {
            title,
            subtitle,
            emptyTitle,
            emptySubtitle,
            errorTitle,
            errorSubtitle,
            rowsData,
            columnsData,
            isLoading,
            pageNo,
            pageSize,
            totalPages,
            onChangePage,
            onChangeSizePage,
            resultsPerPage,
            actionsByRow,
            massiveActions,
            actionsButtons,
            massiveActionOnSelect,
            isDragNDrop,
            onDragNDrop,
            onDragNDropCancel,
            onDragNDropConfirm,
            massiveActionOnSelectClick
          };
          return !!checkable ? (
            <SimpleCheckableTable {...simpleProps} />
          ) : (
            <SimpleTableType {...simpleProps} />
          );
      }
    }
  }
};

CustomeTable.propTypes = {
  type: PropTypes.string.isRequired,
  emptyTitle: PropTypes.string.isRequired,
  emptySubtitle: PropTypes.string,
  errorTitle: PropTypes.string.isRequired,
  errorSubtitle: PropTypes.string,
  rowsData: PropTypes.arrayOf(PropTypes.object),
  columnsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  statusCode:
    PropTypes.error === true ? PropTypes.number.isRequired : PropTypes.number,
  pageNo: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  frontPagination: PropTypes.bool,
  resultsPerPage: PropTypes.arrayOf(PropTypes.number),
  massiveActions: PropTypes.arrayOf(PropTypes.object),
  massiveActionOnSelect: PropTypes.arrayOf(PropTypes.object),
  actionsByRow:
    PropTypes.actionsButtons === true
      ? PropTypes.func.isRequired
      : PropTypes.func,
  isDragNDrop: PropTypes.bool,
  onDragNDrop:
    PropTypes.isDragNDrop === true ? PropTypes.func.isRequired : PropTypes.func,
  onDragNDropCancel:
    PropTypes.isDragNDrop === true ? PropTypes.func.isRequired : PropTypes.func,
  onDragNDropConfirm:
    PropTypes.isDragNDrop === true ? PropTypes.func.isRequired : PropTypes.func,
  collapsibleComponent: PropTypes.func,
  massiveActionOnSelectClick: PropTypes.func,
};

CustomeTable.defaultProps = {
  emptyTitle: 'Title for Empty State',
  emptySubtitle: 'Subtitle for Empty State',
  errorTitle: 'Title for Error',
  errorSubtitle: 'Subitle for Error',
  type: 'simple',
  statusCode: 404,
  error: false,
  isLoading: false,
  pageNo: 0,
  pageSize: 10,
  totalPages: 0,
  resultsPerPage: [10, 25, 100],
  frontPagination: false,
  collapsibleComponent: () => {},
  columnsData: [{}]
};