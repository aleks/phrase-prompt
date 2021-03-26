import { exists } from "https://deno.land/std@0.90.0/fs/exists.ts";
import { parse } from "https://deno.land/std@0.91.0/encoding/yaml.ts";
import * as log from "https://deno.land/std@0.91.0/log/mod.ts";
import * as path from "https://deno.land/std@0.90.0/path/mod.ts";
import { parseFlags } from "https://deno.land/x/cliffy/flags/mod.ts";

type PhraseConfigAttributes = {
  access_token?: string;
};

type PhraseConfigFile = {
  phrase: PhraseConfigAttributes;
  phraseapp: PhraseConfigAttributes;
};

type PhraseConfig = {
  fileName: string | undefined;
  config: PhraseConfigAttributes;
};

const readConfigFile = async (
  fileName: string,
): Promise<PhraseConfigAttributes> => {
  const configFilePath = path.join(Deno.cwd(), fileName);
  const decoder = new TextDecoder("utf-8");
  const phraseConfig = await Deno.readFile(configFilePath);
  const phraseConfigContents = decoder.decode(phraseConfig);

  const parsedConfig = parse(phraseConfigContents) as PhraseConfigFile;

  return parsedConfig.phrase || parsedConfig.phraseapp;
};

export const getPhraseConfig = async (): Promise<PhraseConfig> => {
  const newConfigFile = ".phrase.yml";
  const oldConfigFile = ".phraseapp.yml";

  if (await exists(newConfigFile)) {
    return {
      fileName: newConfigFile,
      config: await readConfigFile(newConfigFile),
    };
  }

  if (await exists(oldConfigFile)) {
    return {
      fileName: oldConfigFile,
      config: await readConfigFile(oldConfigFile),
    };
  }

  log.error(
    "Phrase config not found (looking for .phrase.yml or .phraseapp.yml)",
  );
  Deno.exit();
};

const flags = (): Record<string, unknown> => {
  const args = parseFlags(Deno.args);
  return args.flags;
};

export const getAuthToken = async (): Promise<string> => {
  if (flags().token) {
    return flags().token as string;
  } else {
    const phraseConfig = await getPhraseConfig();
    return phraseConfig.config.access_token || "";
  }
};

export const apiEndpoint = (): string => {
  if (flags().endpoint) {
    return flags().endpoint as string;
  } else {
    return "https://api.phrase.com/v2";
  }
};
