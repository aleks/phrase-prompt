import { selectBranch, selectProject } from "./src/project.ts";

const projectId = await selectProject();
const branchId = await selectBranch(projectId);

console.log(projectId);
console.log(branchId);
