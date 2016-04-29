import React from 'react';
import AllRecipeInfo from './all-recipe-info'

class SaveBtn extends React.Component {
	constructor(props) {
		super(props);
	}

	saveRecipe() {
		let recipe = this.props.recipe;
		this.props.saveRecipeHandler(recipe);
	}

	render() {
		return (
			<button
				className="saveRecipeBtn btn btn-info"
				onClick={this.saveRecipe.bind(this)}
			>
				Save recipes!
			</button>
		)
	}
}

export default class Review extends React.Component {
	render() {
		return (
			<div className="review">
				<AllRecipeInfo recipe={this.props.recipe} />
				<hr />
				<SaveBtn
					recipe={this.props.recipe}
					saveRecipeHandler={this.props.saveRecipeHandler}
				/>
			</div>
		);
	}
}
