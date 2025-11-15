import React, { useState } from "react";
import { Button, Card, Select, Typography } from "antd";
import {Requirement, useRequirementsStore} from "@/stores/requirementsStore";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const { Option } = Select;

interface PrioritizeRequirementCardProps {
  projectId: number;
  requirement: Requirement;
}

export const PrioritizeRequirementCard: React.FC<
  PrioritizeRequirementCardProps
> = ({ projectId, requirement }) => {
  const [selectedPriority, setSelectedPriority] = useState<string>(
    requirement.priority,
  );
  const { width } = useWindowDimensions();
  const { updateRequirementPriority, loading } = useRequirementsStore();

  const handlePriorityChange = (value: string) => {
    setSelectedPriority(value);
  };

  const handleSavePriority = async () => {
    await updateRequirementPriority(
      projectId,
      requirement.id,
      selectedPriority,
    );
  };

  return (
    <Card
      style={{
        border: "1px solid #d9d9d9",
        padding: width < 500 ? 16 : 24,
        borderRadius: 4,
        marginBottom: 16,
      }}
    >
      <Typography.Title level={4}>{requirement.title}</Typography.Title>
      <Typography.Paragraph>{requirement.text}</Typography.Paragraph>
      <Select
        value={selectedPriority}
        style={{ width: 120 }}
        onChange={handlePriorityChange}
        disabled={loading}
      >
        <Option value="High">High</Option>
        <Option value="Medium">Medium</Option>
        <Option value="Low">Low</Option>
      </Select>
      <Button
        type="primary"
        onClick={handleSavePriority}
        disabled={loading || selectedPriority === requirement.priority}
        loading={loading}
        style={{ marginLeft: 8 }}
      >
        Save Priority
      </Button>
    </Card>
  );
};
