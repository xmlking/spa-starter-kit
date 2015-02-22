/**
 * TODO implement Enum with ES6 symbols
 * http://www.2ality.com/2014/12/es6-symbols.html
 */
export class EnumSymbol {
    name: string;
    value = Symbol(name);
    description: string;

    constructor(name, {value, description}) {
        this.name  = name;
        if(value) this.value  = value;
        if(description) this.description  = description;

        Object.freeze(this);
    }

    toString() {
        return this.description || this.name;
    }

    valueOf() {
        return this.value;  //TODO Symbol.for Symbol.keyFor
    }
}

export class Enum {
    constructor(enumLiterals) {
        for (let key in enumLiterals) {
            if(!enumLiterals[key]) throw new TypeError('each enum should have been initialized with atleast empty {} value');
            this[key] =  new EnumSymbol(key, enumLiterals[key]);
        }
        Object.freeze(this);
    }

    symbols() {
        return [for (key of Object.keys(this)) this[key] ];
    }

    keys() {
        return Object.keys(this);
    }

    contains(sym) {
        if (!(sym instanceof EnumSymbol)) return false;
        return this[sym.name] === sym;
    }
}
