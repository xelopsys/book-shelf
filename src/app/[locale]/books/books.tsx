'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Book from '@/components/book/book';
import axiosInstance from '@/utils/axiosinstance';
import NiceModal from '@ebay/nice-modal-react';
import AddBook from '../books/features/add-book';
import UpdateBook from '../books/features/update-book';
import LoadingDots from '@/components/loading-dost/loading-dots';

export default function Home() {
  const t = useTranslations('common');
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const search = searchParams?.get('search');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearch, setisSearch] = useState(false);
  const [books, setbooks] = useState<Record<string, any>[]>([]);

  const { data, isFetching, refetch } = useQuery('books', () => {
    return axiosInstance.get('/books');
  });

  const searchMutation = useMutation(
    (data: Record<string, any>) => {
      return axiosInstance.get('/books/' + data.search);
    },
    {
      onSuccess: (data) => {
        setbooks(data?.data?.data);
      },
    }
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSearch(true);
    const search = e.currentTarget.search.value as string;
    searchMutation.mutate({ search });
    router.replace(`${params?.locale}/books?search=${search}`);
  };

  const handleClear = () => {
    setisSearch(false);
    queryClient.refetchQueries();
    router.replace(`${params?.locale}/books`);
    if (inputRef.current) inputRef.current.value = '';
  };

  const addbookmodal = {
    showmodal: () => NiceModal.show(AddBook),
  };

  const updatebookmodal = {
    showmodal: ({ book }: { book: Record<string, any> }) =>
      NiceModal.show(UpdateBook, { book }),
  };

  useEffect(() => {
    if (data?.data?.data) {
      setbooks(() => {
        return data?.data?.data?.map((book: Record<string, any>) => {
          return {
            ...book?.book,
            status: book?.status,
          };
        });
      });
    }
  }, [data]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value === '') refetch();
  }, [inputRef]);

  useEffect(() => {
    if (search) {
      setisSearch(true);
      if (inputRef.current) inputRef.current.value = search || '';
      searchMutation.mutate({ search });
    }
  }, [search]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-start items-start overflow-hidden box-border gap-10'>
      <div className='w-full flex flex-col justify-start items-start overflow-hidden gap-4 box-border'>
        <section className='w-full flex flex-row justify-between items-center mt-3 gap-2'>
          <h1 className='text-base md:text-lg lg:text-lg font-semibold mr-auto'>
            {t(isSearch ? 'books' : 'my_books')}
          </h1>
          <section className='w-full flex flex-row justify-center items-center gap-1'>
            <form
              onSubmit={onSubmit}
              className='min-w-[50%] flex flex-row justify-center items-center bg-back-secondary rounded-full px-3 py-1'>
              <input
                className='w-full rounded-full bg-inherit outline-none px-1'
                placeholder={t('search')}
                type='text'
                name='search'
                id='search'
                ref={inputRef}
              />
              <button type='submit'>
                <MagnifyingGlassIcon className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-text-light' />
              </button>
            </form>
            {isSearch && (
              <XMarkIcon
                onClick={handleClear}
                className='w-5 h-5 md:w-8 md:h-8 lg:w-8 lg:h-8 text-text-light'
              />
            )}
          </section>
          <section className='flex flex-row justify-center items-center ml-auto gap-2'>
            <button onClick={addbookmodal.showmodal}>
              <PlusIcon className='w-8 h-8 text-text-light' />
            </button>
          </section>
        </section>
        <div className='w-full flex col-span-12 flex-row flex-wrap justify-start overflow-y-auto items-start gap-4 box-border pb-5 px-auto'>
          {searchMutation.isLoading || isFetching ? (
            <LoadingDots color='#fff' />
          ) : books?.length > 0 ? (
            <>
              {books?.map((book: Record<string, any>, index: number) => {
                const status =
                  book?.status === 0
                    ? 'new'
                    : book?.status === 1
                    ? 'reading'
                    : book?.status === 2
                    ? 'finished'
                    : '';
                return (
                  <Book
                    key={index}
                    title={book?.author}
                    description={book?.title}
                    image={book?.cover}
                    flex='column'
                    isbn={book?.isbn}
                    status={status ? t(status) : ''}
                    isSearch={isSearch}
                    onClick={() => {
                      if (isSearch) return;
                      updatebookmodal.showmodal({ book });
                    }}
                  />
                );
              })}
            </>
          ) : (
            <section className='flex flex-col justify-start items-start'>
              <h1>{t('not_found_books')}</h1>
              <p className='text-sm text-text-dark'>{t('add_books')}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
