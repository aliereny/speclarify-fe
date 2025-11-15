import { Project, useProjectStore } from "@/stores/projectStore";
import {
  Button,
  Dropdown,
  Flex,
  MenuProps,
  Popconfirm,
  Typography,
} from "antd";
import { timeAgo } from "@/utils/dateUtils";
import styles from "./ProjectCard.module.scss";
import { SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();

  const onCardClick = () => router.push(`/projects/${project.id}`);
  const { deleteProject } = useProjectStore();
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
      onClick: () => router.push(`/projects/${project.id}/edit`),
    },
    {
      key: "2",
      label: (
        <Popconfirm
          title="Are you sure?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteProject(project.id)}
        >
          <Typography.Text type={"danger"}>Delete</Typography.Text>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Flex vertical className={styles.wrapper} onClick={onCardClick}>
      <Flex justify={"space-between"}>
        <Typography.Title level={4}>{project.name}</Typography.Title>
        <Dropdown
          menu={{
            items: menuItems,
            onClick: (e) => e.domEvent.stopPropagation(),
          }}
          trigger={["click"]}
        >
          <Button
            type={"primary"}
            icon={<SettingOutlined />}
            onClick={(e) => e.stopPropagation()}
          >
            Settings
          </Button>
        </Dropdown>
      </Flex>
      <Typography.Text>{project.description}</Typography.Text>
      <Typography.Text>
        {project.number_of_requirements === 0
          ? "No requirements"
          : `${project.number_of_requirements} requirements`}
      </Typography.Text>
      <Typography.Text>{timeAgo(project.created_at)}</Typography.Text>
    </Flex>
  );
};
