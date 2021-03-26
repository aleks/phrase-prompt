import { selectProject } from "./projects.ts";
import { getResources, createResource } from "./api.ts";
import { Branch } from "./types.ts";
import { prompt, Input, Select, Toggle } from "https://deno.land/x/cliffy/prompt/mod.ts";
import * as log from "https://deno.land/std@0.91.0/log/mod.ts";

const getBranches = async (projectId: string): Promise<Branch[]> => {
  return await getResources(`/v2/projects/${projectId}/branches`) as Branch[];
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

const askForBranchDetails = async () => {
  return await prompt([
    {
      name: "name",
      message: "Name",
      type: Input,
      validate: (value) => value.length > 0,
    }, {
      name: "create_branch",
      message: "Create branch with these attributes?",
      default: true,
      type: Toggle,
    }
  ]);
}

export const createBranch = async (): Promise<void> => {
  const projectId = await selectProject();
  const branchDetails = await askForBranchDetails();

  let branch: Branch;

  if(branchDetails.create_branch) {
    delete branchDetails.create_branch;

    branch = await createResource(`/v2/projects/${projectId}/branches`, branchDetails) as Branch;
    if (branch.state === "initialized") { log.info('Branch initialized!') }
  }
}
