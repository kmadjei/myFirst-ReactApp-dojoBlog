// components imported from current folder directory
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

// React router dom components imported
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    /* 
      <BrowserRouter>
      A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
     */
    <Router> 
      <div className="App">
        <Navbar />
        <div className="content">
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            {/* "exact" checks if url route matches */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            {/* " * " --> catches any other routes not found in url path  */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
