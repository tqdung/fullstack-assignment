import { memo, useContext, useState } from "react";
import { Button, Modal } from "antd";

import { EmployeeModel } from "@models/employee.model";
import { EmployeeTableContext } from "@src/context/employee.context";

import { UpdateEmployeeForm } from "../UpdateEmployeeForm";

const CreateNewEmployeeButton = () => {
    const context = useContext(EmployeeTableContext);
    const [employeeData, setEmployeeData] = useState<EmployeeModel | null>(null);
    const toggle = () => setEmployeeData(prev => prev ? null : new EmployeeModel());

    const handleSubmit = (employee: EmployeeModel) => {
        try {
            context.create(employee);
            setEmployeeData(null);
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <Button type='primary' onClick={toggle}>Create new Employee</Button>
        <Modal open={!!employeeData} title="Create Employee" closable={false} footer={null}>
            <UpdateEmployeeForm
                employee={employeeData as EmployeeModel}
                onSubmit={handleSubmit}
                onCancel={toggle}
            />
        </Modal>
    </>
}

export default memo(CreateNewEmployeeButton);