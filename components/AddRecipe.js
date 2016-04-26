//Main component of the  recipeApp
// import is the new way of doing require('react')
//This will do with the creation of a new recipe
import React from 'react' 
import ReactDOM from 'react-dom'

import Welcome from './add-recipe-components/welcome'
import BasicInfo from './add-recipe-components/basic-info'
import Ingredients from './add-recipe-components/ingredients'
import Steps from './add-recipe-components/steps'
import Pagination from './add-recipe-components/pagination'
import Review from './add-recipe-components/review'

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
					<BasicInfo 
						basicInfo={this.props.recipe.basicInfo} 
						updaterProp={this.props.updaterProp}
					/>
				);
			case 3:
				return (
					<Ingredients 
						ingredients={this.props.recipe.ingredients} 
						updaterProp={this.props.updaterProp}
						modifyIngredientHandler={this.props.modifyIngredientHandler}
					/>
				);
			case 4:
				return (
					<Steps 
						steps={this.props.recipe.steps} 
						updaterProp={this.props.updaterProp}
					/>
				);
			default:
				return (
					<Review recipe={this.props.recipe} />
				);
		}
	}
}


class AddRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 4,
			recipe: {
				basicInfo: {
					name: "Pasta alla Carbonara",
					duration: 40,
					difficulty: 3,
					numPlates: 3
				},
				ingredients: [
					{
						name: "Tomate",
						quantity: "2kg"
					},
					{
						name: "Pasta",
						quantity: "500gr"
					}
				],
				steps: [
					{text: "Chop the onions"},
					{text: "Heat the oil"},
					{text: "Fry the onions"},
					{text: "Add the tomatoes"}
				]
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
		console.log(newRecipe);
		this.setState({
			recipe: newRecipe
		})
	}
	modifyIngredientHandler(key, newValue) {
		let recipe = this.state.recipe;
		if(newValue === undefined){
			//Delete ingredient
			recipe.ingredients.splice(key, 1);
		} else {
			//Modify ingredient
			recipe.ingredients[key] = newValue;
		}
		this.setState({
			'recipe': recipe
		});
	}
	render() {
		return (
			<div>
				<Page 
					step={this.state.step} 
					recipe={this.state.recipe} 
					updaterProp={this.changePropRecipeHandler.bind(this)}
					modifyIngredientHandler={this.modifyIngredientHandler.bind(this)}
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
