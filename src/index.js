import AppRoot from './components/Root';
import Engine from './engine/engine';

const App = new AppRoot();
Engine.init(App.template(), document.getElementById('app'));
