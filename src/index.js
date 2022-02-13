import AppRoot from './components/Root';
import { h, renderDOM } from './engine/engine';

const App = new AppRoot();
const appRoot = document.getElementById('app');
App.start(appRoot);
