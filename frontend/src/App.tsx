import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Home, ProductDetail, Cart,Favorite, Signin, Signup } from './_root/pages';
import RootLayout from "./_root/pages/RootLayout";
import './globals.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer hideProgressBar position='bottom-right'/>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App;
