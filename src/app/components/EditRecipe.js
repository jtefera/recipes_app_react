import React from 'react'
import ReactDOM from 'react-dom'

import BasicInfo from './add-recipe-components/basic-info'
import Ingredients from './add-recipe-components/ingredients'
import Steps from './add-recipe-components/steps'
import Pagination from './add-recipe-components/pagination'
import Review from './add-recipe-components/review'

/*
	App
		Add Recipe
			Page
				switch(step){//Depending on the step
					0: Welcome //Introductory test to start
					1: BasicInfo //Sets:
						Name
						Difficulty of the recipe
						Duration
						Num of plates
					2: Ingredients
						IngredientsList
							Ingredient
								IngredientQuantity
								IngredientName
								Btns
									ModifyBtn
									DeleteBtn
						AddIngredientForm



				}
			Pagination
				//Contains the previous and the next buttons
*/

class Page extends React.Component {
	render() {
		switch(this.props.stepName) {
			case "welcome":
				return (
					<Welcome />
				);
			case "basicinfo":
				return (
					<BasicInfo
						basicInfo={this.props.recipe.basicInfo}
						updaterProp={this.props.updaterProp}
					/>
				);
			case "ingredients":
				return (
					<Ingredients
						ingredients={this.props.recipe.ingredients}
						updaterProp={this.props.updaterProp}
						modifyIngredientHandler={this.props.modifyIngredientHandler}
					/>
				);
			case "steps":
				return (
					<Steps
						steps={this.props.recipe.steps}
						updaterProp={this.props.updaterProp}
						modifyStepHandler={this.props.modifyStepHandler}
					/>
				);
      default:
				return (
					<Review
						recipe={this.props.recipe}
						saveRecipeHandler={this.props.saveRecipeHandler}
					/>
				);
		}
	}
}


class EditRecipe extends React.Component {
	constructor(props) {
		super(props);
		var initialStep = 0;
    var stepsNames = ['basicinfo', 'ingredients', 'steps', 'review'];
    this.stepsNames = stepsNames;
		this.state = {
			step: initialStep,
      stepName: stepsNames[initialStep],
			recipe: this.props.recipeFocused
		};
	}
	changePageHandler(page) {
    let stepsNames = this.stepsNames;
		this.setState({
			step: page,
      stepName: stepsNames[page]
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
	modifyStepHandler(key, newValue) {
		let recipe = this.state.recipe;
		if(newValue === undefined){
			//Delete ingredient
			recipe.steps.splice(key, 1);
		} else {
			//Modify ingredient s
			recipe.steps[key] = newValue;
		}
		this.setState({
			'recipe': recipe
		});
	}
	saveRecipeHandler(recipe) {
		let idRecipe = this.props.idRecipeFocused;
	  this.props.saveEditedRecipe(idRecipe, recipe);
	}
	render() {
		return (
			<div>
				<Page
					stepName={this.state.stepName}
					recipe={this.state.recipe}
					updaterProp={this.changePropRecipeHandler.bind(this)}
					modifyIngredientHandler={this.modifyIngredientHandler.bind(this)}
					modifyStepHandler={this.modifyStepHandler.bind(this)}
					saveRecipeHandler={this.saveRecipeHandler.bind(this)}
				/>
				<Pagination
					step={this.state.step}
          numSteps={this.stepsNames.length}
					changePage={this.changePageHandler.bind(this)}
				/>
			</div>
		);
	}
}

export default EditRecipe
