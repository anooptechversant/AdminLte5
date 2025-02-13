// import { decode as decodeHtml } from "he";

// export const stripHtml = (html: string): string => {
//   const decoded = decodeHtml(html);
//   return decoded.replace(/<[^>]+>/g, "");
// };

// export const extractYouTubeVideoId = (url: string): string | null => {
//   try {
//     const parsedUrl = new URL(url);
//     const hostname = parsedUrl.hostname.toLowerCase();

//     if (hostname.includes("youtube.com")) {
//       return parsedUrl.searchParams.get("v");
//     } else if (hostname.includes("youtube")) {
//       return parsedUrl.pathname.split("/")[1];
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error(`Invalid YouTube URL: ${url}`);
//     return null;
//   }
// };

// export function cartesianProduct<T>(arrays: T[][]): T[][] {
//   return arrays.reduce<T[][]>(
//     (acc, curr) => acc.flatMap((a) => curr.map((b) => [...a, b])),
//     [[]],
//   );
// }
