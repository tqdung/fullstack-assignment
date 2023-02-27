import { useContext, useState } from 'react';
import { Button, Modal, Popconfirm, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

import { UpdateCafeForm, CreateNewCafe } from '@components/Cafe';

import { LodashUtils } from '@utils/lodash';
import { CafeTableContext } from '@src/context/cafe.context';

import { useCafe } from './hook';

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
      <CreateNewCafe />
      <AgGridReact
        fullWidthCellRenderer
        className="ag-theme-alpine"
        columnDefs={[
          { field: 'name', headerName: 'Cafe Name' },
          { field: 'location', headerName: 'Location' },
          { field: 'description', headerName: 'Description', minWidth: 600 },
          { field: 'employees', headerName: 'Employees' },
          { field: 'actions', headerName: 'Actions', cellRenderer: TableAction }
        ]}
        rowData={hook.cafeList}
      />
    </CafeTableContext.Provider>
  );
}
