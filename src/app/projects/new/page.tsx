"use client";
import {
  ProjectForm,
  ProjectFormData,
} from "@/ui/molecules/project-form/projectForm";
import { useProjectStore } from "@/stores/projectStore";
import { useRouter } from "next/navigation";
import { message } from "antd";

export default function NewProjectPage() {
  const { error, loading, addProject } = useProjectStore();
  const router = useRouter();

  const onSubmit = async (values: ProjectFormData) => {
    await addProject(values.name, values.description);
    router.push("/");
    message.success("Project added successfully");
  };

  return <ProjectForm onSubmit={onSubmit} error={error} loading={loading} />;
}
