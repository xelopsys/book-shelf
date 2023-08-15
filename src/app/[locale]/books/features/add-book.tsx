'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useModal, create } from '@ebay/nice-modal-react';
import { useTranslations } from 'next-intl';
import axiosInstance from '@/utils/axiosinstance';
import toast from 'react-hot-toast';
import Modal from '@/components/modal/modal';
import LoadingDots from '@/components/loading-dost/loading-dots';

interface IValues {
  isbn: string;
}

function AddBook({ isbn }: { isbn?: string }) {
  const t = useTranslations('common');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const modal = useModal();

  const form = useFormik<IValues>({
    initialValues: {
      isbn: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      await axiosInstance('/books', {
        method: 'POST',
        data: values,
      })
        .then(() => {
          toast.success(t('book_is_added_successfully'));
          setLoading(false);
          router.refresh();
          modal.hide();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    form.setFieldValue('isbn', isbn);
  }, [isbn]);

  return (
    <Modal modal={modal}>
      <form
        onSubmit={form.handleSubmit}
        className='flex flex-col space-y-4 px-4 py-8 sm:px-16 w-full mt-2'>
        <div className='w-full'>
          <label
            htmlFor='isbn'
            className='block text-xs text-text-light uppercase'>
            {t('isbn')}
          </label>
          <input
            id='isbn'
            name='isbn'
            type='isbn'
            placeholder='isbn'
            onChange={form.handleChange}
            value={form.values.isbn as keyof IValues}
            required
            className='mt-1 block w-full bg-back-secondary text-text-light rounded-md border border-text-light px-3 py-2 placeholder-text-dark shadow-sm focus:border-white focus:outline-none focus:ring-white sm:text-sm'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className={`${
            loading
              ? 'cursor-not-allowed border-gray-200 bg-back-secondary'
              : 'border-white bg-back-illustration text-white hover:bg-back-secondary'
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}>
          {loading ? <LoadingDots color='#fff' /> : <p>{t('add_book')}</p>}
        </button>
      </form>
    </Modal>
  );
}

export default create(AddBook);
