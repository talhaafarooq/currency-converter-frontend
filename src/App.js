import React, { Fragment } from 'react';
import { BrowserRouter,Routes,Route } from'react-router-dom';

// Pages
import NotFound from './pages/NotFound';
import CurrencyConverter from './pages/CurrencyConverter';

// import layouts
import GuestLayout from './layouts/GuestLayout';



function App() {
  console.log(process.env.REACT_APP_BACKEND_API_URL);
  
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GuestLayout component={CurrencyConverter} />} />
          {/* <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
