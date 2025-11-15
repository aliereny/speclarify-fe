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
import styles from "./RemoveInconsistenciesPage.module.scss";
import { useIsClient } from "@/hooks/useIsClient";
import { useRequirementsStore } from "@/stores/requirementsStore";
import { CheckOutlined } from "@ant-design/icons";
import { DuplicateRequirementCard } from "@/ui/molecules/duplicate-requirement-card/duplicateRequirementCard";

export default function RemoveInconsistenciesPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const { error, loading, inconsistencies, findInconsistencies } =
    useRequirementsStore();
  const isClient = useIsClient();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    findInconsistencies(parseInt(projectId));
  }, []);

  if (!isClient) {
    return <Skeleton active />;
  }

  return (
    <Flex vertical className={styles.wrapper} gap={16}>
      <Typography.Title level={3}>Remove inconsistencies</Typography.Title>
      <Typography.Text>
        Identify and remove any inconsistent requirements to maintain a concise
        specification.
      </Typography.Text>
      {error && <Alert message={error} type={"error"} showIcon />}
      {!loading && inconsistencies.length === 0 && (
        <Empty description={"No inconsistencies found."} />
      )}
      {loading && <Skeleton active />}
      {!loading &&
        inconsistencies
          .slice((page - 1) * 5, page * 5)
          .map(({ either, other }) => (
            <DuplicateRequirementCard
              key={`${either.id}-${other.id}`}
              projectId={parseInt(projectId)}
              requirementA={either}
              requirementB={other}
            />
          ))}
      <Pagination
        style={{ alignSelf: "center", width: "auto" }}
        current={page}
        onChange={setPage}
        total={inconsistencies.length}
        pageSize={5}
      />
      <Button
        type="primary"
        href={`/projects/${projectId}/fix-ambiguities`}
        icon={<CheckOutlined />}
      >
        Confirm
      </Button>
    </Flex>
  );
}
