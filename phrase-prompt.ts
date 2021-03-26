import { createKey, searchKey } from "./src/keys.ts";
import { createBranch } from "./src/branches.ts";
import { Select } from "https://deno.land/x/cliffy/prompt/mod.ts";

const runPrompt = async () => {
  const selectAction = await Select.prompt({
    message: "What do you want to do?",
    options: [
      { name: "Search Key", value: "searchKey" },
      { name: "Create Key", value: "createKey" },
      { name: "Create Branch", value: "createBranch" },
    ],
  });

  switch (selectAction) {
    case "createKey":
      await createKey();
      await runPrompt();
      break;
    case "searchKey":
      await searchKey();
      await runPrompt();
      break;
    case "createBranch":
      await createBranch();
      await runPrompt();
      break;
  }
};

runPrompt();
