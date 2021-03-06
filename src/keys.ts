import { Key, Translation } from "./types.ts";
import { getResources, createResource } from "./api.ts";
import { selectProject } from "./projects.ts";
import { selectBranch } from "./branches.ts";
import {
  Input,
  Number,
  prompt,
  Select,
  Toggle,
} from "https://deno.land/x/cliffy/prompt/mod.ts";
import { Cell, Table } from "https://deno.land/x/cliffy/table/mod.ts";
import * as log from "https://deno.land/std@0.91.0/log/mod.ts";

const askForKeyDetails = async () => {
  return await prompt([
    {
      name: "name",
      message: "Name",
      type: Input,
      validate: (value) => value.length > 0,
    },
    {
      name: "description",
      message: "Description",
      type: Input,
    },
    {
      name: "tags",
      message: "Tags (separate by comma)",
      type: Input,
    },
    {
      name: "default_translation_content",
      message: "Default translation",
      type: Input,
    },
    {
      name: "plural",
      message: "Enable pluralization for this key ",
      default: false,
      type: Toggle,
      after: async ({ plural }, next) => {
        if (plural) {
          await next("name_plural");
        } else {
          await next("max_characters_allowed");
        }
      },
    },
    {
      name: "name_plural",
      message: "Plural Key Name",
      type: Input,
    },
    {
      name: "max_characters_allowed",
      message: "Max. Characters",
      type: Number,
      default: 0,
      min: 0,
      max: 10000,
    },
    {
      name: "data_type",
      message: "Type",
      type: Select,
      default: "string",
      options: [
        { name: "String", value: "string" },
        { name: "Number", value: "number" },
        { name: "Boolean", value: "boolean" },
        { name: "Array", value: "array" },
        { name: "Markdown", value: "markdown" },
      ],
    },
    {
      name: "unformatted",
      message: "Unformatted",
      default: false,
      type: Toggle,
    },
    {
      name: "xml_space_preserve",
      message: 'Set the "xml:space" attribute to "preserve"',
      default: false,
      type: Toggle,
    },
    {
      name: "create_key",
      message: "Create key with these attributes?",
      default: true,
      type: Toggle,
    },
  ]);
};

export const createKey = async (): Promise<void> => {
  const projectId = await selectProject();
  const branchName = await selectBranch(projectId);
  const keyDetails = await askForKeyDetails();

  if (branchName !== "main") Object.assign(keyDetails, { branch: branchName });

  let key: Key;
  if (keyDetails.create_key) {
    key = await createResource(
      `/v2/projects/${projectId}/keys`,
      keyDetails,
    ) as Key;
    if (key.id) log.info("Key created!");
  }
};

const getTranslationsForKey = async (
  projectId: string,
  branchName: string,
  keyId: string,
): Promise<Translation[]> => {
  const params = new URLSearchParams("?per_page=100&sort=updated_at");
  if (branchName !== "main") params.append("branch", branchName);

  return await getResources(
    `/v2/projects/${projectId}/keys/${keyId}/translations?${params.toString()}`
  ) as Translation[];
}

export const searchKey = async (): Promise<Key[]> => {
  const keyQuery = {};
  const projectId = await selectProject();
  const branchName = await selectBranch(projectId);
  if (branchName !== "main") Object.assign(keyQuery, { branch: branchName });

  const keyName = await Input.prompt({ message: "Search key name:" })

  Object.assign(keyQuery, { q: keyName });

  const keys = await createResource(
    `/v2/projects/${projectId}/keys/search`,
    keyQuery,
  ) as Key[];

  if(keys.length < 1) {
    log.info(`Key with name \"${keyName}\" not found`);
    Deno.exit();
  }

  const keyId = await Select.prompt({
    message: "Please select a key:",
    options: keys.map(key => ({ name: key.name, value: key.id })),
  });

  const translations = await getTranslationsForKey(projectId, branchName, keyId);

  if(translations.length > 0) {
    const mappedTranslations = translations.map(translation => {
      return [
        translation.id,
        translation.locale.name,
        `state: ${translation.state}`,
        `unverified: ${translation.unverified}`,
        translation.content,
      ]
    });

    Table
      .from(mappedTranslations)
      .border(true)
      .render();

  } else {
    log.info(`No translations found for key ${keyId}`);
  }

  return keys;
};
