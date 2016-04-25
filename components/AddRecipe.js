//Main component of the  recipeApp
// import is the new way of doing require('react')
//This will do with the creation of a new recipe
import React from 'react' 
import ReactDOM from 'react-dom'

import Welcome from './add-recipe-components/welcome'
import RecipeName from './add-recipe-components/recipe-name'
import Ingredients from './add-recipe-components/ingredients'
import Steps from './add-recipe-components/steps'
import Pagination from './add-recipe-components/pagination'

/*
	App
		Menu Bar
			Add Recipe
				Page
				Pagination
			Recipes
			Search recipes
*/

var numSteps = 5;

class Page extends React.Component {
	render() {
		var stepNum = this.props.step;
		switch(stepNum) {
			case 1:
				return (
					<Welcome />
				);
			case 2:
				return (
					<RecipeName 
						recipe={this.props.recipe} 
						updaterProp={this.props.updaterProp}
					/>
				);
			case 3:
				return (
					<Ingredients 
						recipe={this.props.recipe} 
						updaterProp={this.props.updaterProp}
					/>
				);
			case 4:
				return (
					<Steps 
						recipe={this.props.recipe} 
						updaterProp={this.props.updaterProp}
					/>
				);
			default:
				return (
					<div> Nada de nada </div>
				);
		}
	}
}


class AddRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 3,
			recipe: {
				name: "Pasta alla Carbonara",
				ingredients: [],
				steps: [{text: "test 1 2 3"}]
			}
		}
	}
	changePageHandler(page) {
		this.setState({
			step: page
		})
	}
	changePropRecipeHandler(obj) {
		var newRecipe = this.state.recipe;
		newRecipe[obj.name] = obj.value;
		this.setState({
			recipe: newRecipe
		})
	}
	render() {
		return (
			<div>
				<Page 
					step={this.state.step} 
					recipe={this.state.recipe} 
					updaterProp={this.changePropRecipeHandler.bind(this)}
				/>
				<Pagination 
					step={this.state.step} 
					changePage={this.changePageHandler.bind(this)}
				/>
			</div>
		);
	}
}

export default AddRecipe
