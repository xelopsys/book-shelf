'use client';

import { useState } from 'react';
import { setCookie } from '../actions';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axiosInstance from '@/utils/axiosinstance';
import LoadingDots from '@/components/loading-dost/loading-dots';

interface Values {
  email: string;
  name: string;
  key: string;
  secret: string;
}

const forms = [
  {
    label: 'Name',
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'name',
  },
  {
    label: 'Email',
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'email',
  },
  {
    label: 'Key',
    id: 'key',
    name: 'key',
    type: 'text',
    placeholder: 'key',
  },
  {
    label: 'Secret',
    id: 'secret',
    name: 'secret',
    type: 'password',
    placeholder: 'secret',
  },
];

export default function Form() {
  const t = useTranslations('common');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const form = useFormik<Values>({
    initialValues: {
      email: '',
      name: '',
      key: '',
      secret: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axiosInstance(`/signup`, {
          method: 'POST',
          data: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.data;
        if (user?.isOk) {
          setCookie({
            name: 'key',
            value: user?.data?.key,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });
          setCookie({
            name: 'secret',
            value: user?.data?.secret,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          });
          setLoading(false);
          router.replace(`/${params?.locale}/`);
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(t(error?.response?.data?.message || 'user_exists'));
      }
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit}
      className='flex flex-col space-y-4 px-4 py-8 sm:px-16 w-full max-w-[400px]'>
      {forms.map((item) => (
        <div
          key={item?.id}
          className='w-full'>
          <label
            htmlFor={item?.id}
            className='block text-xs text-text-light uppercase'>
            {t(item?.name)}
          </label>
          <input
            id={item?.id}
            name={item?.id}
            type={item?.type}
            placeholder={item?.id}
            onChange={form.handleChange}
            value={form.values[item.name as keyof Values]}
            required
            className='mt-1 block w-full bg-back-secondary text-text-light rounded-md border border-text-light px-3 py-2 placeholder-text-dark shadow-sm focus:border-white focus:outline-none focus:ring-white sm:text-sm'
          />
        </div>
      ))}

      <button
        type='submit'
        disabled={loading}
        className={`${
          loading
            ? 'cursor-not-allowed border-gray-200 bg-back-secondary'
            : 'border-white bg-back-illustration text-white hover:bg-back-secondary'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}>
        {loading ? <LoadingDots color='#fff' /> : <p>{t('signin')}</p>}
      </button>
    </form>
  );
}
