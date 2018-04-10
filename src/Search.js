import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropType from "prop-types";
import {Card, Divider, Button, Input, Icon} from 'semantic-ui-react'

class Search extends Component {
	static propTypes = {
		books: PropType.array.isRequired,
		isLoading: PropType.bool,
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
		const {searchResults, isLoading, books, onUpdateShelf} = this.props;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<div className="search-books-input-wrapper">
						<Input loading={isLoading} action={
							<Button animated as={Link} to="/">
								<Button.Content hidden>
									Back
								</Button.Content>
								<Button.Content visible>
									<Icon name="arrow left"/>
								</Button.Content>
							</Button>} actionPosition="left" placeholder="Search by title or author" fluid onChange={(event) => {
							this.handleSearch(event.target.value);
							this.updateQuery(event.target.value);
						}}/>
					</div>
				</div>
				<div className="search-books-results">
					{query && query.length && searchResults.length ? (
						<div>
							<Divider/>
							<Card.Group>
								{searchResults.map((book) => (
									<Book
										key={book.id}
										books={books}
										book={book}
										onUpdateShelf={onUpdateShelf}
									/>
								))}
							</Card.Group>
						</div>
					) : ('')}
				</div>
			</div>
		)
	}
}

export default Search