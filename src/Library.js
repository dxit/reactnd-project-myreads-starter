import React, {Component} from 'react'
import PropType from 'prop-types'
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf'

class Library extends Component {
	static propTypes = {
		books: PropType.array.isRequired,
		onUpdateShelf: PropType.func.isRequired
	};

	render() {
		const {books, onUpdateShelf} = this.props;

		const currentlyReading = books.filter((c) => (
			c.shelf.includes('currentlyReading')
		));

		const wantToRead = books.filter((c) => (
			c.shelf.includes('wantToRead')
		));

		const read = books.filter((c) => (
			c.shelf.includes('read')
		));

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Bookshelf
							title='Currently Reading'
							bookshelf={currentlyReading}
							onUpdateShelf={onUpdateShelf}
							books={books}
						/>
						<Bookshelf
							title='Want to Read'
							bookshelf={wantToRead}
							onUpdateShelf={onUpdateShelf}
							books={books}
						/>
						<Bookshelf
							title='Read'
							bookshelf={read}
							onUpdateShelf={onUpdateShelf}
							books={books}
						/>
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
}

export default Library;