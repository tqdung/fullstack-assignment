import { createContext, useContext, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal, Popconfirm, Space } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

import { UpdateEmployeeForm } from '@components/Employee';

import { useEmployee } from "./hook";
import { LodashUtils } from '@utils/lodash';

const EmployeeTableContext = createContext<ReturnType<typeof useEmployee>>({} as ReturnType<typeof useEmployee>);

const TableAction = (props) => {
  const { data: employee } = props;
  const context = useContext(EmployeeTableContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <>
      <Space>
        <Button
          onClick={toggle}
          icon={<EditFilled />}
        />
        <Popconfirm
          title="Are you sure delete this employee"
          okText="Yes"
          cancelText="No"
          onConfirm={LodashUtils.wrap([employee], LodashUtils.spread(context.remove))}
        >
          <Button
            icon={<DeleteFilled />}
          />
        </Popconfirm>
      </Space>
      <Modal open={isOpen} title="Update Employee" closable={false} footer={null}>
        <UpdateEmployeeForm
          employee={employee}
          onSubmit={context.update}
          onCancel={toggle}
        />
      </Modal>
    </>
  );
}

export default function Employee() {
  const hook = useEmployee();

  return (
    <EmployeeTableContext.Provider value={hook}>
      <AgGridReact
        fullWidthCellRenderer
        className="ag-theme-alpine"
        columnDefs={[
          { field: 'name', headerName: 'Employee Name' },
          { field: 'email_address', headerName: 'Email' },
          { field: 'phone_number', headerName: 'Phone Number' },
          { field: 'gender', headerName: 'Gender' },
          { field: 'cafe', headerName: 'Working At' },
          { field: 'days_worked', headerName: 'Working days' },
          { field: 'actions', headerName: 'Actions', cellRenderer: TableAction }
        ]}
        rowData={hook.employeeList}
      />
    </EmployeeTableContext.Provider>
  );
}
