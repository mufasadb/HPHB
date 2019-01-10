
import React, { Component } from 'react';

class ChoiceModal extends Component {
    constructor() {
        super();
        this.state = {
            choices:{}
        };
    }
    grabdetails() {
        fetch('/choices')
            .then(res => res.json())
            .then(choices => this.setState({ choices }, () => console.log("retrieved the choices ", choices)));
    }
    render() {
        return (
            <div className={this.props.showHideModal}>
here's youre elaborate quesition
<button>
    </button>
            </div>
        );
    }
}

export default ChoiceModal;