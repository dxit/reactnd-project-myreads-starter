import React, {Component} from 'react'
import PropType from "prop-types";
import {Card, Icon, Dropdown, Grid, Rating, Divider, Menu} from 'semantic-ui-react'

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
		const shelfOptions = [
			{
				text: 'Move to...',
				value: 'null',
				disabled: true
			},
			{
				text: 'Currently Reading',
				value: 'currentlyReading'
			},
			{
				text: 'Want to Read',
				value: 'wantToRead'
			},
			{
				text: 'Read',
				value: 'read'
			},
			{
				text: 'None',
				value: 'none'
			}
		];
		const currentShelf = book.shelf || this.getShelf(book.id);
		const labelCurrentShelf = shelfOptions.filter((c) => {return c.value === currentShelf});

		return (
			<Card>
				<div className="book-cover" style={{
					width: 100,
					height: 150,
					margin: '20px auto',
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
					backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : 'https://images-na.ssl-images-amazon.com/images/G/01/author-pages/no-profile-image-placeholder-na._UX250_.png'}")`
				}}></div>
				<Card.Content>
					<Card.Header>
						{book.title}
					</Card.Header>
					<Card.Meta>
						{book.authors ? book.authors.join(', ') : '-'}
					</Card.Meta>
					<Card.Description>
						Category: {book.categories ? book.categories.join(', ') : '-'}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column>
								<Icon name="file"/>Pages: {book.pageCount}
							</Grid.Column>
							<Grid.Column textAlign="right">
								<Rating icon="star" defaultRating={book.averageRating} maxRating={5} disabled/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Card.Content>
				<Card.Content extra>
					<Divider horizontal>Shelf</Divider>
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column>
								{labelCurrentShelf[0].text}
							</Grid.Column>
							<Grid.Column>
								<Menu compact>
									<Dropdown text="Move to" simple fluid item options={shelfOptions} value={currentShelf} onChange={(event, data) => this.handleUpdate(book, data.value)}/>
								</Menu>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Card.Content>
			</Card>
		)
	}
}

export default Book;