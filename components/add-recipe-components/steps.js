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
			<div className="addStepForm">
				<form role="form">
						<div className="form-group">
						<label for="stepText">Describe next step:</label>
						<input
							ref="step" 
							type="text" 
							value={this.state.text}
							onChange={this.updateStep.bind(this)}
							placeholder="Fry in a pan, chop the tomatoes, mix the eggs"
							className="form-control input-lg"
						/>
					</div> 
					<button 
						onClick={this.addStep.bind(this)}
						className="btn btn-info">
						Add Step
					</button>
				</form>
			</div>
		);
	}
}
//StepsList
class StepsList extends React.Component {
	rearrangeOrder() {
		let liNodes = this.refs.listSteps.childNodes;
		//Map not aplied here because liNodes is of type nodeList and not an array
		//nodeList elements don't have the map or forEach functions... :(
		let newOrder = [];

		for(var i=0; i<liNodes.length; i++){
			console.log(liNodes[i]);
			let text = liNodes[i].childNodes[0].innerText;
			newOrder.push({
				'text': text
			})
		}
		console.log("newOrder", newOrder);
		setTimeout((function(){
			console.log("ahora");
			this.props.updaterProp({
				name: 'steps',
				value: newOrder
			});
			console.log("ordenDespues", this.props.stepList);
		}).bind(this), 1000);
	}
	bajado(){
		console.log("click");
		console.log("orden antes", this.props.stepList);
	}
	render() {
		console.log("render", this.props.stepList);
		let stepRows = this.props.stepList.map( (step, index) => {
			console.log("renderr", index, step);
			return (
				<li key={index}>
					<span class="stepTextSpan">{step.text}</span>
					<button 
						className="sortHandle" 
						onMouseDown={this.bajado.bind(this)}
						onMouseUp={this.rearrangeOrder.bind(this)}
					>
						Move
					</button>
				</li>
			);
		});
		if(this.props.stepList.length){
			return (
				<div className="stepsList">
					<ol ref="listSteps" id="sortable">
							{stepRows}
					</ol>
				</div>
			);	
		} else {
			return (
				<div className="stepsList">
					The list of ingredients will appear here
				</div>
			);
		}
	
	}
}
class Steps extends React.Component {
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = {
			steps: this.props.steps || []
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
				<StepsList 
					stepList={this.props.steps}
					updaterProp={this.props.updaterProp}
				/>
				<hr />
				<AddStepsForm addStep={this.addStepHandler.bind(this)}/>
			</div>
		)
	}
}

export default Steps