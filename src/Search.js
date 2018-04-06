import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropType from "prop-types";

class Search extends Component {
	static propTypes = {
		books: PropType.array.isRequired,
		searchResults: PropType.array.isRequired,
		onSearch: PropType.func.isRequired,
		onUpdateShelf: PropType.func.isRequired
	};

	state = {
		query: ''
	};

	/**
	 * @description Update the status on the query on input entry
	 * @param {string} query - The search input
	 */
	updateQuery = (query) => {
		this.setState(() => ({
			query: query.trim()
		}));
	};

	/**
	 * @description Handle the onSearch function
	 * @param {string} query - The search input
	 */
	handleSearch = (query) => {
		if (this.props.onSearch) this.props.onSearch(query);
	};

	render() {
		const {query} = this.state;
		const {searchResults, books, onUpdateShelf} = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
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
								<Book
									key={book.id}
									books={books}
									book={book}
									onUpdateShelf={onUpdateShelf}
								/>
							))}
						</ol>
					) : ('')}
				</div>
			</div>
		)
	}
}

export default Search