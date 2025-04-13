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

interface FetchResult<T> {
  message(message: any): unknown;
  status: boolean;
  data?: T;
  error?: any; // Or a more specific error type
}

export async function formPostFetcher<T>({
  link,
  meth,
  token,
  data,
}: {
  link: string;
  meth?: string;
  token?: string;
  data?: FormData;
}): Promise<FetchResult<T>> {
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
    } catch (error) {
      // If the response is not valid JSON (e.g., a plain text error)
      if (!call.ok) {
        const textError = await call.text();
        return {
          status: false,
          error: textError || "Request failed with non-JSON response",
        };
      }
      // If it's a successful response but not JSON (unlikely for your use case)
      return { status: call.ok, data: undefined };
    }

    if (!call.ok) {
      return {
        status: false,
        error:
          responseData?.message ||
          responseData ||
          `Request failed with status ${call.status}`,
      };
    }

    return { status: true, data: responseData as T };
  } catch (error) {
    console.error("Fetch error:", error);
    return { status: false, error: "Network error or error parsing JSON" };
  }
}
// export function Finalizer(
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   message: any,
//   status: boolean,
//   messageData: string,
//   pref?: "info" | "success" | "warning" | "loading"
// ) {
//   if (pref) {
//     message[pref](messageData);
//   } else {
//     if (status) {
//       message.success(messageData);
//     } else {
//       message.error(messageData);
//     }
//   }
// }
