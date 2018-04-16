import React from 'react'
import PropType from "prop-types";
import Book from './Book'
import {Header, Card, Divider} from 'semantic-ui-react'

const Bookshelf = (props) => {
	return (
		<div className="bookshelf">
			<Header as="h2" dividing>{props.title}</Header>
			{props.bookshelf.length ? (
				<Card.Group>
					{props.bookshelf.map((book) => (
						<Book
							key={book.id}
							books={props.books}
							book={book}
							onUpdateShelf={props.onUpdateShelf}
						/>
					))}
				</Card.Group>
			) : (
				<Divider horizontal>No Books</Divider>
			)}
		</div>
	)
};

Bookshelf.propTypes = {
	title: PropType.string.isRequired,
	bookshelf: PropType.array.isRequired,
	books: PropType.array.isRequired,
	onUpdateShelf: PropType.func.isRequired
};

export default Bookshelf