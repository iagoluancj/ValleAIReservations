import React from 'react';
import "../src/styles/global.css";
import Form from './components/Form';
import { AppContainer } from './styles/stylesApp';
import ToastProvider from './lib/ToastProvider';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AppContainer>
      <ToastProvider>
        <Form />
      </ToastProvider>
    </AppContainer>
  );
}

export default App;
