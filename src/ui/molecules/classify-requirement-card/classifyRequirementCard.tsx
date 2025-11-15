// classifyRequirementCard.tsx
import React, { useState } from 'react';
import { Button, Card, Select, Typography } from 'antd';
import { useRequirementsStore } from '@/stores/requirementsStore';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const { Option } = Select;

interface ClassifyRequirementCardProps {
    projectId: number;
    requirement: {
        id: number;
        title: string;
        text: string;
        req_class: string;
        req_subclass: string;
    };
}

export const ClassifyRequirementCard: React.FC<ClassifyRequirementCardProps> = ({
  projectId,
  requirement,
}) => {
  const [reqClass, setReqClass] = useState<string>(requirement.req_class);
  const [reqSubclass, setReqSubclass] = useState<string>(
    requirement.req_subclass,
  );
  const { width } = useWindowDimensions();
  const { updateRequirementClass, loading } = useRequirementsStore();

  const handleClassChange = (value: string) => {
    setReqClass(value);
  };

  const handleSubclassChange = (value: string) => {
    setReqSubclass(value);
  };

  const handleSaveClass = async () => {
    await updateRequirementClass(
      projectId,
      requirement.id,
      reqClass,
      reqSubclass,
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
        value={reqClass}
        style={{ width: 120 }}
        onChange={handleClassChange}
        disabled={loading}
      >
        <Option value="Functional">Functional</Option>
        <Option value="Non-functional">Non-functional</Option>
      </Select>
      <Select
        value={reqSubclass}
        style={{ width: 200, marginLeft: 8 }}
        onChange={handleSubclassChange}
        disabled={loading}
      >
        <Option value="Data Processing">Data Processing</Option>
        <Option value="User Interaction">User Interaction</Option>
        <Option value="Business Logic">Business Logic</Option>
        <Option value="Data Storage">Data Storage</Option>
        <Option value="Performance">Performance</Option>
        <Option value="Scalability">Scalability</Option>
        <Option value="Reliability">Reliability</Option>
        <Option value="Usability">Usability</Option>
        <Option value="Security">Security</Option>
        <Option value="Maintainability">Maintainability</Option>
        <Option value="Portability">Portability</Option>
      </Select>
      <Button
        type="primary"
        onClick={handleSaveClass}
        disabled={
          loading ||
          (reqClass === requirement.req_class &&
            reqSubclass === requirement.req_subclass)
        }
        loading={loading}
        style={{ marginTop: 8 }}
      >
        Save Class
      </Button>
    </Card>
  );
};
