# custome-table-component

> custome table for algarrobo

[![NPM](https://img.shields.io/npm/v/custome-table-component.svg)](https://www.npmjs.com/package/custome-table-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save custome-table-component
```

## Usage

```jsx
import React, { Component } from 'react'

import { CustomeTable } from 'custome-table-component'
import 'custome-table-component/dist/index.css'

class Example extends Component {
  render() {
    return (
      <>
        <h1>Example Simple Table (by Default)</h1>
        <CustomeTable 
          error={false} 
          statusCode={404} //Just determinates differents images on render (403, 404, 500)
          rowsData={[{}]} 
          columnsData={[{
            // Format 
            headerName: 'Submodalidad', //Title
            label: 'attendanceMode', //Key of rowsData loop
            valueFixed: (value) => value.name, // Transformation
          }]} 
          isLoading={false}
          type="simple" // Could be "multi-collapsible", "collapsible" o "simple" By default: simple
          checkable={false} // By default
          title='Simple Table'
          subtitle='by Default'
          emptyTitle='Empty Title'
          emptySubtitle='Empty Subtitle'
          errorTitle='Empty Title'
          errorSubtitle='Empty Subtitle'
          frontPagination={false} // By default
          pageSize={1}
          pageNo={0}
          resultsPerPage={[5,10,25]}
          totalPages={10}
          onChangePage={onPageClick}
          onChangeSizePage={onPageSizeClick}
          actionsButtons={true} //if is true should be actionsByRow
          actionsByRow={ActionsComponent} // Contains the action component and row data
          collapsibleComponent={CollapsibleComponent} // Contains the collapsible component and row data (Just works on type "multi-collapsible" and "collapsible")
          massiveActionOnSelectClick={handleClickOnSelect} // (Just works on checkable option true)
          massiveActionOnSelect={[{title: 'synchronize', description: 'synchronizeDescription', icon: <DoneIcon /> }]} //(Just works on checkable option true)
          massiveActions={[
            {
              title: 'synchronize',
              method: () => {},
              description: 'synchronizeDescription',
              icon: <DoneIcon />
            },
          ]} //This buttons could be for all types
          isDragNDrop={false} //Just work with type "simple" ,
          onDragNDropCancel={() => {}} //Just work with type "simple" with isDragNDrop=true
          onDragNDropConfirm={() => {}} //Just work with type "simple" isDragNDrop=true
        />
      </>
    )
  }

  const handleClickOnSelect = (items) => {
    let ids = items.idsSelected;
    let rows = items.rowsSelected;
  }

  const ActionsComponent = (onDelete, hasWriteAccess) => (
    props
  ) => (
    <Actions
      {...props}
      onDelete={onDelete}
      hasWriteAccess={hasWriteAccess}
    />
  );

  const CollapsibleComponent = (onDelete, hasWriteAccess) => (
    props
  ) => (
    <Collapsible
      {...props}
      onDelete={onDelete}
      hasWriteAccess={hasWriteAccess}
    />
  );
}
```

## License

MIT © [joelacef](https://github.com/joelacef)
