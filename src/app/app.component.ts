import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = 'Calculator v0.1 // GSM research project';
    public formula:string;
    public output:string;
    public error:string;

    private clearInput: boolean;
    private decimalMark:boolean;
    private closingBracket: number;
    private lastInputType: string;

    public constructor(){
        this.formula = this.output = '0';
        this.error = '';
        this.clearInput = true;
        this.decimalMark = false;
        this.closingBracket = 0;
        this.lastInputType = 'result';
    }

    public addNumber(number:number) {
        if (this.lastInputType == 'result') {
            this.clear();
        }
        this.add(number.toString());
        this.lastInputType = 'number'
    }

    private add(str:string, label?:string) {
        if (!label) {
            label = str;
        }
        if (this.clearInput || this.formula == '0') {
            this.formula = '' + str;
            this.output = '' + label;
        } else {
            this.formula += '' + str;
            this.output += '' + label;
        }

        this.clearInput = false;
    }

    public addDecimalMark() {
        if (!this.decimalMark) {
            this.add('.');
            this.decimalMark = true;
            this.lastInputType = 'number'
        }
    }


    public addOperation(operator:string, label?:string) {
        this.add(operator, label);
        this.decimalMark = false;
        this.clearInput = false;
        this.lastInputType = 'operator'
    }

    public calculateResult() {

        for (let i = 0; i < this.closingBracket; i++) {
            this.formula += ')';
        }
        console.log(this.formula);
        try {
            this.output = eval(this.formula);
            this.formula = this.output;
        } catch (e) {
            this.output = '0';
            this.formula = '0';
            this.error = e.message;
        }
        this.closingBracket = 0;
        this.decimalMark = false;
        this.lastInputType = 'result'


    }

    public clear() {
        this.formula = '0';
        this.output = '0';
        this.decimalMark = false;
        this.clearInput = true;
        this.error = '';
    }

    public addOpenBracket() {
        this.add('(');
        this.closingBracket++;
    }

    public addClosingBracket() {
        if (this.closingBracket > 0) {
            this.add(')');
            this.closingBracket--;
        }
    }

    private beforeFunction(){
        if(this.lastInputType=='number'){
            this.addOperation('*','');
        }
        if(this.lastInputType=='result'){
            this.clear();
        }
        this.lastInputType = 'function';
        this.clearInput = false;
    }

    public addPi(){
        this.add('Math.PI', 'π');
        this.lastInputType = 'number'
    }

    public cos(){
        this.beforeFunction();
        this.add('Math.cos', 'cos');
        this.addOpenBracket()
    }

    public sin(){
        this.beforeFunction();
        this.add('Math.sin', 'sin');
        this.addOpenBracket()
    }

    public log(){
        this.beforeFunction();
        this.add('Math.log', 'log');
        this.addOpenBracket()
    }
    
    public sqrt() {
        this.beforeFunction();
        this.add('Math.sqrt', '√');
        this.addOpenBracket();

    }


}
