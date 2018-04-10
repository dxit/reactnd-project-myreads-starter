import React, {Component} from 'react'
import PropType from 'prop-types'
import {Link} from 'react-router-dom'
import Bookshelf from './Bookshelf'
import {Header, Icon, Button} from 'semantic-ui-react'

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
				<Header as="h1" icon textAlign='center'>
					<Icon name='book' circular/>
					<Header.Content>MyReads</Header.Content>
				</Header>
				<div>
					<Bookshelf
						title="Currently Reading"
						bookshelf={currentlyReading}
						onUpdateShelf={onUpdateShelf}
						books={books}
					/>
					<br/>
					<br/>
					<Bookshelf
						title="Want to Read"
						bookshelf={wantToRead}
						onUpdateShelf={onUpdateShelf}
						books={books}
					/>
					<br/>
					<br/>
					<Bookshelf
						title="Read"
						bookshelf={read}
						onUpdateShelf={onUpdateShelf}
						books={books}
					/>
				</div>
				<div className="open-search">
					<Button animated as={Link} to="/search">
						<Button.Content hidden>
							Next
						</Button.Content>
						<Button.Content visible>
							<Icon name="add"/>
						</Button.Content>
					</Button>
				</div>
			</div>
		)
	}
}

export default Library;