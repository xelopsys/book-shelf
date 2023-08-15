import { UsersIcon } from '@heroicons/react/24/outline';

export type TObject = {
  [key: string]: any;
};

export type TRoute = {
  path: string;
  component: string;
  exact: boolean;
  name: string;
  Icon: typeof UsersIcon;
};

export type TRoutes = TRoute[];
