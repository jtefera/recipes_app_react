import React from 'react' 
import ReactDOM from 'react-dom'

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
		let stepRows = this.props.stepList.map( (step, index) => {
			return (
				<tr key={index}>
					{step.text}
				</tr>
			);
		});
		if(this.props.stepList.length){
			return (
				<table>
					<tbody>
						{stepRows}
					</tbody>
				</table>
			);	
		} else {
			return (
				<table>
					<tbody>
						Hola
					</tbody>
				</table>
			);
		}
	
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
				<hr />
				<AddStepsForm addStep={this.addStepHandler.bind(this)}/>
			</div>
		)
	}
}

export default Steps