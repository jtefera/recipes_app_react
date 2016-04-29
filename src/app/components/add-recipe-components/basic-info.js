import React from 'react'
import ReactDOM from 'react-dom'

class BasicInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name : this.props.basicInfo.name || "",
			difficulty: this.props.basicInfo.difficulty || 0,
			duration: this.props.basicInfo.duration || 0,
			numPlates: this.props.basicInfo.numPlates || 4
		}
	}
	update(e) {
		var info = {
			name: ReactDOM.findDOMNode(this.refs.name).value,
			difficulty: ReactDOM.findDOMNode(this.refs.difficulty).value,
			duration: ReactDOM.findDOMNode(this.refs.duration).value,
			numPlates: ReactDOM.findDOMNode(this.refs.numPlates).value
		}
		this.setState(info);
		this.props.updaterProp({
			name: "basicInfo",
			value: info
		})

	}
	render() {
		return (
			<div class="BasicInfo form slide">
				Receipe Name:
				<form role="form">
					<div class="form-group">
						<label for="name">
							Recipe Name
						</label>
						<input
							ref="name"
							type="text"
							placeholder="your recipe name"
							onChange={this.update.bind(this)}
							value={this.state.name}
							className="form-control input-lg"
						/>
					</div>
					<div class="form-group">
						<label for="difficulty">
							Difficulty of the recipe
						</label>
						<input
							ref="difficulty"
							type="range"
							min={0}
							max={5}
							onChange={this.update.bind(this)}
							value={this.state.difficulty}
						/>
					</div>
					<div class="form-group">
						<label for="duration">
							Duration of the recipe
						</label>
						<input
							ref="duration"
							type="range"
							min={0}
							max={120}
							step={5}
							onChange={this.update.bind(this)}
							value={this.state.duration}
						/>
					</div>
					<div class="form-group">
						<label for="numPlates">
							Number of plates
						</label>
						<input
							ref="numPlates"
							type="number"
							onChange={this.update.bind(this)}
							value={this.state.numPlates}
							className="form-control input-lg"
						/>
					</div>

				</form>
			</div>
		)
	}
}

export default BasicInfo
