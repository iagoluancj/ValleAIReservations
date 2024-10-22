import React from 'react';
import "../src/styles/global.css";
import { AppContainer, GlobalStyles } from './styles/stylesApp';
import ToastProvider from './lib/ToastProvider';
import Formu from './components/Form';

function App() {
  return (
    <AppContainer>
      <GlobalStyles>
        <ToastProvider>
          <Formu />
        </ToastProvider>
      </GlobalStyles>
    </AppContainer>
  );
}

export default App;
