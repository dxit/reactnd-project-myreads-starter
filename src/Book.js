import React, {Component} from 'react'
import PropType from "prop-types";

class Book extends Component {
	static propTypes = {
		books: PropType.array.isRequired,
		book: PropType.object.isRequired,
		onUpdateShelf: PropType.func.isRequired
	};

	/**
	 * @description Get the information about the shelf of the book
	 * @param {object} bookId - ID of the book
	 * @return {string} - Shelf of the book
	 */
	getShelf = (bookId) => {
		let book = this.props.books.find((data) => data.id === bookId);
		return book ? book.shelf : 'none';
	};

	/**
	 * @description Update the status of the book
	 * @param {object} book - The book that we want update
	 * @param {string} shelf - Name of the shelf
	 */
	handleUpdate = (book, shelf) => {
		if (this.props.onUpdateShelf) this.props.onUpdateShelf(book, shelf);
	};

	render() {
		const {book} = this.props;

		return(
			<li>
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
							<select value={book.shelf || this.getShelf(book.id)} onChange={(event) => this.handleUpdate(book, event.target.value)}>
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
		)
	}
}

export default Book;