import '@/style/globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound, redirect } from 'next/navigation';
import { getCookie } from './actions';
import ToasterClient from '@/provider/react-hot-toast';
import ReactQueryProvider from '@/provider/react-query-provider';
import NiceModalWrapper from '@/provider/nicemodal-provider';
import SelectLanguage from '@/features/select-language';
import Sidebar from '@/layout/sidebar/sidebar';
import SignIn from './sign-in/sign-in';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'no-cache';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    if (locale)
      messages = (await import(`../../messages/${locale}.json`)).default;
    else redirect('/en/');
  } catch (error) {
    notFound();
  }
  let isKey;
  await getCookie({ name: 'key' })?.then((res) => {
    isKey = res?.value;
  });
  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-back-primary w-full h-full`}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}>
          <ReactQueryProvider>
            <NiceModalWrapper>
              <div className='w-full h-full overflow-hidden flex flex-col md:flex-row lg:flex-row relative justify-center items-center text-text-light'>
                <section className='fixed top-3 right-5 w-full z-30 flex justify-end text-white'>
                  <SelectLanguage />
                </section>
                {!isKey ? (
                  <SignIn />
                ) : (
                  <>
                    <Sidebar />
                    <div className='w-full h-full flex flex-col justify-center items-center overflow-hidden box-border order-1 md:order-2 lg:order-2 xl:order-2 2xl-order-2'>
                      {children}
                    </div>
                  </>
                )}
              </div>
              <ToasterClient />
            </NiceModalWrapper>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
