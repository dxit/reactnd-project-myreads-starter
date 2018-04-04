import React from 'react'
import {Route} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './Shelves'
import Search from './Search'

class BooksApp extends React.Component {
	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => (
					<Shelves/>
				)}/>
				<Route exact path="/search" render={({history}) => (
					<Search/>
				)}/>
			</div>
		)
	}
}

export default BooksApp
