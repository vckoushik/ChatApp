import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
