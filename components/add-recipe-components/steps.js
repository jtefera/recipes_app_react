import React from 'react' 
import ReactDOM from 'react-dom'

class AddStepsForm extends React.Component {
	//
	constructor(){
		super();
		this.state = {
			text: ""
		}
	}
	updateStep(e) {
		//input control
		let stepName = e.target.value;
		this.setState({
			text: ReactDOM.findDOMNode(this.refs.step).value,
		})
	}
	addStep(e) {
		//Add a step into the steps list
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
class ModifyStepForm extends React.Component {
	/*
		Form to update the description of a step
		Props:
			modifyStepHandler={this.props.modifyIngredientHandler}
			changeModifyingState //Function from StepsList to alert when w
									we are modifyung a steo
			step //Object of the steo
			stepPos //Pos of the step on the steps array

	*/
	constructor(props){
		super(props);
		this.state = {
			text: this.props.step.text
		};
	}
	updateInput() {
		let text = ReactDOM.findDOMNode(this.refs.text).value;
		this.setState({
			text: text
		});
	}
	saveModifications(e){
		e.preventDefault();
		let modifyedStep = {
			text: this.state.text
		};
		this.props.modifyStepHandler(	this.props.stepPos, 
										modifyedStep);
		this.props.changeModifyingState(false);
	}
	cancelModifications(e){
		e.preventDefault();
		this.props.changeModifyingState(false);
	}
	render() {
		return (
			<form role="form">
				<hr />
				<input
					ref="text"
					type="text"
					value={this.state.text}
					onChange={this.updateInput.bind(this)}
					placeholder="step description"
				/>
				<div className="btn-group btn-group-xs">
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
class MoveUpDownBtns extends React.Component {
	moveUp(e){
		e.preventDefault();
		this.props.moveHandler(this.props.stepPos, 1);

	}
	moveDown(e){
		e.preventDefault();
		this.props.moveHandler(this.props.stepPos, -1);
	}

	render() {
		let index = this.props.stepPos,
			numSteps = this.props.numSteps,
			btnUp = (
				<div className="btn-group  btn-group-xs">
					<button
						className="btn btn-default  btn-group-xs"
						onClick={this.moveUp.bind(this)}
					> 
						<icon 
							className="glyphicon glyphicon-arrow-up"
						/>
					</button>
				</div>
			),
			btnDown = (
				<div className="btn-group  btn-group-xs">
					<button
						className="btn btn-default"
						onClick={this.moveDown.bind(this)}
					> 
						<icon className="glyphicon glyphicon-arrow-down" />
					</button>
				</div>
			),
			btnUpDown = 
				(<div className="btn-group  btn-group-xs">
					{btnUp} {btnDown}
				</div>);

		if(index > 0 && index < (numSteps-1)) {
			return btnUpDown;
		} else if (index > 0) {
			return btnUp;
		} else {
			return btnDown;
		}
	}
}
class ModifyDeleteStepBtns extends React.Component {
	/*
		Props:
			stepPos={index}
			changeModifyingState={this.changeModifyingState.bind(this)}
	*/
	modifyStep() {
		let stepPos = this.props.stepPos;
		this.props.changeModifyingState(true, stepPos);
	}
	deleteStep() {
		this.props.modifyStepHandler(this.props.stepPos);
	}


	render() {
		return (
			<div className="btn-group btn-group-xs">
				<button 
					className="btn btn-default"
					onClick={this.modifyStep.bind(this)}
					>Modify</button>
				<button 
					className="btn btn-danger" 
					onClick={this.deleteStep.bind(this)}>
					Delete</button>
			</div>
		);
	}
}

//StepsList
class StepsList extends React.Component {
	/*
		Shows list of added steps with buttons to change the order, 
		modify a step or delating
		App>AddRecipe>Pages>Steps>StepList
		Props:
			stepList //Array of actual steps
			updaterProp //FUnction. Passed from AddRecipe
						Recives a name and a value
						and updates the recipe main object with a property
						with than name giving also a value
						In this case, name is steps and the value is an array
						of steps
			modifyStepHandler //Function. Passed from AddRecipes
								Allows an easy updating or deleting
								of a single step of an existing step
		States:
			modifyingStep //Bool. True when a step is being modified
			stepBeingModified

	*/
	constructor(props){
		super(props);
		this.state = {
			modifyingStep: false,
			stepBeingModified: -1
		};
	}
	move(key, pos) {
		//Move up or down a step on the list of steps
		//key indicates the step to move
		//Pos, the number of pos to move. 
		//If negative, the ingredient is moved up
		//If positive, the ingredient is down.
		//Called from childnodes
		console.log("up", key);
		let newOrder = this.props.stepList,
			temp = newOrder[key];
		newOrder[key] = newOrder[key - pos];
		newOrder[key - pos] = temp;
		this.props.updaterProp({
			name: 'steps',
			value: newOrder
		});
	}
	changeModifyingState(isModifying, posModify){
		//Function to be passed to childs to alert when a step 
		//is being modifyed.
		//It doesn't modify a step
		if(isModifying) {
			this.setState({
				modifyingStep: true,
				stepBeingModified: posModify
			})
		} else {
			this.setState({
				modifyingStep: false,
				stepBeingModified: -1
			})
		}
	}
	render() {
		let stepList = this.props.stepList; 
		
		let stepRows = stepList.map( (step, index) => {
			let isStepSetToModify = this.state.modifyingStep 
									&& (this.state.stepBeingModified === index);
			if(isStepSetToModify){
				return (
					<div key={index}>
						<ModifyStepForm 
							step={step}
							stepPos={index}
							modifyStepHandler={this.props.modifyStepHandler}
							changeModifyingState={this.changeModifyingState.bind(this)}
						/>
					</div>
				);
			} else {
				return (
					<li key={index}>
						<span className="orderList">{index + 1}. </span>
						<span className="stepTextSpan">{step.text}</span>
						<div className="btn-group stepAllBtns">
							<MoveUpDownBtns 
								stepPos={index}
								moveHandler={this.move.bind(this)}
								numSteps={stepList.length}
							/>
							<ModifyDeleteStepBtns
								stepPos={index}
								changeModifyingState={this.changeModifyingState.bind(this)}
								modifyStepHandler={this.props.modifyStepHandler}
							/>
						</div>
					</li>
				);
			}
		});


		if(this.props.stepList.length){
			return (
				<div className="stepsList">
					<ul ref="listSteps">
							{stepRows}
					</ul>
				</div>
			);	
		} else {
			return (
				<div className="stepsList">
					The list of Steps will appear here
				</div>
			);
		}
	
	}
}
class Steps extends React.Component {
	/*
		Page and Component of AddRecipes that allows to add and modify
		the steps into which a recipe is made
		App>AddRecipe>Pages
		Props:
			steps //List of steps present on the recipe
			updaterProp //FUnction. Passed from AddRecipe
						Recives a name and a value
						and updates the recipe main object with a property
						with than name giving also a value
						In this case, name is steps and the value is an array
						of steps
			modifyStepHandler //Function. Passed from AddRecipes
								Allows an easy updating or deleting
								of a single step of an existing step
	*/
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = {
			steps: this.props.steps || []
		}
	} 

	update() {
		//Input control
		let steps = this.state.steps;
		this.props.updaterProp({
			name: "steps",
			value: steps
		})
	}

	addStepHandler(step) {
		//Add step to the steps array of the main recipe
		let steps = this.state.steps;
		steps.push(step);
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
					modifyStepHandler={this.props.modifyStepHandler}
				/>
				<hr />
				<AddStepsForm addStep={this.addStepHandler.bind(this)}/>
			</div>
		)
	}
}

export default Steps