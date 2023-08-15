import { HomeIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { TRoutes } from '@/types';

export const routes: TRoutes = [
  {
    path: '',
    component: 'Home',
    exact: false,
    name: 'home',
    Icon: HomeIcon,
  },
  {
    path: '/books',
    component: 'Books',
    exact: false,
    name: 'books',
    Icon: BookOpenIcon,
  },
];
