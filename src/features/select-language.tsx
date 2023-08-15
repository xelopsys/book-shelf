'use client';

import { useState } from 'react';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { classNames } from '@/helper';
import Image from 'next/image';
import AppPopover from '@/components/popover/popover';

const langs = [
  {
    title: 'Ру',
    value: 'ru',
  },
  {
    title: 'Eng',
    value: 'en',
  },
];

function SelectLanguage() {
  const router = useRouter();
  const params = useParams();
  const path = usePathname();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleSetLang = ({ value }: { title: string; value: string }) => {
    const locale = path?.slice(3);
    router.replace(`${value}/${locale}`);
  };

  return (
    <AppPopover
      align='end'
      positions={['bottom']}
      reposition
      open={isPopoverOpen}
      toggle={handleClick}
      containerStyle='mt-1'
      button={
        <button
          type='button'
          aria-label='Select language'
          className='group flex items-center gap-2 rounded-lg p-2 transition-all '>
          <span className='w-[18[px] flex h-[18px] items-center overflow-hidden rounded-full'>
            <Image
              alt=''
              src={`/${params?.locale}.png`}
              width={18}
              height={18}
            />
          </span>
          <span className='medium-16 hidden text-text-light md:inline-block'>
            {langs.find((l) => l?.value === params?.locale)?.title}
          </span>
          <ChevronDownIcon
            width={10}
            className={classNames(
              'transition-all',
              isPopoverOpen && 'rotate-180 text-primary'
            )}
          />
        </button>
      }
      content={
        <div className='z-50 flex flex-col items-start justify-start overflow-hidden rounded-lg bg-back-secondary py-1 shadow-lg'>
          {langs.map((lang) => {
            const isCurrent = params?.locale === lang.value;
            return (
              <button
                disabled={isCurrent}
                key={lang.value}
                onClick={() => handleSetLang(lang)}
                type='button'
                aria-label='Select language'
                className={classNames(
                  'mb-1 flex w-full cursor-pointer items-center gap-2 p-2 text-text-light  transition-all hover:bg-back-primary',
                  isCurrent && 'bg-back-primary'
                )}>
                <span className='flex h-[18px] w-[18px] items-center overflow-hidden rounded-full'>
                  <Image
                    alt=''
                    src={`/${lang.value}.png`}
                    width={18}
                    height={18}
                  />
                </span>
                <span
                  className={classNames(
                    'medium-16 hidden md:inline-block',
                    isCurrent ? 'text-primary' : 'text-black-light'
                  )}>
                  {lang.title}
                </span>
                {isCurrent && (
                  <CheckCircleIcon
                    width={15}
                    className='text-primary'
                  />
                )}
              </button>
            );
          })}
        </div>
      }
    />
  );
}

export default SelectLanguage;
