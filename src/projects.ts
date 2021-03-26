import { Select } from "https://deno.land/x/cliffy/prompt/select.ts";
import { getResources } from "./api.ts";
import { Branch, Project } from "./types.ts";

const getProjects = async (): Promise<Project[]> => {
  return await getResources("/v2/projects") as Project[];
};

const getBranches = async (projectId: string): Promise<Branch[]> => {
  return await getResources(`/v2/projects/${projectId}/branches`) as Branch[];
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

export const selectBranch = async (projectId: string): Promise<string> => {
  const branches = await getBranches(projectId);
  const mappedBranches = branches
    .filter((branch) => branch.state === "success")
    .map((branch) => {
      return {
        name: `${branch.name} (created by: ${branch.created_by.name})`,
        value: branch.name,
      };
    });

  mappedBranches.unshift({ name: "Main", value: 'main' });

  const branchId = await Select.prompt({
    message: "Please select a branch:",
    options: mappedBranches,
  });

  return branchId;
};
