"use client";

import React, { useEffect } from "react";
import { useProjectStore } from "@/stores/projectStore";
import { Alert, Button, Flex, Skeleton, Typography } from "antd";
import { useIsClient } from "@/hooks/useIsClient";
import styles from "./DashboardPage.module.scss";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/ui/molecules/project-card/projectCard";
import { PlusOutlined } from "@ant-design/icons";

export default function DashboardPage() {
  const { loading, error, projects, fetchProjects } = useProjectStore();

  const router = useRouter();
  const isClient = useIsClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  if (!isClient || loading) {
    return <Skeleton active />;
  }

  return (
    <Flex vertical className={styles.projectsPage} gap={16}>
      <Typography.Title level={2}>Projects</Typography.Title>
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      <Button
        type="primary"
        href={"/projects/new"}
        icon={<PlusOutlined />}
        className={styles.addProjectButton}
      >
        Add Project
      </Button>
      <Flex wrap={"wrap"} gap={16}>
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </Flex>
    </Flex>
  );
}
