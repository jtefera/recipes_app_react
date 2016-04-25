import React from 'react' 
import ReactDOM from 'react-dom'


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
			<form role="form">
				<div className="form-group">
					<label for="ingredientName">Name of the ingredient:</label>
					<input
						ref="name" 
						type="text" 
						value={this.state.name}
						onChange={this.updateIngredient.bind(this)}
						placeholder="Eg: Tomato, rice, chopped onions"
						className="form-control input-lg"
					/>
				</div>
				<div className="form-group">
					<label for="quatity">Quantity</label> 
					<input 
						ref="quantity"
						type="text" 
						value={this.state.quantity}
						onChange={this.updateIngredient.bind(this)}
						placeholder="Eg: 1Kg, 1 glass, Half liter"
						className="form-control input-lg"
					/>
				</div>
				<button 
					onClick={this.addIngredient.bind(this)}
					className="btn btn-info">
					Add Ingredient!
				</button>

			</form>
		);
	}
}
class IngredientsList extends React.Component {
	render() {
		if(this.props.ingredientList.length){
			let ingredientRows = this.props.ingredientList.map( (ingredient, index) => {
				return (
					<tr key={index}>
						<td>
							{index + 1} - {ingredient.quantity} 
							{ingredient.measurmentUnit} of {ingredient.name}
						</td>
					</tr>
				);
			})
			return (
				<div className="ingredientNameDiv">
					<table className="ingredientNameDiv">
						<tbody>
							{ingredientRows}
						</tbody>
					</table>
				</div>
			);
		} else {
			return(
				<div className="ingredientNameDiv">
					<h2>Ingredients! </h2>
					Here we are going to add some ingredients to
					our recipe. 
				</div>
			);
		}
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
				<hr /	>
				<AddIngredientForm addIngredient={this.addIngredientHandler.bind(this)}/>
			</div>
		)
	}
}

export default Ingredients