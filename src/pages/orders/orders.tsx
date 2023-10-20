import React from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow
} from 'devextreme-react/data-grid';

export default function Order() {
  return (
    <React.Fragment>
      <h2 className={'content-block'}>Siparişler</h2>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={dataSource as any}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField={'Order_ID'} width={90} hidingPriority={2} />
        <Column
          dataField={'Order_Invoice_Number'}
          width={190}
          caption={'Invoice Number'}
          hidingPriority={8}
        />
        <Column
          dataField={'Employee.Employee_First_Name'}
          caption={'Employee First Name'}
          hidingPriority={6}
        />
        <Column
          dataField={'Order_Date'}
          caption={'Order Date'}
          dataType={'date'}
          hidingPriority={3}
        />
        <Column
          dataField={'Order_Ship_Date'}
          caption={'Ship Date'}
          dataType={'date'}
          hidingPriority={4}
        />
        <Column
          dataField={'Order_Comments'}
          caption={'Comment'}
          name={'Comment'}
          hidingPriority={1}
        />
      </DataGrid>
    </React.Fragment>
)}

const dataSource = {
  store: {
    type: 'odata',
    key: 'Order_ID',

    url: 'https://js.devexpress.com/Demos/DevAV/odata/Orders'
  },
  expand: 'Employee',
  select: [
    'Order_ID',
    'Order_Invoice_Number',
    'Order_Customer_ID',
    'Order_Customer_Location_ID',
    'Order_PO_Number',
    'Order_Employee_ID',
    'Employee/Employee_First_Name',
    'Order_Date',
    'Order_Sale_Amount',
    'Order_Shipping_Amount',
    'Order_Total_Amount',
    'Order_Ship_Date',
    'Order_Ship_Method',
    'Order_Terms',
    'Order_Comments'
  ]
};
