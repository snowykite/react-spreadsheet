import React from 'react';

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        const cell = props.value;
        this.state = {
            editing: false,
            display: cell.display(),
            edit: cell.edit(),
            selected: false
        }
        cell.setUpdateCallBack(() => {
            this.setState({
                display: cell.display(),
                edit: cell.edit(),
            });
            console.log(`Cell (${props.y}, ${props.x}) updated`);
        });
    }

    render() {
        if (this.state.editing) {
            return(
                <input
                    className="cell"
                    type="text"
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPressOnInput}
                    value={this.state.edit}
                    onChange={this.onChange}
                    autoFocus
                />
            );
        } else {
            return(
                <button className="cell" onClick={() => this.clicked()}>{this.state.display}</button>
            );
        }

    }

    onChange = (e) => {
        this.setState({ edit: e.target.value });
    }

    onKeyPressOnInput = (e) => {
        if (e.key === 'Enter') {
            this.hasNewValue(e.target.value)
        }
    }


    onBlur = (e) => {
        this.hasNewValue(e.target.value)
    }

    hasNewValue = (newVal) => {
        console.log(`new value: ${newVal}`)
        const cell = this.props.value;
        cell.input(newVal);
        this.setState({ editing: false, display: cell.display() })
    }

    clicked = () => {
        this.setState({selected: true, editing: true})
    }


}
