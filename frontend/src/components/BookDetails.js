import React, { Component } from 'react';

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ book: data.volumeInfo }))
      .catch(error => console.error(error));
  }

  render() {
    const { book } = this.state;
    if (!book) return <p>Loading...</p>;

    return (
      <div>
        <h1>{book.title}</h1>
        <p>Author: {book.authors ? book.authors.join(', ') : 'Unknown'}</p>
        <p>Genre: {book.categories ? book.categories.join(', ') : 'Unknown'}</p>
        <p>Pages: {book.pageCount}</p>
        <p>Published: {book.publishedDate}</p>
      </div>
    );
  }
}

export default BookDetails;