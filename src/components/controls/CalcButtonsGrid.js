import './CalcButtonsGrid.css';
import React from 'react';
import CalcButton from './CalcButton';

export default function CalcButtonsGrid(props) {
    const owner = props.calculatorStateOwner;
    return (
        <div className="calc-buttons-grid">
            <div className="line first-line" style={{gridRow: 1}}>
                <CalcButton column={1} onClick={_ => owner.state.plusMinusClick()}>+/-</CalcButton>
                <CalcButton column={2} onClick={_ => owner.state.clearAllClick()}>AC</CalcButton>
                <CalcButton column={3} onClick={_ => owner.state.deleteClick()}>&#9003;</CalcButton>
            </div>
            <div className="line" style={{gridRow: 2}}>
                <CalcButton column={1} onClick={_ => owner.state.sqrt()}>&#8730;</CalcButton>
                <CalcButton column={2} onClick={_ => owner.state.exponent()}>x<sup style={{fontSize: '14px', marginLeft: '1px'}}>y</sup></CalcButton>
                <CalcButton column={3} onClick={_ => owner.state.mod()}>mod</CalcButton>
                <CalcButton column={4} onClick={_ => owner.state.divide()}>&#2933;</CalcButton>
            </div>
            <div className="line" style={{gridRow: 3}}>
                <CalcButton column={1} onClick={_ => owner.state.digitClick(7)}>7</CalcButton>
                <CalcButton column={2} onClick={_ => owner.state.digitClick(8)}>8</CalcButton>
                <CalcButton column={3} onClick={_ => owner.state.digitClick(9)}>9</CalcButton>
                <CalcButton column={4} onClick={_ => owner.state.multiply()}>&#215;</CalcButton>
            </div>
            <div className="line" style={{gridRow: 4}}>
                <CalcButton column={1} onClick={_ => owner.state.digitClick(4)}>4</CalcButton>
                <CalcButton column={2} onClick={_ => owner.state.digitClick(5)}>5</CalcButton>
                <CalcButton column={3} onClick={_ => owner.state.digitClick(6)}>6</CalcButton>
                <CalcButton column={4} onClick={_ => owner.state.subtract()}>&#8722;</CalcButton>
            </div>
            <div className="line" style={{gridRow: 5}}>
                <CalcButton column={1} onClick={_ => owner.state.digitClick(1)}>1</CalcButton>
                <CalcButton column={2} onClick={_ => owner.state.digitClick(2)}>2</CalcButton>
                <CalcButton column={3} onClick={_ => owner.state.digitClick(3)}>3</CalcButton>
                <CalcButton column={4} onClick={_ => owner.state.add()}>+</CalcButton>
            </div>
            <div className="line last-line" style={{gridRow: 6}}>
                <CalcButton column={1} onClick={_ => owner.state.digitClick(0)}>0</CalcButton>
                <CalcButton column={2} onClick={_ => owner.state.commaClick()}>.</CalcButton>
                <CalcButton column={3} onClick={_ => owner.state.resultClick()}>=</CalcButton>
            </div>
        </div>
    );
}