class CalcTemplate {
    constructor(host) {
        this.host = host;

        this.iniTemplate = `
        <h1 class="app__title">Mini-calculator</h1>
        <div class="flex">
                <div class="app__annotation">Annotation</div>
        </div>
        <form class="app__form">
            <div class="flex">
                <label for="field1" class="form__label">Enter 1-st number</label>
                <input type="text" class="form__field" id="field1">
            </div>
            <div class="flex">
                <label for="field2" class="form__label">Enter 2-nd number</label>
                <input type="text" class="form__field" id="field2">
            </div>
            <div class="flex">
                <select class="form__operation">
                    <option disabled selected>Choose operation</option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <button class="form__btn">Count</button>
            </div>
        </form>
        <div class="flex">
            <span class="app__counter">Begin calculation</span>
        </div>
        <div class="flex">
            <div class="empty__space"></div>
            <button class="app__reset">Reset</button>
        </div>
        `;

        this.renderApp();

        this.annotation = this.host.querySelector('.app__annotation')
        this.form = this.host.querySelector('.app__form');
        this.field1 = this.form.querySelector('#field1');
        this.field2 = this.form.querySelector('#field2');
        this.operation = this.form.querySelector('.form__operation');
        this.counter = this.host.querySelector('.app__counter');
        this.resetBtn = this.host.querySelector('.app__reset')
    }

    renderApp() {
        this.host.innerHTML = this.iniTemplate
    }

    renderCounter(counter) {
        this.counter.innerHTML = `${counter}`
    }

    onCalculateResult(cb) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const value1 = +this.field1.value.trim();
            const value2 = +this.field2.value.trim();
            const operator = this.operation.value
            if (this.field1.value === '' || this.field2.value === '') {
                cb('', '', operator);
                return 
            } else if(isNaN(value1) || isNaN(value2)) {
                this.cleanField('no');
                cb(value1, value2, operator);
                return
            } else if (operator === 'Choose operation') {
                this.cleanField('no');
                cb(value1, value2, operator);
                return
            }
            cb(value1, value2, operator);
            this.cleanField();
        })
    }

    cleanField(clean = 'yes') {
        if (clean === 'yes') {
            this.field1.value = null;
            this.field2.value = null;

        } else if ('no') {
            return
        }
    }

    onShowAnnotation(cb) {
        this.annotation.addEventListener('click', () => {
            console.dir(this.host.parentElement);
            let openHeight = 36;
            let closeHeight = 86;
            if (this.host.parentElement.scrollWidth < 1285) {
                openHeight = 36;
                closeHeight = 106;
            } 

            if (this.host.parentElement.scrollWidth < 900) {
                openHeight = 36;
                closeHeight = 156;
            }
            const state = cb();
            if(state === 'opened'){
                let id = setInterval(() => {
                    console.log('ss');
                    openHeight += 1
                    this.annotation.style.height = openHeight + 'px'
                
                
                    if(openHeight === closeHeight) {
                        clearInterval(id)
                        this.annotation.innerHTML = `
                        <span class="annotation__text">
                            This program is a simple math calculator. Decimal numbers should be separated by DOTs, not by COMMAs.
                            The result of math operations would be a number rounded with all mathematical rules.
                        </span>
                        `
                    }
                }, 10)

            } else if (state === 'closed') {
                this.annotation.innerHTML = `
                `
                let id = setInterval(() => {
                    console.log('ss');
                    closeHeight -= 1
                    this.annotation.style.height = closeHeight + 'px'
        
                    if(closeHeight === openHeight) {
                        clearInterval(id)
                        this.annotation.innerHTML = `
                        Annotation
                        `
                    }
                }, 10)
            }

        })
    }

    onResetBtn() {
        this.resetBtn.addEventListener('click', () => {
            this.counter.innerHTML = `Begin calculation`;
            this.cleanField()
        })
    }


    
}