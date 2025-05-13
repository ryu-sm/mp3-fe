import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { RootRoutes } from 'src/routes';
import { MUIThemeProvider } from 'src/theme';

// import App from './tree';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ToastContainer autoClose={2000} />
      <MUIThemeProvider>
        {/* <App /> */}
        <BrowserRouter>
          <RootRoutes />
        </BrowserRouter>
      </MUIThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
