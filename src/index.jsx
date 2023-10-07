import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserContextProvider from './components/Context/Context';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import { CreateContextProvider } from './components/Context/CartContext';
import { WishContextProvider } from './components/Context/WishContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();
root.render(
    
    <QueryClientProvider client={queryClient}>   
   
   <UserContextProvider>
   <CreateContextProvider>
   <WishContextProvider>
    <App />
    </WishContextProvider> 
    </CreateContextProvider>
    </UserContextProvider>
   
    <ReactQueryDevtools initialIsOpen='false' position='bottom-right' />
    <Toaster/>
    </QueryClientProvider>

);

