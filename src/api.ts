import { getAuthTokenFromConfig } from "./config.ts";

export const endpointUrl = (): string => {
  return "https://api.phrase.com/v2";
};

export const getResources = async (
  url: string,
): Promise<Record<string, unknown>[]> => {
  const resourceURL = new URL(url, endpointUrl());
  const authToken = await getAuthTokenFromConfig();

  const response = await fetch(resourceURL.href, {
    headers: {
      "Authorization": `Bearer ${authToken}`,
    },
  });

  return response.json();
};
