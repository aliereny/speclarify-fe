"use client";
import {
  ProjectForm,
  ProjectFormData,
} from "@/ui/molecules/project-form/projectForm";
import { useProjectStore } from "@/stores/projectStore";
import { useRouter } from "next/navigation";
import { message, Result } from "antd";

export default function EditProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const { error, loading, projects, updateProject } = useProjectStore();

  const project = projects.find((p) => p.id === parseInt(projectId));

  const router = useRouter();

  if (!project) {
    console.log({ projects, projectId })
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    );
  }


  const onSubmit = async (values: ProjectFormData) => {
    const result = await updateProject(project.id, values.name, values.description);
    if (!result) {
      return;
    }
    router.push("/dashboard");
    message.success("Project updated successfully");
  };

  return <ProjectForm onSubmit={onSubmit} error={error} loading={loading} project={project}/>;
}
