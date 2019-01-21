
import React, { Component } from 'react';

class ChoiceModal extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        let showHideModal = "hideModal";
        if (this.props.showHideModal) {
            showHideModal = "showModal"
        }
        let bontent = ""
        if(typeof variable !== 'undefined'){
            bontent = this.props.card.decisions.text
        }
        return (
            <div className={showHideModal}>
                here's youre elaborate quesition
                {bontent}
                <button>
                    onClick = {this.props.play(this.props.card, 0)}
                </button>
                <button>
                    onClick = {this.props.play(this.props.card, 1)}
                </button>

            </div>
        );
    }
}

export default ChoiceModal;