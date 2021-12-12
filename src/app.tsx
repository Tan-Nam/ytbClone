import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Watch, Trending, NotFound, Landing } from './page/index';
import 'react-toastify/dist/ReactToastify.css';
import './style/index.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Landing} exact />
        <Route path='/home' component={Home} exact />
        <Route path='/trending' component={Trending} exact />
        <Route path='/watch/:videoId' component={Watch} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
