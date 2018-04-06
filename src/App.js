import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import Search from './Search'

class BooksApp extends React.Component {
	state = {
		books: [],
		searchResults: []
	};

	componentDidMount() {
		BooksAPI.getAll()
			.then((books) => {
				this.setState(() => ({
					books
				}))
			})
	}

	onUpdateShelf = (book, shelf) => {
		BooksAPI.update(book,shelf)
			.then(() => this.componentDidMount())
	};

	onSearch = (query) => {
		if(query && query.length) {
			BooksAPI.search(query)
				.then((results) => {
					this.setState(() => ({
						searchResults: results
					}))
				});
		}
	};

	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<Library
						books={this.state.books}
						onUpdateShelf={(book, shelf) => {
							this.onUpdateShelf(book, shelf);
						}}
					/>
				)}/>
				<Route path="/search" render={({history}) => (
					<Search
						books={this.state.books}
						searchResults={this.state.searchResults}
						onSearch={(query) => {
							console.log(query);
							this.onSearch(query);
						}}
						onUpdateShelf={(book, shelf) => {
							this.onUpdateShelf(book, shelf);
						}}
					/>
				)}/>
			</div>
		)
	}
}

export default BooksApp
