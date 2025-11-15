"use client";
import { Button, Flex, Typography } from "antd";
import React from "react";
import styles from "./ExportPage.module.scss";
import { DownloadOutlined } from "@ant-design/icons";

export default function ExportPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;

  const apiUrl = process.env.API_URL || "http://127.0.0.1:5000/api/v1";

  return (
    <Flex vertical className={styles.wrapper} gap={16}>
      <Typography.Title level={3}>Export</Typography.Title>
      <Typography.Text>
        Export your updated requirements as an Microsoft Excel file.
      </Typography.Text>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        href={`${apiUrl}/projects/${projectId}/requirements/export`}
      >
        Download File
      </Button>
    </Flex>
  );
}
