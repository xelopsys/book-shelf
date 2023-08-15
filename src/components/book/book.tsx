'use client';

import { classNames } from '@/helper';
import { PlusIcon } from '@heroicons/react/24/outline';
import NiceModal from '@ebay/nice-modal-react';
import AddBook from '@/app/[locale]/books/features/add-book';
import Image from 'next/image';

export default function Book({
  title,
  description,
  image,
  status,
  flex,
  isSearch,
  isbn,
  onClick,
}: {
  title?: string;
  description?: string;
  image: string;
  status?: string;
  flex?: 'row' | 'column';
  isSearch?: boolean;
  isbn?: string;
  onClick?: () => void;
}) {
  const addbookmodal = {
    showmodal: () => NiceModal.show(AddBook, { isbn }),
  };

  return (
    <div
      className={classNames(
        'w-56 h-max flex flex-col justify-start items-start gap-2',
        flex === 'row' ? 'min-w-[200px]' : 'w-[45%] md:w-56 lg:w-72',
        onClick ? 'cursor-pointer' : 'cursor-default'
      )}
      onClick={onClick || undefined}>
      <Image
        src={image || '/cover.png'}
        alt={title || 'cover'}
        width={100}
        height={200}
        loading='lazy'
        quality={100}
        placeholder='blur'
        blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8X8HwCgAGWAJjqIYCtQAAAABJRU5ErkJggg=='
        className='w-full h-80 object-left object-contain'
      />
      <section className='w-full flex flex-col justify-start items-start'>
        {title && (
          <h1 className='text-base md:text-lg lg:text-lg font-semibold'>
            {title || 'author'}
          </h1>
        )}
        {description && (
          <p className='text-xs md:text-sm lg:text-sm font-normal w-full break-words'>
            {description || 'title'}
          </p>
        )}
      </section>
      {status && (
        <span className='border border-text-light px-2 py-1 rounded-full text-base'>
          {status}
        </span>
      )}
      {isSearch && (
        <span className='border border-text-light px-2 py-1 rounded-full text-base cursor-pointer'>
          <PlusIcon
            onClick={addbookmodal.showmodal}
            className='w-5 h-5 text-text-light'
          />
        </span>
      )}
    </div>
  );
}
