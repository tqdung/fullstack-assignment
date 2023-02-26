import { memo } from "react";
import { Button, Form, Input, Radio, Space, Select } from 'antd';

import { EmployeeModel, GenderEnum } from "@models/employee.model";

import { useCafe } from "@pages/Cafe/hook";

import { LodashUtils } from "@utils/lodash";

interface IProps {
    employee: EmployeeModel;
    onSubmit: (updated: EmployeeModel) => void;
    onCancel: () => void;
}
function UpdateEmployeeForm({ employee, onSubmit, onCancel }: IProps) {
    const [form] = Form.useForm();
    const { cafeList } = useCafe();

    const handleSubmit = (values) => {
        const selectedCafe = cafeList.find(cafe => cafe.id === values.cafe_id);
        onSubmit(new EmployeeModel({ ...employee, ...values, cafe: LodashUtils.get(selectedCafe, 'name', '') }))
    };
    const fieldsError = LodashUtils.filter(form.getFieldsError(), o => !LodashUtils.isEmpty(o.errors));
    const isFormValid = LodashUtils.isEmpty(fieldsError);

    return (
        <Form
            data-testid="form-update-employee"
            initialValues={employee}
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={handleSubmit}
        >
            <Form.Item
                required
                label="Employee Name"
                name="name"
                rules={[{ required: true, message: 'Field can not be empty!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                required
                label="Email Address"
                name="email_address"
                rules={[{ required: true, message: 'Field can not be empty!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                required
                label="Phone Number"
                name="phone_number"
                rules={[{ required: true, message: 'Field can not be empty!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                required
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Field can not be empty!' }]}
            >
                <Radio.Group>
                    <Radio.Button value={GenderEnum.Male}>Male</Radio.Button>
                    <Radio.Button value={GenderEnum.Female}>Female</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Cafe" name="cafe_id">
                <Select
                    showSearch
                    placeholder="Search to Select"
                    optionFilterProp="children"
                >
                    {cafeList.map(cafe => <Select.Option key={cafe.id} value={cafe.id}>{cafe.name}</Select.Option>)}
                </Select>
            </Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button htmlType="submit" type="primary" disabled={!isFormValid}>Save Changes</Button>
            </Space>
        </Form>
    );
}

export default memo(UpdateEmployeeForm);