import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Search extends Component {
	state = {
		query: ''
	};

	updateQuery = (query) => {
		this.setState(() => ({
			query: query.trim()
		}));
	};

	getShelf = (bookId) => {
		let book = this.props.books.find((data) => data.id === bookId);
		return book ? book.shelf : 'none';
	};

	handleUpdate = (book, shelf) => {
		if (this.props.onUpdateShelf) this.props.onUpdateShelf(book, shelf);
	};

	handleSearch = (query) => {
		if (this.props.onSearch) this.props.onSearch(query);
	};

	render() {
		const {query} = this.state;
		const {searchResults} = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
		                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
		                  You can find these search terms here:
		                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

		                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
		                  you don't find a specific author or title. Every search is limited by search terms.
		                */}
						<input type="text" placeholder="Search by title or author" onChange={(event) => {
							this.handleSearch(event.target.value);
							this.updateQuery(event.target.value);
						}}/>

					</div>
				</div>
				<div className="search-books-results">
					{query && query.length && searchResults.length ? (
						<ol className="books-grid">
							{searchResults.map((book) => (
								<li key={book.id}>
									<div className="book">
										<div className="book-top">
											<div className="book-cover" style={{
												width: 128,
												height: 193,
												backgroundSize: 'cover',
												backgroundPosition: 'center center',
												backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : 'https://images-na.ssl-images-amazon.com/images/G/01/author-pages/no-profile-image-placeholder-na._UX250_.png'}")`
											}}></div>
											<div className="book-shelf-changer">
												<select value={book.shelf ? book.shelf : this.getShelf(book.id)} onChange={(event) => this.handleUpdate(book, event.target.value)}>
													<option value="null" disabled>Move to...</option>
													<option value="currentlyReading">Currently Reading</option>
													<option value="wantToRead">Want to Read</option>
													<option value="read">Read</option>
													<option value="none">None</option>
												</select>
											</div>
										</div>
										<div className="book-title">{book.title}</div>
										<div className="book-authors">{book.authors && book.authors.join(', ')}</div>
									</div>
								</li>
							))}
						</ol>
					) : ('')}
				</div>
			</div>
		)
	}
}

export default Search