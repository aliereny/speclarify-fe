import { axiosClient } from "@/data/axiosClient";

interface CreateProjectResponse {
  message: string;
  project_id: number;
}

export const createProject = async (name: string, description: string) => {
  try {
    const response = await axiosClient.post<CreateProjectResponse>(
      "/projects",
      { name, description },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating project", error);
    throw error;
  }
};

export const getProject = async (projectId: number) => {
  try {
    const response = await axiosClient.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project", error);
    throw error;
  }
};

export const getAllProjects = async () => {
  try {
    const response = await axiosClient.get("/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects", error);
    throw error;
  }
};

export const updateProject = async (
  projectId: number,
  name: string,
  description: string,
) => {
  try {
    const response = await axiosClient.put(`/projects/${projectId}`, {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project", error);
    throw error;
  }
};

export const deleteProject = async (projectId: number) => {
  try {
    const response = await axiosClient.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project", error);
    throw error;
  }
};
