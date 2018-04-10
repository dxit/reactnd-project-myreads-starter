import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Library from './Library'
import Search from './Search'
import {Container} from 'semantic-ui-react'

class BooksApp extends React.Component {
	state = {
		books: [],
		searchResults: [],
		isLoading: false
	};

	/**
	 * @description Gets all the books on the shelves and updates the state
	 */
	componentDidMount() {
		BooksAPI.getAll()
			.then((books) => {
				this.setState(() => ({
					books
				}));
			})
	}

	/**
	 * @description Update the book shelf with the API and update the book state
	 * @param {object} book - The book that we want update
	 * @param {string} shelf - Name of the shelf
	 */
	onUpdateShelf = (book, shelf) => {
		if (book.shelf === shelf) return;

		let bookWithNewShelf = book;
		bookWithNewShelf.shelf = shelf;

		this.setState((currentState) => ({
			books: currentState.books.filter((c) => {
				return c.id !== book.id
			}).concat(bookWithNewShelf)
		}));

		BooksAPI.update(book, shelf);
	};

	/**
	 * @description Gets the search results from the API
	 * @param {string} query - The search input
	 */
	onSearch = (query) => {
		if (query && query.length) {
			this.setState(() => ({
				isLoading: true
			}));

			BooksAPI.search(query)
				.then((results) => {
					this.setState(() => ({
						searchResults: results,
						isLoading: false
					}))
				});
		}
		// Reset searchResults to prevent to show previous results
		else {
			this.setState(() => ({
				searchResults: [],
				isLoading: false
			}))
		}
	};

	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<Container fluid={true}>
						<Library
							books={this.state.books}
							onUpdateShelf={(book, shelf) => {
								this.onUpdateShelf(book, shelf);
							}}
						/>
					</Container>
				)}/>
				<Route path="/search" render={({history}) => (
					<Container fluid={true}>
						<Search
							books={this.state.books}
							isLoading={this.state.isLoading}
							searchResults={this.state.searchResults}
							onSearch={(query) => {
								this.onSearch(query);
							}}
							onUpdateShelf={(book, shelf) => {
								this.onUpdateShelf(book, shelf);
							}}
						/>
					</Container>
				)}/>
			</div>
		)
	}
}

export default BooksApp
