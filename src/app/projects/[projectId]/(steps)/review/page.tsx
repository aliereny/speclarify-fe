"use client";
import {
  Alert,
  Button,
  Empty,
  Flex,
  Pagination,
  Skeleton,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./ReviewPage.module.scss";
import { useIsClient } from "@/hooks/useIsClient";
import { Requirement, useRequirementsStore } from "@/stores/requirementsStore";
import { ConfirmRequirementCard } from "@/ui/molecules/confirm-requirement-card/confirmRequirementCard";
import { CheckOutlined } from "@ant-design/icons";
import { CreateRequirement } from "@/ui/organisms/create-requirement/createRequirement";

export default function UploadPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const {
    error,
    loading,
    requirements,
    fetchRequirements,
    deleteRequirement,
    updateRequirement,
  } = useRequirementsStore();
  const isClient = useIsClient();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchRequirements(parseInt(projectId));
  }, []);

  if (!isClient) {
    return <Skeleton active />;
  }

  const handleSave = (item: Requirement) => {
    updateRequirement(parseInt(projectId), item.id, item.title, item.text);
  };

  const handleDelete = (item: Requirement) => {
    deleteRequirement(parseInt(projectId), item.id);
  };

  return (
    <Flex vertical className={styles.wrapper} gap={16}>
      <Typography.Title level={3}>Review requirements</Typography.Title>
      <Typography.Text>
        Go through the extracted requirements to ensure accuracy and
        completeness.
      </Typography.Text>
      {error && <Alert message={error} type={"error"} showIcon />}
      {!loading && requirements.length === 0 && (
        <Empty description={"No requirements found. Please upload a file."} />
      )}
      <CreateRequirement projectId={parseInt(projectId)} />
      {loading && <Skeleton active />}
      {!loading &&
        requirements
          .slice((page - 1) * 5, page * 5)
          .map((item) => (
            <ConfirmRequirementCard
              key={item.id}
              disabled={loading}
              onSave={() => handleSave(item)}
              onDelete={() => handleDelete(item)}
              title={item.title}
              text={item.text}
            />
          ))}
      <Pagination
        style={{ alignSelf: "center", width: "auto" }}
        current={page}
        onChange={setPage}
        total={requirements.length}
        pageSize={5}
      />
      <Button
        type="primary"
        href={`/projects/${projectId}/remove-duplicates`}
        icon={<CheckOutlined />}
      >
        Confirm
      </Button>
    </Flex>
  );
}
