/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { base_url } from "./config";
interface postFetcherType {
  link: string;
  meth?: string;
  token?: string;
  data?: unknown;
}
interface getFetcherType {
  link: string;
  token?: string;
}

export async function postFetcher({
  link,
  meth,
  token,
  data,
}: postFetcherType) {
  const call = await fetch(`${base_url}${link}`, {
    method: meth ? meth : "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  const response = await call.json();
  return response;
}

export async function getFetcher({ link, token }: getFetcherType) {
  const call = await fetch(`${base_url}${link}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const response = await call.json();
  return response;
}

export async function deleteFetcher({ link, token }: getFetcherType) {
  const call = await fetch(`${base_url}${link}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const response = await call.json();
  return response;
}

export async function formPostFetcher({
  link,
  meth,
  token,
  data,
}: {
  link: string;
  meth?: string;
  token?: string;
  data?: FormData;
}) {
  try {
    const call = await fetch(`${base_url}${link}`, {
      method: meth ?? "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data,
    });

    let responseData;
    try {
      responseData = await call.json();
      return responseData;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}
