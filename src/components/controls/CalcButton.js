import './CalcButton.css';
import React from 'react';

/**
 * @param {string} props.children
 * @param {number} props.column
 * @param {function} props.onClick
 * @return {JSX.Element}
 * @constructor
 */
export default function CalcButton(props) {
    return <button className="calc-button"
                   onClick={() => props.onClick()}
                   style={{gridColumn: props.column}}
                   children={props.children} />;
}