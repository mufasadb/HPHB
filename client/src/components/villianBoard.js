import React, { Component } from 'react';

class VillianBoard extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        var villianCapacity = []
        for (let i = 0; i < this.props.villianCapacity; i++) {
            villianCapacity.push(<div key={i}> V </div>)
        }
        var villianCurrent = []
        for (let i = 0; i < this.props.villianCurrent; i++) {
            villianCurrent.push(<div key={i + 'current'}> V </div>)
        }
        return (
            <div className="villianBoard">
                <div className="villianCapcity">
                    {villianCapacity}
                </div>
                <div className="villianCurrent">
                    {villianCurrent}</div>
            </div>
        )
    };
}

export default VillianBoard;