"use client";
import { useProjectStore } from "@/stores/projectStore";
import {
  Alert,
  Button,
  Flex,
  Form,
  message,
  Result,
  Skeleton,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import styles from "./UploadPage.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useIsClient } from "@/hooks/useIsClient";
import { FileUpload } from "@/ui/atoms/file-upload/fileUpload";
import { RcFile } from "antd/lib/upload/interface";
import { useRequirementsStore } from "@/stores/requirementsStore";
import { useRouter } from "next/navigation";

export default function UploadPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const { projects, fetchProjects } = useProjectStore();
  const { loading, parsePdf, error } = useRequirementsStore();
  const project = projects.find((p) => p.id === parseInt(projectId));
  const isClient = useIsClient();
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  if (!isClient) {
    return <Skeleton active />;
  }

  if (!project) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    );
  }
  const onFinish = async (values: { file: RcFile }) => {
    console.log({ values });
    const success = await parsePdf(project.id, values.file);
    if (success) {
      message.success("File uploaded successfully");
      router.push(`/projects/${project.id}/review`);
    }
  };

  return (
    <Flex vertical className={styles.wrapper} gap={8}>
      <Typography.Title level={3}>Upload a file</Typography.Title>
      <Typography.Text>
        Upload your SRS document and let our AI begin the extraction process.
      </Typography.Text>
      {error && <Alert message={error} type={"error"} showIcon />}
      <Form disabled={loading} onFinish={onFinish} layout={"vertical"}>
        <Form.Item
          name={"file"}
          label={"File"}
          rules={[
            {
              required: true,
              message: "Please upload a file",
            },
          ]}
        >
          <FileUpload />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType={"submit"} icon={<UploadOutlined />}>
            Start
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
