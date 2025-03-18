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
