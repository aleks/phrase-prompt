import { apiEndpoint, getAuthToken } from "./config.ts";
import * as log from "https://deno.land/std@0.91.0/log/mod.ts";

const handleResponseErrors = (response: Response): void => {
  if (response["status"] === 401) {
    log.error(response["statusText"]);
    log.error("Auth token invalid?");
    Deno.exit();
  }

  if (response["status"] >= 400) log.error(response["statusText"]);
};

export const getResources = async (
  url: string,
): Promise<Record<string, unknown>[]> => {
  const resourceURL = new URL(url, apiEndpoint());
  const authToken = await getAuthToken();

  return await fetch(resourceURL.href, {
    headers: {
      "Authorization": `Bearer ${authToken}`,
    },
  }).then((response) => {
    handleResponseErrors(response);

    return response.json();
  }).catch((error) => {
    log.error(error);
    return {};
  });
};

export const createResource = async (
  url: string,
  data: Record<string, unknown>,
): Promise<Record<string, unknown> | Record<string, unknown>[]> => {
  const resourceURL = new URL(url, apiEndpoint());
  const authToken = await getAuthToken();

  return await fetch(resourceURL.href, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    handleResponseErrors(response);

    return response.json();
  }).catch((error) => {
    log.error(error);
  });
};
