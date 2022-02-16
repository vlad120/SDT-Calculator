import './Calculator.css';
import React from 'react';
import { CalcStateInit } from '../base/CalculatorState';
import CalcButtonsGrid from "./controls/CalcButtonsGrid";
import CalcDisplay from "./controls/CalcDisplay";

const CalcButtonsGridMemo = React.memo(CalcButtonsGrid);

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.calcStateOwner = this.makeCalculatorStateOwner();
        this.state = {
            value: '0',
            prevValue: NaN,
            calculatorState: new CalcStateInit(this.calcStateOwner)
        };
    }

    /**
     * @return {CalcStateOwner}
     */
    makeCalculatorStateOwner = () => {
        const proxy = {}
        Object.defineProperties(proxy, {
            value: {
                get: () => this.state.value,
                set: (val) => this.setState({value: val}),
            },
            prevValue: {
                get: () => this.state.prevValue,
                set: (val) => this.setState({prevValue: val}),
            },
            state: {
                get: () => this.state.calculatorState,
                set: (val) => this.setState({calculatorState: val}),
            },
        });
        return proxy;
    }

    render = () => (
        <div className="calc-frame">
            <CalcDisplay calculatorStateOwner={this.calcStateOwner}/>
            <div className="calc-bottom">
                <CalcButtonsGridMemo calculatorStateOwner={this.calcStateOwner}/>
            </div>
        </div>
    );
}