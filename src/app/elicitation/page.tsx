"use client";
import { Alert, Button, Empty, Flex, Form, Skeleton, Typography } from "antd";
import React, { useState } from "react";
import styles from "./ElicitationPage.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useIsClient } from "@/hooks/useIsClient";
import { FileUpload } from "@/ui/atoms/file-upload/fileUpload";
import { RcFile } from "antd/lib/upload/interface";
import { Requirement } from "@/stores/requirementsStore";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/data/axiosClient";
import { ConfirmRequirementCard } from "@/ui/molecules/confirm-requirement-card/confirmRequirementCard";

export default function ElicitationPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const isClient = useIsClient();
  const router = useRouter();

  const [requirements, setRequirements] = useState<Requirement[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isClient) {
    return <Skeleton active />;
  }

  const onFinish = async (values: { file: RcFile }) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", values.file);
      const response = await axiosClient.post<Requirement[]>(
        `/interviews`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setRequirements(response.data);
    } catch (error) {
      console.log({ error });
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      vertical
      className={styles.wrapper}
      gap={8}
      style={{
        backgroundColor: "#fff",
        padding: 32,
        borderRadius: 4,
      }}
    >
      <Typography.Title level={3}>Upload a file</Typography.Title>
      <Typography.Text>
        Upload your PDF file of customer interview and let our AI begin the
        elicitation process.
      </Typography.Text>
      {error && <Alert message={error} type={"error"} showIcon />}
      {loading && <Alert message={"Loading..."} type={"info"} showIcon />}
      {requirements === null ? (
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
            <Button
              type="primary"
              htmlType={"submit"}
              icon={<UploadOutlined />}
            >
              Start
            </Button>
          </Form.Item>
        </Form>
      ) : (
        requirements.map((requirement, index) => (
          <ConfirmRequirementCard
            key={index}
            text={requirement.text}
            title={requirement.title}
            disabled={loading}
            onSave={() => {}}
            onDelete={() => {}}
          />
        ))
      )}
      {requirements && requirements.length === 0 && (
        <Empty description={"No requirements found"} />
      )}
    </Flex>
  );
}
