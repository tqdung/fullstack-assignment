import { useCallback, useContext, useState } from 'react';
import { Avatar, Button, Input, Modal, Popconfirm, Space, Typography } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

import { UpdateCafeForm, CreateNewCafe } from '@components/Cafe';

import { useCafe } from '@hooks/useCafe';

import { LodashUtils } from '@utils/lodash';
import { CafeTableContext } from '@src/context/cafe.context';

import './cafe.css';

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

const CafeName = (props) => {
  const { data: cafe } = props;

  return (
    <div>
      <Avatar size={64} src={cafe.logo} alt={cafe.name} />
      <Typography.Text style={{ margin: "0 0 0 5px" }}>{cafe.name}</Typography.Text>
    </div>
  );
};

export default function CafePage() {
  const hook = useCafe();

  const onSearch = useCallback((value: string) => {
    hook.fetch({ location: value });
  }, [hook]);

  return (
    <CafeTableContext.Provider value={hook}>
      <Space style={{ marginBottom: "8px" }}>
        <Input.Search
          style={{ width: "250px" }}
          placeholder="submit location to search"
          onSearch={onSearch}
        />
        <CreateNewCafe />
      </Space>
      <AgGridReact
        fullWidthCellRenderer
        className="ag-theme-alpine"
        rowHeight={75}
        columnDefs={[
          { field: 'name', headerName: 'Cafe Name', cellRenderer: CafeName },
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
