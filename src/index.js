import AppRoot from './components/Root.jsx';
import Engine from './engine/engine';

const App = new AppRoot();
const appRoot = document.getElementById('app');
Engine.start(appRoot, App.template());
