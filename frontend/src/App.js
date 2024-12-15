import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import AddEditBook from './components/AddEditBook';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/add-book">Add Book</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search-results" component={SearchResults} />
            <Route path="/book/:id" component={BookDetails} />
            <Route path="/add-book" component={AddEditBook} />
            <Route path="/edit-book/:id" component={AddEditBook} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;