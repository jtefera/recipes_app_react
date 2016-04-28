import React from 'react';

const ABasicInfo = (props) => <tr><td><b>{props.nameinfo}</b><br /> {props.info}</td></tr>;

class ShowBasicInfo extends React.Component {
	render() {
		let basicInfo = this.props.basicInfo;
		return (
			<div className="basicInfo">
				<h3> Basic Info </h3>
				<table>
					<tbody>
						<ABasicInfo nameinfo="Recipe Name" info={basicInfo.name} />
						<ABasicInfo nameinfo="Duration" info={basicInfo.duration + "min"} />
						<ABasicInfo nameinfo="Dificulty Level" info={basicInfo.difficulty + "/5"} />
						<ABasicInfo nameinfo="Number of plates" info={basicInfo.numPlates} />
					</tbody>
				</table>
			</div>
		);
	}
}



class ShowIngredients extends React.Component {
	render() {
		let ingredientsRows = this.props.ingredients.map((ingredient, index) => {
			return (
				<tr key={index}>
					<td>
						{ingredient.quantity} of {ingredient.name}
					</td>
				</tr>
			);
		})
		return (
			<div className="showIngredients">
				<h3> Ingredients </h3>
				<table>
					<tbody>
						{ingredientsRows}
					</tbody>
				</table>
			</div>
		);
	}
}

class ShowSteps extends React.Component {
	render(){
		let stepsRows = this.props.steps.map((step, index) => {
			return (
				<tr key={index}>
					<td>{index + 1} - {step.text}</td>
				</tr>
			);
		});
		return (
			<div className="showSteps">
				<h3> Steps </h3>	
				<table>
					<tbody>
						{stepsRows}
					</tbody>
				</table>
			</div>
		);
	}
}


export default class Review extends React.Component {
	render() {
		return (
			<div className="review">
				<ShowBasicInfo basicInfo={this.props.recipe.basicInfo} />
				<hr />
				<ShowIngredients ingredients={this.props.recipe.ingredients} />
				<hr />
				<ShowSteps steps={this.props.recipe.steps} />
			</div>
		);
	}
}
