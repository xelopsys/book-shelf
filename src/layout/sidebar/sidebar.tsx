'use client';

import { useState, useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/helper';
import { routes } from '@/routes/routes';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosinstance';
import LoadingDots from '@/components/loading-dost/loading-dots';

export default function Sidebar() {
  const t = useTranslations('common');
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState<Record<string, any>>({});
  const [activePath, setActivePath] = useState<string>('');
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await axiosInstance('/myself').then((res) => {
        setuser(res?.data?.data);
        setLoading(false);
      });
    };
    fetch();
  }, []);

  return (
    <div
      className={classNames(
        'flex h-max md:h-full lg:h-full flex-col justify-start items-start bg-back-navbar min-w-fit sticky left-0 bottom-0 md:top-0 lg:top-0 z-50 box-border order-2 md:order-1 lg:order-1 xl:order-1 2xl-order-1 w-full md:w-[320px] lg:w-[320px]'
      )}>
      <div
        className={classNames(
          'flex flex-row md:flex-col lg:flex-col justify-start items-center h-max md:h-full lg:h-full overflow-y-auto scroll-smooth relative w-full'
        )}>
        <nav
          aria-label='Main Nav'
          className={classNames(
            'space-1 h-max md:h-full lg:h-full w-full flex flex-row flex-nowrap justify-evenly items-start md:justify-start md:items-start lg:justify-start lg:items-start md:flex-col lg:flex-col box-border md:gap-2 lg:gap-3 transition-all duration-500 linear p-6'
          )}>
          {routes.map((route, index) => {
            return (
              <>
                {route.exact && <hr className='w-full my-5' />}

                <Link
                  key={index}
                  href={`${params?.locale}${route.path}`}
                  className={classNames(
                    'w-full flex-col md:flex-row lg:flex-row justify-center md:justify-start lg:justify-start items-center md:gap-4 lg:gap-5 flex gap-[5px] text-text-light hover:bg-back-navbarhover hover:text-purple rounded-lg font-normal transition-all duration-100 ease-in px-3 py-1'
                  )}>
                  <route.Icon
                    width={21}
                    className={classNames(
                      'stroke-2 stroke-current lg:w-8 lg:h-8 md:w-7 md:h-7',
                      activePath.endsWith(`${params?.locale}${route.path}`)
                        ? 'text-back-illustration'
                        : 'text-gray-500'
                    )}
                  />
                  <span
                    className={classNames(
                      'text-sm md:text-base lg:text-md w-full whitespace-nowrap text-center md:text-left lg:text-left'
                    )}>
                    {t(route.name)}
                  </span>
                </Link>
              </>
            );
          })}
        </nav>
      </div>
      {user && (
        <div className='w-full py-5 px-9 flex-row justify-start items-start hidden md:flex lg:flex gap-2'>
          {loading ? (
            <LoadingDots color='#fff' />
          ) : (
            <>
              <UserCircleIcon width={50} />
              <span className='flex flex-col w-full justify-start items-start'>
                <h1 className='text-md font-semibold truncate'>{user?.name}</h1>
                <p className='text-sm text-text-dark font-normal truncate'>
                  {user?.email}
                </p>
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
