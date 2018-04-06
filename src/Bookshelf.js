import React, {Component} from 'react'
import PropType from "prop-types";
import Book from './Book'

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
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{bookshelf.map((book) => (
							<Book
								key={book.id}
								books={books}
								book={book}
								onUpdateShelf={onUpdateShelf}
							/>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Bookshelf