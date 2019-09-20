
import React, { Component } from 'react';

class ChoiceModal extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    render() {
        let showHideModal = "hideModal";
        let buttons = ""
        if (this.props.showHideModal) {
            showHideModal = "showModal"
        }
        if (this.props.card.decisions) {
            console.log(this.props.card)
            if (this.props.card.decisions.exist) {
                buttons = this.props.card.decisions.text.map((i) => <button className="modalButton" onClick={(i) => { this.props.play(this.props.card, i) }}> {this.prop.card.decisions.text[i]} </button>)
            }
        } return (
            // <div className={showHideModal}>
            <div className={showHideModal}>
                here's youre elaborate quesition
                <div className="modalContent">
                    <p>some actual codntent</p>
                    <div className="buttonWrapper">
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}

export default ChoiceModal;