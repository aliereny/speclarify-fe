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
import styles from "./RemoveDuplicatesPage.module.scss";
import { useIsClient } from "@/hooks/useIsClient";
import { Requirement, useRequirementsStore } from "@/stores/requirementsStore";
import { CheckOutlined } from "@ant-design/icons";
import { CreateRequirement } from "@/ui/organisms/create-requirement/createRequirement";
import { DuplicateRequirementCard } from "@/ui/molecules/duplicate-requirement-card/duplicateRequirementCard";

export default function RemoveDuplicatesPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const { error, loading, duplicates, findDuplicates } =
    useRequirementsStore();
  const isClient = useIsClient();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    findDuplicates(parseInt(projectId));
  }, []);

  if (!isClient) {
    return <Skeleton active />;
  }

  return (
    <Flex vertical className={styles.wrapper} gap={16}>
      <Typography.Title level={3}>Remove duplicates</Typography.Title>
      <Typography.Text>
        Identify and remove any duplicate requirements to maintain a concise
        specification.
      </Typography.Text>
      {error && <Alert message={error} type={"error"} showIcon />}
      {!loading && duplicates.length === 0 && (
        <Empty description={"No duplicates found."} />
      )}
      {loading && <Skeleton active />}
      {!loading &&
        duplicates
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
        total={duplicates.length}
        pageSize={5}
      />
      <Button
        type="primary"
        href={`/projects/${projectId}/remove-inconsistencies`}
        icon={<CheckOutlined />}
      >
        Confirm
      </Button>
    </Flex>
  );
}
