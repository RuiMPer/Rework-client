import addNotification from 'react-push-notification';
import React, { Component } from "react";

class AddNotification extends Component {
	state = {};

	Page = () => {
		const buttonClick = () => {
			addNotification({
				title: 'Warning',
				subtitle: 'This is a subtitle',
				message: 'This is a very long message',
				theme: 'darkblue',
				native: true // when using native, your OS will handle theming.
			});
			console.log("olhaeste", this.props)
		}

		return (
			<div className="page">
				<button onClick={buttonClick} className="button">
					Hello world.
          </button>
			</div>)
	}


	render() {
		return (
			<div>
				{this.Page()}
			</div>
		);
	}
}

export default AddNotification;