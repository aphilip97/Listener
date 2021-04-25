import React from 'react';
import ReactDOM from 'react-dom';
import { ListenMessage } from '../types';

import App from './App';

chrome.runtime.onMessage.addListener((msg: ListenMessage) => {
  ReactDOM.render(
    <React.StrictMode>
      <App listen={msg} />
    </React.StrictMode>,
    document.body,
  );
});
