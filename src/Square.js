import logo from './logo.svg';
import './App.css';
import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            value: props.value,
            selected: false
        }
    }


    render(){
        if (this.state.editing) {
            return(
                <input
                    style={css}
                    type="text"
                    onBlur={this.onBlur}
                    onKeyPress={this.onKeyPressOnInput}
                    value={this.state.value}
                    onChange={this.onChange}
                    autoFocus
                />
            );
        } else {
            return(
                <button onClick={() => this.clicked()}>{this.state.value}</button>
            );
        }

    }

    componentDidMount() {
        window.document.addEventListener('unselectAll',
            this.handleUnselectAll);
    }



    componentWillUnmount() {
        window.document.removeEventListener('unselectAll',
            this.handleUnselectAll);
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    onKeyPressOnInput = (e) => {
        if (e.key === 'Enter') {
            this.hasNewValue(e.target.value)
        }
    }


    onBlur = (e) => {
        this.hasNewValue(e.target.value)
    }

    handleUnselectAll = () => {
        if (this.state.selected || this.state.editing) {
            this.setState({ selected: false, editing: false })
        }
    }

    hasNewValue = (value) => {
        this.props.onChangedValue(
            value,
        )
        this.setState({ editing: false })
    }

    emitUnselectAllEvent = () => {
        const unselectAllEvent = new Event('unselectAll')
        window.document.dispatchEvent(unselectAllEvent)
    }

    clicked = () => {
        this.emitUnselectAllEvent()
        this.setState({selected: true, editing: true})
    }



}
