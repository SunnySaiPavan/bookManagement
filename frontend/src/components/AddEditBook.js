import React, { Component } from 'react';

class AddEditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      genre: '',
      pages: '',
      publishedDate: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle book addition or editing logic
    console.log('Form submitted:', this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={this.state.author}
          onChange={(e) => this.setState({ author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={this.state.genre}
          onChange={(e) => this.setState({ genre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Pages"
          value={this.state.pages}
          onChange={(e) => this.setState({ pages: e.target.value })}
        />
        <input
          type="date"
          value={this.state.publishedDate}
          onChange={(e) => this.setState({ publishedDate: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AddEditBook;