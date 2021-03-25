import { prompt } from "https://deno.land/x/cliffy@v0.18.1/prompt/mod.ts";

import { getPhraseConfig, getAuthTokenFromConfig } from './src/utils.ts';

const config = await getPhraseConfig();
console.log(config);

const authToken = await getAuthTokenFromConfig();
console.log(authToken);
