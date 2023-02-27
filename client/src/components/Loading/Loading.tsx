import { Modal, Typography, Spin } from "antd";

interface IProps {
  title: string;
  subtitle?: string;
  show: boolean;
}
export default function Loading({ title, subtitle, show }: IProps) {
  return (
    <Modal open={show} closable={false} footer={null} zIndex={9999} destroyOnClose>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography.Title level={3}>{title}</Typography.Title>
        <Typography.Paragraph>{subtitle}</Typography.Paragraph>
        <Spin size="large" />
      </div>
    </Modal>
  );
}
