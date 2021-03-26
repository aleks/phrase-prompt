import { Key } from './types.ts';
import { createResource } from './api.ts';
import { prompt, Input, Toggle, Number, Select } from "https://deno.land/x/cliffy/prompt/mod.ts";
import * as log from "https://deno.land/std@0.91.0/log/mod.ts";

const askForKeyDetails = async () => {
  return await prompt([
    {
      name: "name",
      message: "Name",
      type: Input,
      validate: (value) => value.length > 0,
    }, {
      name: "description",
      message: "Description",
      type: Input,
    }, {
      name: "tags",
      message: "Tags (separate by comma)",
      type: Input,
    }, {
      name: "default_translation_content",
      message: "Default translation",
      type: Input,
    }, {
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
      }
    }, {
      name: "name_plural",
      message: "Plural Key Name",
      type: Input,
    }, {
      name: "max_characters_allowed",
      message: "Max. Characters",
      type: Number,
      default: 0,
      min: 0,
      max: 10000,
    }, {
      name: "data_type",
      message: "Type",
      type: Select,
      default: 'string',
      options: [
        { name: "String", value: "string" },
        { name: "Number", value: "number" },
        { name: "Boolean", value: "boolean" },
        { name: "Array", value: "array" },
        { name: "Markdown", value: "markdown" },
      ]
    }, {
      name: "unformatted",
      message: "Unformatted",
      default: false,
      type: Toggle,
    }, {
      name: "xml_space_preserve",
      message: "Set the \"xml:space\" attribute to \"preserve\"",
      default: false,
      type: Toggle,
    }, {
      name: "create_key",
      message: "Create key with these attributes?",
      default: true,
      type: Toggle,
    }
  ]);
}

export const createKey = async (projectId: string, branchName: string): Promise<void> => {
  let key: Key;
  const keyDetails = await askForKeyDetails();

  if (branchName !== "main") Object.assign(keyDetails, { branch: branchName });

  if(keyDetails.create_key) {
    key = await createResource(`/v2/projects/${projectId}/keys`, keyDetails) as Key;
    if (key.id) { log.info('Key created!') }
  }
}