import type { RouteConfig } from '../routes';

export const CLIENT_ROUTES_CONFIG: RouteConfig = {
  publicRoutes: {},
  privateRoutes: {
    account: {
      path: '/account',
      label: 'Cuenta',
      roles: ['admin', 'client'],
    },
  },
} as const;

export const CLIENT_DEFAULT_ROUTES = {
  privateRoute: CLIENT_ROUTES_CONFIG.privateRoutes.account,
};

export const CLIENT_API_ROUTES = {};
