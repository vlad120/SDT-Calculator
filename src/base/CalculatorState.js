/**
 * @typedef CalcStateOwner
 * @property {string} value
 * @property {number} prevValue
 * @property {ICalcState} state
 */


/** @interface */
export class ICalcState {
    /** @type {string} */
    operation;

    /** @type CalcStateOwner */
    owner;

    /** @method */
    add;

    /** @method */
    subtract;

    /** @method */
    multiply;

    /** @method */
    divide;

    /** @method */
    mod;

    /** @method */
    exponent;

    /** @method */
    sqrt;

    /** @method */
    commaClick;

    /** @method */
    deleteClick;

    /** @method */
    clearAllClick;

    /** @method */
    plusMinusClick;

    /**
     * @method
     * @param {number} num
     */
    digitClick;

    /** @method */
    resultClick;
}


/**
 * @abstract
 * @implements ICalcState
 */
class BaseCalcState extends ICalcState {
    constructor(operation, owner) {
        super();
        this.operation = operation;
        this.owner = owner;
    }

    get isTransitionalState() { return this.operation && isNaN(this.owner.prevValue); }

    add() {
        this.resultClick();
        this.owner.state = new CalcStateAdd(this.owner);
    }

    subtract() {
        this.resultClick();
        this.owner.state = new CalcStateSubtract(this.owner);
    }

    multiply() {
        this.resultClick();
        this.owner.state = new CalcStateMultiply(this.owner);
    }

    divide() {
        this.resultClick();
        this.owner.state = new CalcStateDivide(this.owner);
    }

    mod() {
        this.resultClick();
        this.owner.state = new CalcStateMod(this.owner);
    }

    exponent() {
        this.resultClick();
        this.owner.state = new CalcStateExponent(this.owner);
    }

    sqrt() {
        this.owner.value = Math.sqrt(Number.parseFloat(this.owner.value)).toString();
    }

    commaClick() {
        if (this.isTransitionalState) return;
        const value = this.owner.value;
        if (value.indexOf('.') < 0) {
            this.owner.value = value + '.';
        }
    }

    deleteClick() {
        if (this.isTransitionalState) return;
        const value = this.owner.value;
        if (value.length > 0) {
            this.owner.value = value.substring(0, value.length - 1);
        }
    }

    clearAllClick() {
        this.owner.value = '0';
        this.owner.prevValue = NaN;
        this.owner.state = new CalcStateInit(this.owner);
    }

    plusMinusClick() {
        if (this.isTransitionalState) return;
        this.owner.value = (Number.parseFloat(this.owner.value) * -1).toString();
    }

    digitClick(digit) {
        if (this.isTransitionalState) {
            this.owner.prevValue = Number.parseFloat(this.owner.value)
            this.owner.value = digit.toString();
        }
        else if (this.owner.value === '0') {
            this.owner.value = digit.toString();
        }
        else {
            this.owner.value += digit.toString();
        }
    }

    /**
     * @abstract
     * @method
     */
    resultClick() {}
}


export class CalcStateInit extends BaseCalcState {
    constructor(owner) {
        super(null, owner);
    }

    clearAllClick() {
        this.owner.value = '0';
        this.owner.prevValue = NaN;
    }

    resultClick() {
        // pass
    }
}

export class CalcStateAdd extends BaseCalcState {
    constructor(owner) {
        super("+", owner);
    }

    add() {
        // pass
    }

    resultClick() {
        const [prev, curr] = getOperands(this.owner);
        [this.owner.value, this.owner.prevValue, this.owner.state] = [(prev + curr).toString(), NaN, new CalcStateInit(this.owner)];
    }
}

export class CalcStateSubtract extends BaseCalcState {
    constructor(owner) {
        super("-", owner);
    }

    subtract() {
        // pass
    }

    resultClick() {
        const [prev, curr] = getOperands(this.owner);
        [this.owner.value, this.owner.prevValue, this.owner.state] = [(prev - curr).toString(), NaN, new CalcStateInit(this.owner)];
    }
}

export class CalcStateMultiply extends BaseCalcState {
    constructor(owner) {
        super("*", owner);
    }

    multiply() {
        // pass
    }

    resultClick() {
        const [prev, curr] = getOperands(this.owner);
        [this.owner.value, this.owner.prevValue, this.owner.state] = [(prev * curr).toString(), NaN, new CalcStateInit(this.owner)];
    }
}

export class CalcStateDivide extends BaseCalcState {
    constructor(owner) {
        super("/", owner);
    }

    divide() {
        // pass
    }

    resultClick() {
        const [prev, curr] = getOperands(this.owner);
        [this.owner.value, this.owner.prevValue, this.owner.state] = [(prev / curr).toString(), NaN, new CalcStateInit(this.owner)];
    }
}

export class CalcStateMod extends BaseCalcState {
    constructor(owner) {
        super("mod", owner);
    }

    mod() {
        // pass
    }

    resultClick() {
        const [prev, curr] = getOperands(this.owner);
        [this.owner.value, this.owner.prevValue, this.owner.state] = [(prev % curr).toString(), NaN, new CalcStateInit(this.owner)];
    }
}

export class CalcStateExponent extends BaseCalcState {
    constructor(owner) {
        super("^", owner);
    }

    exponent() {
        // pass
    }

    resultClick() {
        const [prev, curr] = getOperands(this.owner);
        [this.owner.value, this.owner.prevValue, this.owner.state] = [(prev ** curr).toString(), NaN, new CalcStateInit(this.owner)];
    }
}


/**
 * @param {CalcStateOwner} owner
 * @return {(number|number)[]}
 */
function getOperands(owner) {
    const prev = owner.prevValue;
    const curr = Number.parseFloat(owner.value);
    return [(isNaN(prev) ? curr : prev), curr]
}