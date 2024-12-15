import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {
  render() {
    const { books } = this.props;
    return (
      <div>
        <h1>Search Results</h1>
        {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          books.map(book => (
            <div key={book.id}>
              <h2>{book.volumeInfo.title}</h2>
              <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
              <Link to={`/book/${book.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default SearchResults;