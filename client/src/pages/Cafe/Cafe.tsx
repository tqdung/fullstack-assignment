import { createContext, useContext, useState } from 'react';
import { Button, Modal, Popconfirm, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

import UpdateCafeForm from '@components/Cafe/UpdateCafeForm';

import { LodashUtils } from '@utils/lodash';

import { useCafe } from './hook';

const CafeTableContext = createContext<ReturnType<typeof useCafe>>({} as ReturnType<typeof useCafe>);


const TableAction = (props) => {
  const { data: cafe } = props;
  const context = useContext(CafeTableContext);
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
          title="Are you sure delete this cafe"
          okText="Yes"
          cancelText="No"
          onConfirm={LodashUtils.wrap([cafe], LodashUtils.spread(context.remove))}
        >
          <Button
            icon={<DeleteFilled />}
          />
        </Popconfirm>
      </Space>
      <Modal open={isOpen} title="Update Cafe" closable={false} footer={null}>
        <UpdateCafeForm
          cafe={cafe}
          onSubmit={context.update}
          onCancel={toggle}
        />
      </Modal>
    </>
  );
}

export default function CafePage() {
  const hook = useCafe();

  return (
    <CafeTableContext.Provider value={hook}>
      <AgGridReact
        fullWidthCellRenderer
        className="ag-theme-alpine"
        columnDefs={[
          { field: 'name', headerName: 'Cafe Name' },
          { field: 'location', headerName: 'Location' },
          { field: 'description', headerName: 'Description' },
          { field: 'employees', headerName: 'Employees' },
          { field: 'actions', headerName: 'Actions', cellRenderer: TableAction }
        ]}
        rowData={hook.cafeList}
      />
    </CafeTableContext.Provider>
  );
}
