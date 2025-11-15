import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { useRequirementsStore } from "@/stores/requirementsStore";
import { PlusOutlined } from "@ant-design/icons";
import {Option} from "rc-select";

interface CreateRequirementProps {
  projectId: number;
}

export const CreateRequirement: React.FC<CreateRequirementProps> = ({
  projectId,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { addRequirement, loading } = useRequirementsStore();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await addRequirement(projectId, values.title, values.text, values.priority);
      message.success("Requirement added successfully");
      form.resetFields();
      setIsModalVisible(false);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Add Requirement
      </Button>
      <Modal
        title="Add New Requirement"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" name="addRequirementForm">
          <Form.Item
            name="title"
            label="Requirement Title"
            rules={[
              {
                required: true,
                message: "Please input the requirement title!",
              },
            ]}
          >
            <Input placeholder="Enter title for the requirement" />
          </Form.Item>
          <Form.Item
            name="text"
            label="Requirement Description"
            rules={[
              {
                required: true,
                message: "Please input the requirement description!",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter detailed description for the requirement" />
          </Form.Item>
          <Form.Item
            name={"priority"}
            label={"Priority"}
            rules={[
              {
                required: true,
                message: "Please input the requirement priority!",
              },
            ]}
          >
            <Select style={{ width: 120 }}>
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
