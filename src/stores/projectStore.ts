import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosClient } from "@/data/axiosClient";

export interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
  number_of_requirements: number;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProject: (projectId: number) => Promise<void>;
  addProject: (name: string, description: string) => Promise<void>;
  updateProject: (
    projectId: number,
    name: string,
    description: string,
    callback?: () => void,
  ) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
}

export const useProjectStore = create(
  persist<ProjectState>(
    (set, get) => ({
      projects: [],
      loading: false,
      error: null,
      fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get("/projects");
          set({ projects: response.data });
        } catch (error) {
          set({ error: "Failed to fetch projects" });
        } finally {
          set({ loading: false });
        }
      },
      fetchProject: async (projectId) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get(`/projects/${projectId}`);
          set({
            projects: get().projects.map((p) =>
              p.id === projectId ? response.data : p,
            ),
          });
        } catch (error) {
          set({ error: "Failed to fetch project" });
        } finally {
          set({ loading: false });
        }
      },
      addProject: async (name, description) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.post("/projects", {
            name,
            description,
          });
          const newProject: Project = {
            ...response.data,
            created_at: "",
            number_of_requirements: 0,
          }; // Placeholder values for created_at and number_of_requirements
          set({ projects: [...get().projects, newProject] });
        } catch (error) {
          set({ error: "Failed to add project" });
        } finally {
          set({ loading: false });
        }
      },
      updateProject: async (projectId, name, description, callback) => {
        set({ loading: true, error: null });
        try {
          await axiosClient.put(`/projects/${projectId}`, {
            name,
            description,
          });
          const updatedProject: Project = {
            id: projectId,
            name,
            description,
            created_at: "",
            number_of_requirements: 0,
          }; // Placeholder values for created_at and number_of_requirements
          set({
            projects: get().projects.map((p) =>
              p.id === projectId ? updatedProject : p,
            ),
          });
          if (callback) {
            callback();
          }
        } catch (error) {
          set({ error: "Failed to update project" });
        } finally {
          set({ loading: false });
        }
      },
      deleteProject: async (projectId) => {
        set({ loading: true, error: null });
        try {
          await axiosClient.delete(`/projects/${projectId}`);
          set({ projects: get().projects.filter((p) => p.id !== projectId) });
        } catch (error) {
          set({ error: "Failed to delete project" });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "projects",
    },
  ),
);
