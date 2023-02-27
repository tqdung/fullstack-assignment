import { memo, useContext, useState } from "react";
import { Button, Modal } from "antd";

import { CafeModel } from "@models/cafe.model";

import { CafeTableContext } from "@src/context/cafe.context";
import { UpdateCafeForm } from "../UpdateCafeForm";

const CreateNewCafeButton = () => {
    const context = useContext(CafeTableContext);
    const [cafeData, setCafeData] = useState<CafeModel | null>(null);
    const toggle = () => setCafeData(prev => prev ? null : new CafeModel());

    const handleSubmit = (cafe: CafeModel) => {
        try {
            context.create(cafe);
            setCafeData(null);
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <Button type='primary' style={{ marginBottom: "8px" }} onClick={toggle}>Create new Cafe</Button>
        <Modal open={!!cafeData} title="Create Employee" closable={false} footer={null}>
            <UpdateCafeForm
                cafe={cafeData as CafeModel}
                onSubmit={handleSubmit}
                onCancel={toggle}
            />
        </Modal>
    </>
}

export default memo(CreateNewCafeButton);