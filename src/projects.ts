import { Select } from "https://deno.land/x/cliffy/prompt/select.ts";
import { getResources } from "./api.ts";
import { Project } from "./types.ts";

const getProjects = async (): Promise<Project[]> => {
  return await getResources("/v2/projects") as Project[];
};

export const selectProject = async (): Promise<string> => {
  const projects = await getProjects();
  const mappedProjects = projects.map((project) => {
    return { name: project.name, value: project.id };
  });

  const projectId = await Select.prompt({
    message: "Please select a project:",
    options: mappedProjects,
  });

  return projectId;
};
