import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const verifySession = async () => {
  const cookieString = (await getCookieData()) as string;
  try {
    const response = await fetch(`${baseURL}/user`, {
      method: 'GET',
      credentials: 'include',
      headers: { Cookie: cookieString },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return { isAuth: true, user: responseData };
  } catch (error) {
    console.error('Failed to verify session:', error);
    return { isAuth: false, user: null };
  }
};

export async function getCookieData() {
  const cookieData = cookies().toString();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000),
  );
}
