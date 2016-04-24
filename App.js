//Main component of the  recipeApp
// import is the new way of doing require('react')
//This will do with the creation of a new recipe
import React from 'react' 
import ReactDOM from 'react-dom'

/*
	App
		Page
		Pagination
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

var welcomeName = "Welcome";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			recipe: {
				name: "Pasta alla Carbonara",
				ingredients: ["tomate"]
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

ReactDOM.render(
	<App/>, 
	document.getElementById('app')
);

export default App
