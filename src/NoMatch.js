import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Container, Header, Button, Icon} from 'semantic-ui-react'

class NoMatch extends Component {
	render() {

		return (
			<Container textAlign="center">
				<Header as="h1">404</Header>
				<Header as="h3">Page not found!</Header>
				<Button as={Link} to="/" icon labelPosition='left'>
					<Icon name='arrow left' />
					Go Back
				</Button>
			</Container>
		)
	}
}

export default NoMatch