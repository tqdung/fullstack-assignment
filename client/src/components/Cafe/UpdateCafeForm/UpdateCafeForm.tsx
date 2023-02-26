import { memo } from "react";
import { Button, Form, Input, Space } from 'antd';

import { CafeModel } from "@models/cafe.model";

import { LodashUtils } from "@utils/lodash";

interface IProps {
    cafe: CafeModel;
    onSubmit: (updated: CafeModel) => void;
    onCancel: () => void;
}
function UpdateCafeForm({ cafe, onSubmit, onCancel }: IProps) {
    const [form] = Form.useForm();

    const handleSubmit = (values) => onSubmit(new CafeModel({ ...cafe, ...values }));
    const fieldsError = LodashUtils.filter(form.getFieldsError(), o => !LodashUtils.isEmpty(o.errors));
    const isFormValid = LodashUtils.isEmpty(fieldsError);

    return (
        <Form
            data-testid="form-update-cafe"
            initialValues={cafe}
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={handleSubmit}
        >
            <Form.Item
                required
                label="Cafe Name"
                name="name"
                rules={[{ required: true, message: 'Field can not be empty!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                required
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Field can not be empty!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                required
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Field can not be empty!' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button htmlType="submit" type="primary" disabled={!isFormValid}>Save Changes</Button>
            </Space>
        </Form>
    );
}

export default memo(UpdateCafeForm);