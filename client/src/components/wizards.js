import React, { Component } from 'react';
import Hand from './Hand'

class Wizards extends Component {
    constructor() {
        super();
        this.state = {
            wizards: [],
            currentSelection: 0
        };
    }
    grabdetails() {
        fetch('/players')
            .then(res => res.json())
            .then(wizards => this.setState({ wizards }, () => console.log("We've got the following wizards ", wizards)));
    }
    componentDidMount() {
        this.grabdetails()
    }

    render() {

        console.log('the wizards are now ', this.state.wizards)
        return (
            <div className="Wizard">
                <div>
                    {this.state.wizards.map((wizard) => <div key={wizard.number}> {wizard.number}{wizard.character} has {wizard.health} health, {wizard.gold} gold, {wizard.lightning} lightning
                    <Hand playing={this.props.playing} hand={wizard.hand} />
                    </div> )}
                </div>
            </div>
        );
    }
}

export default Wizards;