/* eslint-disable @typescript-eslint/no-explicit-any */
interface FetcherParams {
  link: string;
  token: string;
  method?: string;
  body?: any;
}

export const getFetcher = async ({
  link,
  token,
  method = "GET",
  body,
}: FetcherParams) => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}${link}`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
