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

export const createResource = async (
  url: string,
  data: Record<string, unknown>,
): Promise<Record<string, unknown>> => {
  const resourceURL = new URL(url, endpointUrl());
  const authToken = await getAuthTokenFromConfig();

  const formData = new FormData();
  Object.entries(data).forEach((item) => formData.append(item[0], `${item[1]}`));

  const response = await fetch(resourceURL.href, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${authToken}`,
    },
    body: formData,
  });

  return await response.json();
};
