'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import Link from 'next/link';
import Banner from '@/components/banner/banner';
import Book from '@/components/book/book';
import axiosInstance from '@/utils/axiosinstance';
import LoadingDots from '@/components/loading-dost/loading-dots';

const banners = [
  {
    title: 'featured',
    description: 'explore_books',
    image: '/books.jpeg',
    path: '/books',
  },
  {
    title: 'new',
    description: 'new_on_store',
    image: '/books.jpeg',
    path: '/books',
  },
  {
    title: 'new',
    description: 'new_on_store',
    image: '/books.jpeg',
    path: '/books',
  },
  {
    title: 'new',
    description: 'new_on_store',
    image: '/books.jpeg',
    path: '/books',
  },
];

export default function Home() {
  const t = useTranslations('common');
  const params = useParams();

  const { data, isFetching, refetch } = useQuery('books-home', () => {
    return axiosInstance.get('/books');
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-start items-start overflow-hidden box-border gap-10'>
      <div className='w-full  flex flex-row justify-start items-start overflow-x-auto gap-4 box-border pb-5'>
        {banners.map((banner, index) => (
          <Link
            href={`${params?.locale}${banner.path}`}
            key={index}>
            <Banner
              title={t(banner.title)}
              description={t(banner.description)}
              image={banner.image}
            />
          </Link>
        ))}
      </div>

      <div className='w-full flex flex-col justify-start items-start overflow-hidden gap-4 box-border'>
        <section className='w-full flex flex-row justify-between items-center'>
          <h1 className='text-lg font-semibold'>{t('books')}</h1>
          {data?.data?.data && (
            <Link
              href={`${params?.locale}/books`}
              className='text-base text-back-illustration'>
              {t('see_all')}
            </Link>
          )}
        </section>
        <div className='w-full flex flex-row justify-start items-start overflow-x-auto gap-4 box-border pb-5'>
          {isFetching ? (
            <LoadingDots color='#fff' />
          ) : data?.data?.data && data?.data?.data > 0 ? (
            <>
              {data?.data?.data?.map(
                (book: Record<string, any>, index: number) => {
                  return (
                    <Book
                      key={index}
                      title={book?.book?.author}
                      image={book?.book?.cover}
                      flex='row'
                    />
                  );
                }
              )}
            </>
          ) : (
            <section className='flex flex-col justify-start items-start'>
              <h1>{t('not_found_books')}</h1>
              <p className='text-sm text-text-dark'>
                {t('go_to_books_to_add')}
              </p>
              <Link
                href={`${params?.locale}/books`}
                className='text-back-illustration text-base'>
                {t('books')}
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
