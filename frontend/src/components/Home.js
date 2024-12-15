import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      books: []
    };
  }

  handleSearch = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.search}`)
      .then(response => {
        this.setState({ books: response.data.items });
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Book Management System</h1>
        <input 
          type="text" 
          placeholder="Search for books..." 
          value={this.state.search} 
          onChange={e => this.setState({ search: e.target.value })} 
        />
        <button onClick={this.handleSearch}>Search</button>
        <div>
          {this.state.books.map(book => (
            <div key={book.id}>
              <h2>{book.volumeInfo.title}</h2>
              <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;