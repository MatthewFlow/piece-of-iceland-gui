import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route element={<PublicRoutes />} errorElement={<ErrorPage />}>
        <Route
          index
          element={<LoginPage />}
          handle={{
            title: 'Login',
            meta: [{ name: 'description', content: 'Login to access your parcels' }],
          }}
        />
        <Route
          path="login"
          element={<LoginPage />}
          handle={{
            title: 'Login',
            meta: [{ name: 'description', content: 'Login to access your parcels' }],
          }}
        />
        <Route
          path="register"
          element={<RegisterPage />}
          handle={{
            title: 'Register',
            meta: [{ name: 'description', content: 'Create a new account' }],
          }}
        />
      </Route>

      <Route element={<PrivateRoutes />} errorElement={<ErrorPage />}>
        <Route
          path="dashboard"
          element={<DashboardPage />}
          handle={{
            title: 'Dashboard',
            meta: [{ name: 'description', content: 'Your virtual land dashboard' }],
          }}
        />
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
        handle={{
          title: '404 Not Found',
          meta: [{ name: 'robots', content: 'noindex' }],
        }}
      />
    </Route>
  )
);
