'use client';

import { useEffect, useState } from 'react';
import { useModal, create } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { useTranslations } from 'next-intl';
import { classNames } from '@/helper';
import Image from 'next/image';
import axiosInstance from '@/utils/axiosinstance';
import toast from 'react-hot-toast';
import Modal from '@/components/modal/modal';
import LoadingDots from '@/components/loading-dost/loading-dots';

const statuses = [
  {
    id: 0,
    name: 'new',
  },
  {
    id: 1,
    name: 'reading',
  },
  {
    id: 2,
    name: 'finished',
  },
];

function UpdateBook({ book }: { book: Record<string, any> }) {
  const t = useTranslations('common');
  const modal = useModal();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<number>();

  const updateMutation = useMutation(
    (data: Record<string, any>) => {
      return axiosInstance.patch('/books/' + data.id, { status: data.status });
    },
    {
      onSuccess: () => {
        toast.success(t('status_is_changed'));
        queryClient.invalidateQueries();
        modal.hide();
      },
      onError: () => {
        toast.error(t('something_went_wrong'));
      },
    }
  );

  const deleteMutation = useMutation(
    (data: Record<string, any>) => {
      return axiosInstance.delete('/books/' + data.id);
    },
    {
      onSuccess: () => {
        toast.success(t('book_is_removed'));
        queryClient.invalidateQueries();
        modal.hide();
      },
      onError: () => {
        toast.error(t('something_went_wrong'));
      },
    }
  );

  const handleStatusChange = (id: number) => {
    setSelectedStatus(id);
  };

  const handleUpdate = () => {
    updateMutation.mutate({ id: book?.id, status: selectedStatus });
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: book?.id });
  };

  useEffect(() => {
    setSelectedStatus(book?.status);
  }, [book]);
  return (
    <Modal modal={modal}>
      <div className='flex flex-col space-y-4 px-4 py-8 sm:px-16 w-full'>
        <div className='w-full h-max flex flex-row justify-start items-start gap-3'>
          <Image
            src={book?.cover || '/cover.png'}
            alt={book?.title || 'cover'}
            width={100}
            height={150}
            className='w-60 h-80 object-left object-contain'
          />
          <div className='w-full h-max flex flex-col justify-start items-start gap-2 text-text-light text-lg'>
            <h1>
              <span className='text-text-dark'>{t('author')}</span>:{' '}
              {book?.author}
            </h1>
            <p>
              <span className='text-text-dark'>{t('title')}</span>:{' '}
              {book?.title}
            </p>
            <p>
              <span className='text-text-dark'>{t('published')}</span>:{' '}
              {book?.published}
            </p>
            <p>
              <span className='text-text-dark'>{t('pages')}</span>:{' '}
              {book?.pages}
            </p>
          </div>
        </div>
        <div className='w-full flex flex-row justify-evenly items-center'>
          {statuses.map((status, index) => {
            return (
              <button
                key={index}
                onClick={() => handleStatusChange(status.id)}
                className={classNames(
                  'border rounded-full px-3 py-2 text-xs text-text-light uppercase cursor-pointer',
                  selectedStatus === status.id
                    ? 'bg-back-illustration'
                    : 'bg-back-secondary'
                )}>
                {t(status.name)}
              </button>
            );
          })}
        </div>

        <button
          disabled={updateMutation.isLoading}
          onClick={handleUpdate}
          className={`${
            updateMutation.isLoading
              ? 'cursor-not-allowed border-gray-200 bg-back-secondary'
              : 'border-white bg-back-illustration text-white hover:bg-back-secondary'
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}>
          {updateMutation.isLoading ? (
            <LoadingDots color='#fff' />
          ) : (
            <p>{t('change_status')}</p>
          )}
        </button>
        <button
          disabled={deleteMutation.isLoading}
          onClick={handleDelete}
          className={`${
            deleteMutation.isLoading
              ? 'cursor-not-allowed border-gray-200 bg-back-primary'
              : 'border-white bg-back-secondary text-white hover:bg-back-secondary'
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}>
          {deleteMutation.isLoading ? (
            <LoadingDots color='#fff' />
          ) : (
            <p>{t('remove_book')}</p>
          )}
        </button>
      </div>
    </Modal>
  );
}

export default create(UpdateBook);
