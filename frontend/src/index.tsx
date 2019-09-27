import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './Routes';
import * as serviceWorker from './serviceWorker';

const mount = document.getElementById('root');

interface abc{
    history:any
}

var mountNode = document.getElementById("root");

ReactDOM.render(<AppRouter/>, mountNode);

//ReactDOM.render(<App/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();




