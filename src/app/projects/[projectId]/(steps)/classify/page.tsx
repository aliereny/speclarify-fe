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
import styles from "./ClassifyPage.module.scss";
import { useIsClient } from "@/hooks/useIsClient";
import { useRequirementsStore } from "@/stores/requirementsStore";
import { CheckOutlined } from "@ant-design/icons";
import { PrioritizeRequirementCard } from "@/ui/molecules/prioritize-requirement-card/prioritizeRequirementCard";
import {ClassifyRequirementCard} from "@/ui/molecules/classify-requirement-card/classifyRequirementCard";

export default function ClassifyPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const { error, loading, requirements, fetchRequirements } =
    useRequirementsStore();
  const isClient = useIsClient();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchRequirements(parseInt(projectId));
  }, []);

  if (!isClient) {
    return <Skeleton active />;
  }

  return (
    <Flex vertical className={styles.wrapper} gap={16}>
      <Typography.Title level={3}>Classify</Typography.Title>
      <Typography.Text>
        Classify each requirement into a class and a subclass.
      </Typography.Text>
      {error && <Alert message={error} type={"error"} showIcon />}
      {!loading && requirements.length === 0 && (
        <Empty description={"No ambiguities found."} />
      )}
      {loading && <Skeleton active />}
      {!loading &&
        requirements
          .slice((page - 1) * 5, page * 5)
          .map((item) => (
            <ClassifyRequirementCard
              key={item.id}
              projectId={parseInt(projectId)}
              requirement={item}
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
        href={`/projects/${projectId}/export`}
        icon={<CheckOutlined />}
      >
        Confirm
      </Button>
    </Flex>
  );
}
