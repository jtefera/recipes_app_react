//Main component of the  recipeApp
// import is the new way of doing require('react')
//This will do with the creation of a new recipe
import React from 'react' 
import ReactDOM from 'react-dom'

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

class Welcome extends React.Component {
	render() {
		return (
			<div class="welcome slide">
				We are going to create a receipe!
			</div>
		)
	}
}
class RecipeName extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			recipeName : ""
		}
	}
	updateName(e) {
		this.setState({
			recipeName: e.target.value
		});
		this.props.updaterProp({
			name: "name",
			value: e.target.value
		})

	}
	render() {
		return (
			<div class="recipe-name form slide">
				Receipe Name: 
				<form>
					<input 
						type="text" 
						placeholder="your recipe name" 
						onChange={this.updateName.bind(this)} 
						value={this.props.recipe.name || ""}
					/>
				</form>
			</div>
		)
	}
}

class AddIngredientForm extends React.Component {
	constructor(){
		super();
		this.state = {
			name: "",
			quantity: ""
		}
	}
	updateIngredient(e) {
		let ingredientName = e.target.value;
		this.setState({
			name: ReactDOM.findDOMNode(this.refs.name).value,
			quantity: ReactDOM.findDOMNode(this.refs.quantity).value,
		})
	}
	addIngredient(e) {
		e.preventDefault();
		let ingredient = {
			name: ReactDOM.findDOMNode(this.refs.name).value,
			quantity: ReactDOM.findDOMNode(this.refs.quantity).value,
		}
		this.setState({
			name: "",
			quantity: "",
		})
		this.props.addIngredient(ingredient);
	}
	render() {
		return (
			<form>
				<h3>Name of the ingredient:</h3> <br /> 
				<input
					ref="name" 
					type="text" 
					value={this.state.name}
					onChange={this.updateIngredient.bind(this)}
					placeholder="Eg: Tomato, rice, chopped onions"
				/> 
				<br />
				<h3>Quantity</h3> <br /> 
				<input 
					ref="quantity"
					type="text" 
					value={this.state.quantity}
					onChange={this.updateIngredient.bind(this)}
					placeholder="Eg: 1Kg, 1 glass, Half liter"
				/> <br />
				<button onClick={this.addIngredient.bind(this)}>+</button>

			</form>
		);
	}
}
class IngredientsList extends React.Component {
	render() {
		let ingredientRows = this.props.ingredientList.map( (ingredient, index) => {
			return (
				<tr key={index}>
					<td>
						{ingredient.quantity} {ingredient.measurmentUnit} of {ingredient.name}
					</td>
				</tr>
			);
		})
		return (
			<div>
				<table>
					<tbody>
						{ingredientRows}
					</tbody>
				</table>
			</div>
		);
	}
}
class Ingredients extends React.Component {
	//It has to show a list of all the ingredients added
	//And allow to add more ingredients
	//Ingredients is an array formed by different ingredient
	//Each ingredient is an object with properties
		//name, quantity, type quantity, measurment unit

	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = {
			ingredients: this.props.recipe.ingredients || []
		}
	} 

	update() {
		let ingredients = this.state.ingredients;
		this.props.updaterProp({
			name: "ingredients",
			value: ingredients
		})
	}

	addIngredientHandler(ingredient) {
		let ingredients = this.state.ingredients;
		ingredients.push(ingredient);
		console.log("ingredients",ingredients, ingredient);
		this.setState({
			"ingredients": ingredients
		});

		this.props.updaterProp({
			name: "ingredients",
			value: ingredients
		});
	}

	render() {
		return (
			<div class="recipe-ingredients form slide">
				<IngredientsList ingredientList={this.props.recipe.ingredients}/>
				<AddIngredientForm addIngredient={this.addIngredientHandler.bind(this)}/>
			</div>
		)
	}
}

class AddStepsForm extends React.Component {
	//Steps
	constructor(){
		super();
		this.state = {
			text: ""
		}
	}
	updateStep(e) {
		let stepName = e.target.value;
		this.setState({
			text: ReactDOM.findDOMNode(this.refs.step).value,
		})
	}
	addStep(e) {
		e.preventDefault();
		let step = {
			text: ReactDOM.findDOMNode(this.refs.step).value
		}
		this.setState({
			text: ""
		})
		this.props.addStep(step);
	}
	render() {
		return (
			<form>
				<h3>Step</h3> <br /> 
				<input
					ref="step" 
					type="text" 
					value={this.state.text}
					onChange={this.updateStep.bind(this)}
					placeholder="Fry in a pan, chop the tomatoes, mix the eggs"
				/> 
				<br />
				<button onClick={this.addStep.bind(this)}>+</button>

			</form>
		);
	}
}
//StepsList
class StepsList extends React.Component {
	render() {
		console.log("stepList",this.props.stepList)
		let stepRows = this.props.stepList.map( (step, index) => {
			console.log("step",step);
			return (
				<tr key={index}>
					{step.text}
				</tr>
			);
		});
		console.log("stepRows",stepRows);
		return (
			<table>
				<tbody>
					{stepRows}
				</tbody>
			</table>
		);
	
	}
}
class Steps extends React.Component {
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = {
			steps: this.props.recipe.steps || []
		}
	} 

	update() {
		let steps = this.state.steps;
		this.props.updaterProp({
			name: "steps",
			value: steps
		})
	}

	addStepHandler(step) {
		let steps = this.state.steps;
		steps.push(step);
		console.log("steps",steps, step);
		this.setState({
			"steps": steps
		});

		this.props.updaterProp({
			name: "steps",
			value: steps
		});
	}

	render() {
		return (
			<div class="recipe-steps form slide">
				<StepsList stepList={this.props.recipe.steps}/>
				<AddStepsForm addStep={this.addStepHandler.bind(this)}/>
			</div>
		)
	}
}

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
class Pagination extends React.Component {
	constructor(props) {
		super(props);
	}
	nextPageHandler() {
		console.log("next");
		this.props.changePage(Number(this.props.step) + 1);
	}
	prevPageHandler() {
		console.log("prev");
		this.props.changePage(Number(this.props.step) - 1);
	}
	render() {
		var step = this.props.step;
		if(step < numSteps && step>1) {
			return (
				<div class="Pagination">
					<button 
						id="previousBut" 
						onClick={this.prevPageHandler.bind(this)}>
							Previous Step
					</button>
					<button 
						id="nextBut" 
						onClick={this.nextPageHandler.bind(this)}>
							Next Step
					</button>
				</div>
			);
		} else if(step>1) {
			//but >= than numSteps
			//Solo previous
			return (
				<div class="Pagination">
					<button 
						id="previousBut" 
						onClick={this.prevPageHandler.bind(this)}>
							Previous Step
					</button>
				</div>
			);
		} else if(step < numSteps) {
			//but <= 0
			//Solo next
			return (
				<div class="Pagination">
					<button 
						id="nextBut" 
						onClick={this.nextPageHandler.bind(this)}>
							Next Step
					</button>
				</div>
			);
		}
		return (
			<div class="Pagination">
				
			</div>
		)
	}
}

class AddRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			recipe: {
				name: "Pasta alla Carbonara",
				ingredients: [],
				steps: []
			}
		}
	}
	changePageHandler(page) {
		console.log("step in change:", this.state.step, page);
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
		//console.log(this.state.recipe);
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
