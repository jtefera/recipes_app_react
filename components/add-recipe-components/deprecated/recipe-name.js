import React from 'react' 
import ReactDOM from 'react-dom'

class BasicInfo extends React.Component {
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
			<div class="BasicInfo form slide">
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

export default BasicInfo