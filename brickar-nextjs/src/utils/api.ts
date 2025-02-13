import qs from "qs";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

// A flag to prevent infinite loops on token refresh calls.
interface ApiRequestOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT" | "HEAD";
  path: string;
  params?: Record<string, any>;
  data?: Record<string, any> | FormData;
  headers?: Record<string, string>;
  cookie?: string;
  /** Internal flag to skip auto-refresh on a retried request */
  skipAuthRetry?: boolean;
}

/**
 * A common function to perform API calls with fetch.
 * It automatically retries the request if a 401 is encountered.
 */
export const apiRequest = async ({
  method,
  path,
  params = {},
  data = {},
  headers = {},
  skipAuthRetry = false,
}: ApiRequestOptions): Promise<any> => {
  const queryParams = qs.stringify(params, { encode: true });
  const url = `${baseURL}${path}${queryParams ? `?${queryParams}` : ""}`;

  // Create headers and add the API key
  const headersObject = new Headers();
  headersObject.append("x-api-key", apiKey);

  // Add the access token if available (and if not already provided)
  let storedAccessToken = localStorage.getItem("access_token");
   if (storedAccessToken) {
     storedAccessToken = storedAccessToken.replace(/^"(.*)"$/, "$1"); // ✅ Remove surrounding quotes
   }
  if (storedAccessToken && !headersObject.has("Authorization")) {
    headersObject.append("Authorization", `Bearer ${storedAccessToken}`);
  }

  // Append any additional headers
  Object.entries(headers).forEach(([key, value]) => {
    headersObject.append(key, value);
  });

  const fetchOptions: RequestInit = {
    method,
    headers: headersObject,
    cache: "no-store",
  };

  if (method !== "GET" && method !== "HEAD") {
    if (data instanceof FormData) {
      fetchOptions.body = data;
      // Let the browser set the correct Content-Type for FormData
      headersObject.delete("Content-Type");
    } else {
      headersObject.set("Content-Type", "application/json");
      fetchOptions.body = JSON.stringify(data);
    }
  }

  let response = await fetch(url, fetchOptions);
  // If unauthorized and we haven't already retried, try refreshing the token
  if (
    response.status === 401 &&
    !skipAuthRetry &&
    !path.includes("admin/refresh-token")
  ) {
    const refreshSuccessful = await refreshAccessToken();
    if (refreshSuccessful) {
      // Update the Authorization header with the new token
      const newToken = localStorage.getItem("access_token");
      if (newToken) {
        headersObject.set("Authorization", `Bearer ${newToken}`);
        fetchOptions.headers = headersObject;
        response = await fetch(url, fetchOptions);
      }
    }
  }

  let responseData: any = null;
  try {
    responseData = await response.json();
  } catch (jsonError) {
    // In case response is not JSON
  }

  if (!response.ok) {
    const errorMessage =
      responseData?.message ||
      responseData?.errors?.[0]?.message ||
      `Error ${response.status}: ${response.statusText}` ||
      "Something went wrong";
    throw new Error(errorMessage);
  }

  return responseData;
};

/**
 * Refresh the access token using the refresh token stored in localStorage.
 * Returns true if refresh was successful.
 */
const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refresh_token");
  // if (!refreshToken) {
  //   logout();
  //   return false;
  // }
  try {
    // Note: We pass skipAuthRetry so that the refresh request does not trigger recursion.
    const response = await apiRequest({
      method: "POST",
      path: "admin/refresh-token/",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      skipAuthRetry: true,
    });
    // Update the access token in localStorage
    localStorage.setItem("access_token", response.access_token);
    return true;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    logout();
    return false;
  }
};

/**
 * Log out the user: clear tokens and redirect to login page.
 * You can replace this with your own logout logic.
 */
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_info");
  // For client-side navigation in Next.js app directory, you might use:
  window.location.href = "/login";
};

/**
 * A convenience function for GET requests.
 */
// export const getRequest = async (path: string, cookie = ""): Promise<any> => {
//   return apiRequest({
//     method: "GET",
//     path,
//     cookie,
//   });
// };

export const getRequest = async (path: string) => {
  try {
    const data = await apiRequest({
      method: "GET",
      path,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
