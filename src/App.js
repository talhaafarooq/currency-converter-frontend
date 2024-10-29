import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import CurrencyConverter from './pages/CurrencyConverter';

// import layouts
import GuestLayout from './layouts/GuestLayout';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

// Context APi
import { AlertProvider } from './context/AlertContext';
import { LocalStorageProvider } from './context/LocalStorageContext';

// Admin Routes
import Dashboard from './pages/admin/Dashboard';


function App() {
  console.log(process.env.REACT_APP_BACKEND_API_URL);

  return (
    <Fragment>
      <AlertProvider>
        <LocalStorageProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<GuestLayout component={CurrencyConverter} />} />

              {/* Authentication */}
              <Route path='/login' element={<GuestLayout component={Login} />} />

              {/* Admin Dashboard */}
              <Route path='admin/dashboard' element={<AuthenticatedLayout component={Dashboard} />} />

              {/* Page Not Found || 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LocalStorageProvider>
      </AlertProvider>
    </Fragment>
  );
}

export default App;
