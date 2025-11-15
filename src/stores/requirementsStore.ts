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
  priority: string;
  ambiguous: boolean;
  req_class: string;
  req_subclass: string;
}

export interface Ambiguity {
  reason: string;
  suggestions: string[];
  requirement: Requirement;
}

export interface RequirementsState {
  requirements: Requirement[];
  duplicates: DuplicateRequirementPair[];
  inconsistencies: DuplicateRequirementPair[];
  ambiguities: Ambiguity[];
  loading: boolean;
  error: string | null;
  fetchRequirements: (projectId: number) => Promise<void>;
  parsePdf: (projectId: number, file: File) => Promise<boolean>;
  addRequirement: (
    projectId: number,
    title: string,
    text: string,
    priority: string,
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
  findInconsistencies: (projectId: number) => Promise<void>;
  findAmbiguities: (projectId: number) => Promise<void>;
  updateRequirementPriority: (
    projectId: number,
    requirementId: number,
    priority: string,
  ) => Promise<void>;
  updateRequirementClass: (
    projectId: number,
    requirementId: number,
    reqClass: string,
    reqSubclass: string,
  ) => Promise<void>;
}

export const useRequirementsStore = create(
  persist<RequirementsState>(
    (set, get) => ({
      requirements: [],
      duplicates: [],
      inconsistencies: [],
      ambiguities: [],
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
          const ambiguity = get().ambiguities.find(
            (ambiguity) => ambiguity.requirement.id === requirementId,
          );
          if (ambiguity) {
            set({
              ambiguities: [
                ...get().ambiguities.filter(
                  (ambiguity) => ambiguity.requirement.id !== requirementId,
                ),
                {
                  ...ambiguity,
                  requirement: {
                    ...ambiguity.requirement,
                    title,
                    text,
                  },
                },
              ].sort(
                (a, b) =>
                  new Date(b.requirement.created_at).getTime() -
                  new Date(a.requirement.created_at).getTime(),
              ),
            });
          }
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
      addRequirement: async (projectId, title, text, priority) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.post(
            `/projects/${projectId}/requirements`,
            { title, text, priority },
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
      findInconsistencies: async (projectId) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get<DuplicateRequirementPair[]>(
            `/projects/${projectId}/requirements/inconsistencies`,
          );
          set({ inconsistencies: response.data });
        } catch (error) {
          set({ error: "Failed to find duplicates" });
        } finally {
          set({ loading: false });
        }
      },
      findAmbiguities: async (projectId) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get<Ambiguity[]>(
            `/projects/${projectId}/requirements/ambiguities`,
          );
          set({
            ambiguities: response.data.sort(
              (a, b) =>
                new Date(b.requirement.created_at).getTime() -
                new Date(a.requirement.created_at).getTime(),
            ),
          });
        } catch (error) {
          set({ error: "Failed to find ambiguities" });
        } finally {
          set({ loading: false });
        }
      },
      updateRequirementPriority: async (projectId, requirementId, priority) => {
        set({ loading: true, error: null });
        try {
          await axiosClient.put(
            `/projects/${projectId}/requirements/${requirementId}/priority`,
            { priority },
          );
          set({
            requirements: get().requirements.map((req) =>
              req.id === requirementId ? { ...req, priority } : req,
            ),
          });
          message.success("Requirement priority updated successfully");
        } catch (error) {
          set({ error: "Failed to update requirement priority" });
        } finally {
          set({ loading: false });
        }
      },
      updateRequirementClass: async (
        projectId,
        requirementId,
        reqClass,
        reqSubclass,
      ) => {
        set({ loading: true, error: null });
        try {
          await axiosClient.put(
            `/projects/${projectId}/requirements/${requirementId}/class`,
            {
              class: reqClass,
              subclass: reqSubclass,
            },
          );
          const updatedRequirement = {
            ...get().requirements.find((req) => req.id === requirementId),
            req_class: reqClass,
            req_subclass: reqSubclass,
          } as Requirement;
          set({
            requirements: get().requirements.map((req) =>
              req.id === requirementId ? updatedRequirement : req,
            ),
          });
          message.success("Requirement class updated successfully");
        } catch (error) {
          set({ error: "Failed to update requirement class" });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "requirements" },
  ),
);
