import React, {Component} from 'react'
import PropType from "prop-types";
import Book from './Book'
import {Header, Card} from 'semantic-ui-react'

class Bookshelf extends Component {
	static propTypes = {
		title: PropType.string.isRequired,
		bookshelf: PropType.array.isRequired,
		books: PropType.array.isRequired,
		onUpdateShelf: PropType.func.isRequired
	};

	render() {
		const {title, bookshelf, books, onUpdateShelf} = this.props;

		return (
			<div className="bookshelf">
				<Header as="h2" dividing>{title}</Header>
				<Card.Group>
					{bookshelf.map((book) => (
						<Book
							key={book.id}
							books={books}
							book={book}
							onUpdateShelf={onUpdateShelf}
						/>
					))}
				</Card.Group>
			</div>
		)
	}
}

export default Bookshelf