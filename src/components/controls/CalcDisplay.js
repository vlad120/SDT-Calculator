import './CalcDisplay.css';
import React from 'react';

export default function CalcDisplay(props) {
    const {value, prevValue, state} = props.calculatorStateOwner;

    const previewBuilder = [];

    if (!isNaN(prevValue)) {
        previewBuilder.push(prevValue);
        previewBuilder.push(state.operation);
        previewBuilder.push(value);
    } else if (state.operation) {
        previewBuilder.push(value);
        previewBuilder.push(state.operation);
    }

    const preview = previewBuilder.join(' ');

    return (
        <div className="calc-display">
            <p className="calc-display-preview" title={preview}>{preview}</p>
            <p className="calc-display-value" title={value}>{value}</p>
        </div>
    );
}