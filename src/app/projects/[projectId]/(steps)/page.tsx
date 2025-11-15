"use client";
import React from "react";
import { Button, Flex, Result, Skeleton, Space, Typography } from "antd";
import { useProjectStore } from "@/stores/projectStore";
import styles from "./ProjectPage.module.scss";
import { SendOutlined } from "@ant-design/icons";
import { useIsClient } from "@/hooks/useIsClient";

export default function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const { loading, projects } = useProjectStore();
  const project = projects.find((p) => p.id === parseInt(projectId));
  const isClient = useIsClient();

  if (loading || !isClient) {
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

  return (
    <Flex vertical className={styles.wrapper} gap={8}>
      <Typography.Title level={3}>
        Ready to refine your requirements?
      </Typography.Title>
      <Typography.Title level={5}>
        Follow the steps to transform your SRS document into a structured set of
        requirements.
      </Typography.Title>
      <Typography.Paragraph>
        You are about to start the requirement processing workflow for your
        chosen project. This streamlined process will guide you through
        uploading your document, reviewing and refining requirements, and
        setting the foundation for a robust system model.
      </Typography.Paragraph>
      <Space>
        <Typography.Text strong>Project name:</Typography.Text>
        <Typography.Text>{project.name}</Typography.Text>
      </Space>
      <Space>
        <Typography.Text strong>Project description:</Typography.Text>
        <Typography.Text>{project.description}</Typography.Text>
      </Space>
      <Button
        type="primary"
        href={`/projects/${project.id}/upload`}
        icon={<SendOutlined />}
      >
        Start
      </Button>
    </Flex>
  );
}
