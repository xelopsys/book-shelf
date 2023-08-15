'use server';

import { cookies } from 'next/headers';

export async function setCookie({
  name,
  value,
  expires,
}: {
  name: string;
  value: string;
  expires: Date;
}) {
  // @ts-ignore
  cookies().set({
    name,
    value,
    expires,
    httpOnly: true,
    path: '/',
  });
}

export async function getCookie({ name }: { name: string }) {
  // @ts-ignore
  return cookies().get(name);
}

export async function removeCookie({ name }: { name: string }) {
  // @ts-ignore
  cookies().set({
    name,
    value: '',
    expires: new Date(0),
    path: '/',
  });
}
