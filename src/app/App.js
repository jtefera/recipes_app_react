//Main component of the  recipeApp
// import is the new way of doing require('react')
//This will do with the creation of a new recipe
import React from 'react' 
import ReactDOM from 'react-dom'
import AddRecipe from './components/AddRecipe'

/*
	App
		Menu Bar
			Add Recipe
				Page
				Pagination
			Recipes
			Search recipes
*/

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<AddRecipe />
			</div>
		);
	}
}

ReactDOM.render(
	<App/>, 
	document.getElementById('app')
);

export default App
