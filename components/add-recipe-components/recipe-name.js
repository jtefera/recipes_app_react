import React from 'react' 
import ReactDOM from 'react-dom'

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

export default RecipeName