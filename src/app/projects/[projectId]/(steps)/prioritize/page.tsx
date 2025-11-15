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
import styles from "./PrioritizePage.module.scss";
import { useIsClient } from "@/hooks/useIsClient";
import { useRequirementsStore } from "@/stores/requirementsStore";
import { CheckOutlined } from "@ant-design/icons";
import { PrioritizeRequirementCard } from "@/ui/molecules/prioritize-requirement-card/prioritizeRequirementCard";

export default function PrioritizePage({
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
      <Typography.Title level={3}>Prioritize</Typography.Title>
      <Typography.Text>
        Prioritize each requirement into a priority level.
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
            <PrioritizeRequirementCard
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
        href={`/projects/${projectId}/classify`}
        icon={<CheckOutlined />}
      >
        Confirm
      </Button>
    </Flex>
  );
}
