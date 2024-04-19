import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './routes/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error';
import Artist from './routes/artist';
import Track from './routes/track';

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'artists/:artistId',
    element: <Artist />
  },
  {
    path: 'tracks/:trackId',
    element: <Track />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={ROUTER} />
  </React.StrictMode>
);