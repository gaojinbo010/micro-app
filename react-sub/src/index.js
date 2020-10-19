import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './public-path';

const render = (props) => {
  console.log(props);
  const { container } = props;
  console.log(container)
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container ? container.querySelector('#root') : document.getElementById('root')
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export const bootstrap = async () => {
  console.log('react app bootstraped');
}

export const mount = async (props) => {
  console.log('react app props from main framework', props);
  render(props);
}

export const unmount = async (props) => {
  console.log('react app unmount', props);
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
