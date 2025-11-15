"use client";
import { Alert, Button, Flex, Form, Input, Typography } from "antd";
import React from "react";
import styles from "./ProjectForm.module.scss";
import { Project } from "@/stores/projectStore";

export type ProjectFormData = {
  name: string;
  description: string;
};

interface ProjectFormProps {
  onSubmit: (values: ProjectFormData) => void;
  error: string | null;
  loading: boolean;
  project?: Project;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  loading,
  onSubmit,
  error,
  project,
}) => {
  return (
    <Flex vertical className={styles.wrapper}>
      <Typography.Title level={2}>Create a new project</Typography.Title>
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      <Form<ProjectFormData>
        className={styles.form}
        layout={"vertical"}
        onFinish={onSubmit}
        disabled={loading}
        initialValues={
          project
            ? {
                name: project.name,
                description: project.description,
              }
            : undefined
        }
      >
        <Form.Item<ProjectFormData>
          name={"name"}
          label={"Project name"}
          rules={[
            {
              required: true,
              message: "Please input project name",
            },
          ]}
        >
          <Input placeholder={"Project name"} />
        </Form.Item>
        <Form.Item<ProjectFormData>
          name={"description"}
          label={"Project description"}
          rules={[
            {
              required: true,
              message: "Please input project description",
            },
          ]}
        >
          <Input.TextArea placeholder={"Project description"} cols={3} />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
