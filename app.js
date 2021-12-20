class App {
    constructor(selector) {
        this.host = document.querySelector(selector)
        this.calcComponent = new CalcComponent(this.host, '.app-component')
    }
}

const app = new App('.app')