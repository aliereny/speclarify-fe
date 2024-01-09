import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosClient } from "@/data/axiosClient";
import { message } from "antd";

export interface DuplicateRequirementPair {
  either: Requirement;
  other: Requirement;
}

export interface Requirement {
  id: number;
  title: string;
  text: string;
  created_at: string;
}

export interface RequirementsState {
  requirements: Requirement[];
  duplicates: DuplicateRequirementPair[];
  loading: boolean;
  error: string | null;
  fetchRequirements: (projectId: number) => Promise<void>;
  parsePdf: (projectId: number, file: File) => Promise<boolean>;
  addRequirement: (
    projectId: number,
    title: string,
    text: string,
  ) => Promise<void>;
  updateRequirement: (
    projectId: number,
    requirementId: number,
    title: string,
    text: string,
  ) => Promise<void>;
  deleteRequirement: (
    projectId: number,
    requirementId: number,
  ) => Promise<void>;
  findDuplicates: (projectId: number) => Promise<void>;
}

export const useRequirementsStore = create(
  persist<RequirementsState>(
    (set, get) => ({
      requirements: [],
      duplicates: [],
      loading: false,
      error: null,
      fetchRequirements: async (projectId: number) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get<Requirement[]>(
            `/projects/${projectId}/requirements`,
          );
          set({
            requirements: response.data.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            ),
          });
        } catch (error) {
          set({ error: "Failed to fetch requirements" });
        } finally {
          set({ loading: false });
        }
      },
      parsePdf: async (projectId: number, file: File) => {
        set({ loading: true, error: null });
        try {
          const formData = new FormData();
          formData.append("file", file);
          await axiosClient.post(`/projects/${projectId}/parse-pdf`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          await get().fetchRequirements(projectId);
          return true;
        } catch (error) {
          set({ error: "Failed to parse PDF" });
          return false;
        } finally {
          set({ loading: false });
        }
      },
      updateRequirement: async (
        projectId: number,
        requirementId: number,
        title: string,
        text: string,
      ) => {
        set({ loading: true, error: null });
        try {
          await axiosClient.put(
            `/projects/${projectId}/requirements/${requirementId}`,
            { title, text },
          );
          message.success("Requirement updated successfully");
          await get().fetchRequirements(projectId);
        } catch (error) {
          set({ error: "Failed to update requirement" });
        } finally {
          set({ loading: false });
        }
      },
      deleteRequirement: async (projectId: number, requirementId: number) => {
        set({ loading: true, error: null });
        try {
          await axiosClient.delete(
            `/projects/${projectId}/requirements/${requirementId}`,
          );
          set({
            requirements: get().requirements.filter(
              (req) => req.id !== requirementId,
            ),
          });
          message.success("Requirement deleted successfully");
        } catch (error) {
          set({ error: "Failed to delete requirement" });
        } finally {
          set({ loading: false });
        }
      },
      addRequirement: async (projectId, title, text) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.post(
            `/projects/${projectId}/requirements`,
            { title, text },
          );
          set({
            requirements: [...get().requirements, response.data].sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            ),
          });
        } catch (error) {
          set({ error: "Failed to add requirement" });
        } finally {
          set({ loading: false });
        }
      },
      findDuplicates: async (projectId) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get<DuplicateRequirementPair[]>(
            `/projects/${projectId}/requirements/duplicates`,
          );
          set({ duplicates: response.data });
        } catch (error) {
          set({ error: "Failed to find duplicates" });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "requirements" },
  ),
);