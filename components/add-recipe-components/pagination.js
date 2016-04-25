import React from 'react' 
import ReactDOM from 'react-dom'

var numSteps = 5;
class Pagination extends React.Component {
	constructor(props) {
		super(props);
	}
	nextPageHandler() {
		this.props.changePage(Number(this.props.step) + 1);
	}
	prevPageHandler() {
		this.props.changePage(Number(this.props.step) - 1);
	}
	render() {
		var step = this.props.step;
		if(step < numSteps && step>1) {
			return (
				<div class="Pagination">
					<hr />
					<div class="btn-group btn-group-lg">
						<button 
							id="previousBut" 
							type="button"
							onClick={this.prevPageHandler.bind(this)}
							className="btn btn-warning btn-lg">
								Previous
						</button>
						<button 
							id="nextBut" 
							type="button"
							onClick={this.nextPageHandler.bind(this)}
							className="btn btn-success btn-lg"
							>
								Next
						</button>
					</div>
				</div>
			);
		} else if(step>1) {
			//but >= than numSteps
			//Solo previous
			return (
				<div class="Pagination">
					<hr />
					<button 
						id="previousBut" 
						onClick={this.prevPageHandler.bind(this)}
						className="btn btn-warning btn-lg">
							Previous
					</button>
				</div>
			);
		} else if(step < numSteps) {
			//but <= 0
			//Solo next
			return (
				<div class="Pagination">
					<hr />
					<button 
						id="nextBut" 
						onClick={this.nextPageHandler.bind(this)}
						className="btn btn-success btn-lg">
							Next
					</button>
				</div>
			);
		}
		return (
			<div class="Pagination">
				
			</div>
		)
	}
}

export default Pagination