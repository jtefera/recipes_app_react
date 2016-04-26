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
				<h3> Add an ingredient</h3>
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

class ModifyIngredientForm extends React.Component{
	/*
		Props:
			ingredientPos={index}
			modifyIngredientHandler={this.props.modifyIngredientHandler}
			changeModifyingState={this.modifyingIngredient.bind(this)}
			ingredient={ingredient}

	*/
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.ingredient.name,
			quantity: this.props.ingredient.quantity
		};
	}
	updateInputs() {
		let ingredientName = ReactDOM.findDOMNode(this.refs.name).value,
			ingredientQuantity = ReactDOM.findDOMNode(this.refs.quantity).value;

		this.setState({
			name: ingredientName,
			quantity: ingredientQuantity
		});

	}
	saveModifications(e){
		e.preventDefault();
		let ingredientKey = this.props.ingredientPos,
			modifiedIngredient = {
			name: this.state.name,
			quantity: this.state.quantity
		};
		this.props.modifyIngredientHandler(ingredientKey, modifiedIngredient);
		this.props.changeModifyingState(false);
	}
	cancelModifications(e){
		e.preventDefault();
		this.props.changeModifyingState(false);
	}
	render() {
		let ingredient = this.props.ingredient;
		return (
			<form role="form">
				<hr />
				<input 
					ref="quantity"
					type="text"
					placeholder={ingredient.quantity}
					value={this.state.quantity}
					onChange={this.updateInputs.bind(this)}
				/> of
				<input 
					ref="name"
					type="text"
					placeholder={ingredient.name}
					value={this.state.name}
					onChange={this.updateInputs.bind(this)}
				/>
				<div className="btn-group">
					<button 
						className="btn btn-success"
						onClick={this.saveModifications.bind(this)}
						>
							Save
					</button>
					<button 
						className="btn btn-warning"
						onClick={this.cancelModifications.bind(this)}
						>
							Cancel
					</button>
				</div>
				<hr />
			</form>
		);
	}
}

class ModifyIngredientBtns extends React.Component {
	deleteIngredient() {
		this.props.modifyIngredientHandler(this.props.ingredientPos);
	}
	modifyIngredient() {
		let ingredientPos = this.props.ingredientPos;
		this.props.changeModifyingState(true, ingredientPos);
	}
	render() {
		return(
			<div className="btn-group btn-group-xs">
				<button 
					className="btn btn-default"
					onClick={this.modifyIngredient.bind(this)}
					>Modify</button>
				<button 
					className="btn btn-danger" 
					onClick={this.deleteIngredient.bind(this)}>
					Delete</button>
			</div>
		);

	}
}
class IngredientsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modifyingIngredient: false,
			ingredientBeingModified: -1
		};
	}
	modifyingIngredient(isModifying, keyIngredient){
		if(isModifying){
			this.setState({
				modifyingIngredient: true,
				ingredientBeingModified: keyIngredient
			});
		} else {
			this.setState({
				modifyingIngredient: false,
				ingredientBeingModified: -1
			});
		}
	}

	render() {
		if(this.props.ingredientList.length){
			console.log(this.props.ingredientList);
			let ingredientRows = this.props.ingredientList.map( (ingredient, index) => {
				let modifyingIngredient = this.state.modifyingIngredient,
					ingredientBeingModified = this.state.ingredientBeingModified;
				console.log(modifyingIngredient, ingredientBeingModified, index )
				if(!modifyingIngredient || ingredientBeingModified !== index){
					//In case we are not modifying anything or the ingredient being
					//modified is not this one
					return (
						<tr key={index}>
							<td>
								{ingredient.quantity} of {ingredient.name}
								<ModifyIngredientBtns 
									ingredientPos={index} 
									modifyIngredientHandler={this.props.modifyIngredientHandler}
									changeModifyingState={this.modifyingIngredient.bind(this)}
								/>
							</td>
						</tr>
					);
				} else {
					//We are modifiying and it is this ingredient
					return (
						<ModifyIngredientForm 
							ingredientPos={index}
							modifyIngredientHandler={this.props.modifyIngredientHandler}
							changeModifyingState={this.modifyingIngredient.bind(this)}
							ingredient={ingredient}
							key={index}
						/>
					);
				}
			})
			return (
				<div className="ingredientNameDiv">
					<h3>List of ingredients added:</h3>
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
			ingredients: this.props.ingredients || []
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
				<IngredientsList 
					ingredientList={this.props.ingredients} 
					modifyIngredientHandler={this.props.modifyIngredientHandler}/>
				<hr />
				<AddIngredientForm addIngredient={this.addIngredientHandler.bind(this)}/>
			</div>
		)
	}
}

export default Ingredients