import React from 'react'
import ReactDOM from 'react-dom'


class AddIngredientForm extends React.Component {
	/*
	Form to add a new ingredient
	App>AddRecipe>Page>Ingredients
	Props:
		addIngredient //Function. Passed from Ingredients.
						Adds the new ingredient

	*/
	constructor(){
		super();
		this.state = {
			name: "",
			quantity: ""
		}
	}
	updateIngredient(e) {
		//Input control
		let ingredientName = e.target.value;
		this.setState({
			name: ReactDOM.findDOMNode(this.refs.name).value,
			quantity: ReactDOM.findDOMNode(this.refs.quantity).value,
		})
	}
	addIngredient(e) {
		//Adds the new ingredient to the ingredients array of the main
		//recipe and cliers the input fields
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
		Called when an ingredient is being modified(change name and/or quantity)
		App>AddRecipe>Pages>Ingredients>IngredientList
		Props:
			ingredientPos //Number. It indicates the pos of the ingredient
							in the ingredients array list
			modifyIngredientHandler //Function. Passed from AddRecipe
									Allows easy updating or deletion
									of ingredient
			changeModifyingState //Function. Passed from IngredientList
									Used to show that we are modifying or
									we have finished modifying an ingredient.
									It doesn't modify the ingredient
			ingredient 	//Object. Ingredient that we are modifying
									name and quantity
			key //Equal than ingredientPos. Used as a requirement as this is
				going to be part of an array of elements
		State:
			name //new name that it is going to be asigned to the ingredient
			quantity //new quantity to be assigned to the ingredient

	*/
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.ingredient.name,
			quantity: this.props.ingredient.quantity
		};
	}
	updateInputs() {
		//Input controllers
		let ingredientName = ReactDOM.findDOMNode(this.refs.name).value,
			ingredientQuantity = ReactDOM.findDOMNode(this.refs.quantity).value;

		this.setState({
			name: ingredientName,
			quantity: ingredientQuantity
		});

	}
	saveModifications(e){
		//Sends the modifications on the ingredient
		//and stops the modifications process
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
		//Stops the modification state
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
					className="quantityIngredientInput"
					size="5"
				/> of <input
					ref="name"
					type="text"
					placeholder={ingredient.name}
					value={this.state.name}
					onChange={this.updateInputs.bind(this)}
					className="modifyIngredientInput"
					size="20"
				/>
				<br />
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
	/*	Shows the modify and delete buttons for each ingredient
		App>AddRecipe>Page>IngredientsList>
		Props:
			ingredientPos //Number. It indicates the pos of the ingredient
							in the ingredients array list
			modifyIngredientHandler //Function. Passed from AddRecipe
									Allows easy updating or deletion
									of ingredient
			changeModifyingState //Function. Passed from IngredientList
									Used to show that we are modifying or
									we have finished modifying an ingredient.
									It doesn't modify the ingredient
	*/

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
	/*
		Shows a list of all the ingredients
		App > Pages > AddRecipe > Ingredients > IngredientsList
		Props:
			ingredientList //ListOfIngredients
			modifyIngredientHandler //Function. Linked from AddRecipe
									//Used to modify or delete an ingredient
		State:
			modifyingIngredient //boolean that is setted to true when
									we are modifying an ingredient
									When we modify an ingredient
			ingredientBeingModified //index on the ingredientList array
									  of the ingredient being modifiyed

	*/
	constructor(props) {
		super(props);
		this.state = {
			modifyingIngredient: false,
			ingredientBeingModified: -1
		};
	}
	modifyingIngredient(isModifying, keyIngredient){
		//This function will be passed to children to alert when a
		//modification is being made or is finished
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
			//Case there is at least 1 ingredient

			//Array of react elements that represent each
			//ingredient as a list elemetn
			let ingredientList = this.props.ingredientList;
			let ingredientRows = ingredientList.map((ingredient, index) => {
				//Inside each ingredient
				//each ingredient is an object with the properties:
				//	name and quantity

				let state = this.state,
					modifiyingAIngredient  = state.modifyingIngredient,
					ingredientBeingModified = state.ingredientBeingModified;

				if(!modifiyingAIngredient){
					//We are not modifying anything
					//Show lists with the modify and delete buttosn:
					return (
						<tr key={index}>
							<td>
								{(ingredient.quantity) ?
									(ingredient.quantity + "of")
									: ""
								} {ingredient.name}
							</td>
							<td>
								<ModifyIngredientBtns
									ingredientPos={index}
									modifyIngredientHandler={this.props.modifyIngredientHandler}
									changeModifyingState={this.modifyingIngredient.bind(this)}
								/>
							</td>
						</tr>
					);
				} else if(ingredientBeingModified !== index){
					//In case we are modifying an ingredient but
					//not this one.
					//Show ingredient without the modify and delete buttons
					return (
						<tr key={index}>
							<td>{ingredient.quantity} of {ingredient.name}</td>
						</tr>
					);
				} else {
					//Return for the ingredient we are modifying
					//It is a form
					return (
						<tr key={index}>
							<td>
								<ModifyIngredientForm
									ingredientPos={index}
									modifyIngredientHandler={this.props.modifyIngredientHandler}
									changeModifyingState={this.modifyingIngredient.bind(this)}
									ingredient={ingredient}
								/>
							</td>
						</tr>
					);
				}
			});
			//Now that we have the array containing the return for each
			//Element, we will return the list:
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
			//Case there is no ingredients
			//Show a text inviting the person to add ingredient
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
	/*App
		AddRecipe
			Page
				Ingredients
	Props:
		ingredients //List of ingredients
		updaterProp	//Function. Recive name and prop and updates that name
						on the recipe object. On Ingredients, this
						function will be used to update the ingredients
						properties with new additions, modifications or
						deletions of the recipe ingredients list
		modifyIngredientHandler //Function used for the modification or
									deletion of a single ingredient.
									Easier than the previous one
	State:
		ingredients: //List of ingredients
	//It has to show a list of all the ingredients added
	//And allow to add more ingredients
	//Ingredients is an array formed by different ingredient
	//Each ingredient is an object with properties
		//name, quantity, type quantity, measurment unit

	*/

	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = {
			ingredients: this.props.ingredients || []
		}
	}

	update() {
		//Updates the ingredients of this component into the
		//ingredients property of the main recipe
		let ingredients = this.state.ingredients;
		this.props.updaterProp({
			name: "ingredients",
			value: ingredients
		})
	}

	addIngredientHandler(ingredient) {
		//Adding ingredient to the main recipe ingredients property
		let ingredients = this.state.ingredients;
		ingredients.push(ingredient);
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
