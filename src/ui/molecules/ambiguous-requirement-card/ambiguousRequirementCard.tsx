import React, { useState } from "react";
import { Button, Card, Input, Space, Typography } from "antd";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useRequirementsStore } from "@/stores/requirementsStore";

interface AmbiguousRequirementCardProps {
  requirement: {
    id: number;
    title: string;
    text: string;
  };
  suggestions: string[];
  projectId: number;
}

export const AmbiguousRequirementCard: React.FC<
  AmbiguousRequirementCardProps
> = ({ requirement, suggestions, projectId }) => {
  const [titleValue, setTitleValue] = useState<string>(requirement.title);
  const [textValue, setTextValue] = useState<string>(requirement.text);
  const { width } = useWindowDimensions();
  const { updateRequirement, loading } = useRequirementsStore();

  const handleSave = async () => {
    await updateRequirement(projectId, requirement.id, titleValue, textValue);
  };

  return (
    <Card
      style={{
        border: "1px solid #d9d9d9",
        padding: 16,
        borderRadius: 4,
        marginBottom: 16,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Input
          addonBefore="Title"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          disabled={loading}
        />
        <Input.TextArea
          rows={width < 500 ? 3 : 2}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          autoSize
          disabled={loading}
        />
        {suggestions.map((suggestion, index) => (
          <Typography.Text key={index} type="secondary">
            Suggestion: {suggestion}
          </Typography.Text>
        ))}
        <Button
          type="primary"
          onClick={handleSave}
          disabled={
            loading ||
            (titleValue === requirement.title && textValue === requirement.text)
          }
          loading={loading}
        >
          Save Changes
        </Button>
      </Space>
    </Card>
  );
};
