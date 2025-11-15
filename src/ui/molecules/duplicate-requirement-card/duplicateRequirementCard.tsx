import { Button, Card, message, Space, Typography } from "antd";
import {Requirement, useRequirementsStore} from "@/stores/requirementsStore";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface DuplicateRequirementCardProps {
  projectId: number;
  requirementA: Requirement
  requirementB: Requirement
}

export const DuplicateRequirementCard: React.FC<
  DuplicateRequirementCardProps
> = ({ projectId, requirementA, requirementB }) => {
  const { width } = useWindowDimensions();
  const { deleteRequirement, loading, findDuplicates } = useRequirementsStore();

  const handleDelete = async (requirementId: number) => {
    try {
      message.loading({ content: "Deleting requirement...", key: "delete" });
      await deleteRequirement(projectId, requirementId);
      message.success({
        content: "Requirement deleted successfully",
        key: "delete",
        duration: 2,
      });
      findDuplicates(projectId);
    } catch (error) {
      message.error("Failed to delete requirement");
    }
  };

  return (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 4,
        border: "1px solid #f0f0f0",
        boxShadow: "0 2px 3px #f0f0f0",
      }}
    >
      <Space
        direction={width < 768 ? "vertical" : "horizontal"}
        size="middle"
        style={{ width: "100%" }}
      >
        <div style={{ flex: 1 }}>
          <Typography.Text strong>Title:</Typography.Text>
          <Typography.Paragraph>{requirementA.title}</Typography.Paragraph>
          <Typography.Text strong>Description:</Typography.Text>
          <Typography.Paragraph>{requirementA.text}</Typography.Paragraph>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(requirementA.id)}
            loading={loading}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <Typography.Text strong>Title:</Typography.Text>
          <Typography.Paragraph>{requirementB.title}</Typography.Paragraph>
          <Typography.Text strong>Description:</Typography.Text>
          <Typography.Paragraph>{requirementB.text}</Typography.Paragraph>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(requirementB.id)}
            loading={loading}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </Space>
    </Card>
  );
};
