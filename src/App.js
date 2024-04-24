import Navbar from './navbar'

import MegrendeloList from './pages/megrendeloList';
import MegrendeloDetail from './pages/megrendeloDetail';
import MegrendeloForm from './pages/megrendeloForm2';

import MunkalapList from './pages/munkalapList';
import MunkalapDetail from './pages/munkalapDetail';
import MunkalapForm from './pages/munkalapForm';

import AllSheet from './pages/osszesmunkalap'
import InactiveSheet from './pages/lezartmunkalap'
import ActiveSheet from './pages/aktivmunkalap'
import NewSheet from './pages/ujmunkalap'

import Welcome from './pages/welcome'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom' 

const App = () => {
  /*
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Welcome />
      break;
    case "/viewsheet":
      component = <ViewSheet />
      break;
    case "/ujmunkalap":
      component = <NewSheet />
      break;
    case "/aktivmunkalap":
      component = <ActiveSheet />
      break;
    case "/lezartmunkalap":
      component = <InactiveSheet />
      break;
    case "/osszesmunkalap":
      component = <AllSheet />
      break;
    default:
      break;
  }
  */

  return (
    <>
      <Router>
        <Navbar />
        <div className="component">
          <Switch>

            <Route exact path="/">
              <Welcome />
            </Route>

          

            <Route path="/ujmunkalap">
              <NewSheet />
            </Route>

            <Route path="/aktivmunkalap">
              <ActiveSheet />
            </Route>

            <Route path="/lezartmunkalap">
              <InactiveSheet />
            </Route>

            <Route path="/osszesmunkalap">
              <AllSheet />
              </Route>
          <Route path="/megrendelok" exact component={MegrendeloList} />
          <Route path="/megrendelo/new" component={MegrendeloForm} />
        
          <Route path="/megrendelo/:id" component={MegrendeloDetail} />
        
          <Route path="/munkalapok" exact component={MunkalapList} />
          <Route path="/munkalapok/new" component={MunkalapForm} />
          <Route path="/munkalapok/:id/edit" component={MunkalapForm} />
          <Route path="/munkalapok/:id" component={MunkalapDetail} />
              
            

          </Switch>

        </div>
      </Router>
      
    </>
  )
}

export default App

