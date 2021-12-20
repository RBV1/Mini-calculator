class CalcComponent {
    constructor(parent, selector) {
        this.host = parent.querySelector(selector);
        this.calcTemplate = new CalcTemplate(this.host);


        this.result = null;

        this.shownAnnotation = {
            position: 'closed',
            possiblePositions: ['closed', 'opened']
        };
        
        this.calcTemplate.onShowAnnotation(this.showAnnotation.bind(this));
        this.calcTemplate.onCalculateResult(this.calculateResult.bind(this));
        this.calcTemplate.onResetBtn()
    }

    calculateResult(value1, value2, operator) {
        
        if (value1 === '' || value2 === '') {
            this.result = 'Please, fill all inputs'
        } else if (isNaN(value1) || isNaN(value2)) {
            this.result = 'Please, enter numbers only'
        } else if(operator === '+') {
            this.addOperation(value1, value2);

        } else if(operator === '-') {
            this.subtractOperation(value1, value2);

        } else if(operator === '*') {
            this.multiplyOperation(value1, value2)

        } else if(operator === '/') {
            this.divideOperation(value1, value2)
            
        } else {
            this.result = 'Choose Operation!'
        }

        if (this.result % 1) {
            this.result = `${Math.round(this.result)} <span class="counter__text">(the result has been rounded)</span>`
        }

        this.calcTemplate.renderCounter(this.result)
    }

    addOperation(value1, value2) {
        this.result = value1 + value2
    }

    subtractOperation(value1, value2) {
        this.result = value1 - value2
    }

    multiplyOperation(value1, value2) {
        this.result = value1 * value2
    }

    divideOperation(value1, value2) {
        this.result = value1 / value2
    }

    showAnnotation() {
        console.log(this.shownAnnotation.position);
        this.shownAnnotation = {...this.shownAnnotation, position: this.shownAnnotation.possiblePositions.filter(pos => pos !== this.shownAnnotation.position)[0]}
        return this.shownAnnotation.position
    }

}