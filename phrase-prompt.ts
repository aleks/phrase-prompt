import { selectBranch, selectProject } from "./src/projects.ts";
import { createKey } from "./src/keys.ts";

const projectId = await selectProject();
const branchName = await selectBranch(projectId);
const keyDetails = await createKey(projectId, branchName);

console.log(projectId);
console.log(branchName);
console.log(keyDetails);
