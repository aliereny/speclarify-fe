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
import styles from "./AmbiguityPage.module.scss";
import { useIsClient } from "@/hooks/useIsClient";
import { useRequirementsStore } from "@/stores/requirementsStore";
import { CheckOutlined } from "@ant-design/icons";
import { AmbiguousRequirementCard } from "@/ui/molecules/ambiguous-requirement-card/ambiguousRequirementCard";

export default function AmbiguityPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const { error, loading, ambiguities, findAmbiguities } =
    useRequirementsStore();
  const isClient = useIsClient();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    findAmbiguities(parseInt(projectId));
  }, []);

  if (!isClient) {
    return <Skeleton active />;
  }

  return (
    <Flex vertical className={styles.wrapper} gap={16}>
      <Typography.Title level={3}>Fix ambiguities</Typography.Title>
      <Typography.Text>
        Clarify any ambiguous requirements to ensure clear understanding.
      </Typography.Text>
      {error && <Alert message={error} type={"error"} showIcon />}
      {!loading && ambiguities.length === 0 && (
        <Empty description={"No ambiguities found."} />
      )}
      {loading && <Skeleton active />}
      {!loading &&
        ambiguities
          .slice((page - 1) * 5, page * 5)
          .map((item) => (
            <AmbiguousRequirementCard
              key={item.requirement.id}
              requirement={item.requirement}
              suggestions={item.suggestions}
              projectId={parseInt(projectId)}
            />
          ))}
      <Pagination
        style={{ alignSelf: "center", width: "auto" }}
        current={page}
        onChange={setPage}
        total={ambiguities.length}
        pageSize={5}
      />
      <Button
        type="primary"
        href={`/projects/${projectId}/prioritize`}
        icon={<CheckOutlined />}
      >
        Confirm
      </Button>
    </Flex>
  );
}
