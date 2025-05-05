// Decorators

function LogMethodCalls<T extends { new (...args: any[]): {} }>(target: T) {
  return class extends target {
    constructor(...args: any[]) {
      super(...args);

      const props = Object.getOwnPropertyNames(this);

      for (const prop of props) {
        const method: Function = (this as any)[prop];

        if (typeof method === 'function') {
          (this as any)[prop] = (...args: any[]) => {
            console.log(`Method: ${prop}, args: ${JSON.stringify(args)}`);
            return method.apply(this, args);
          };
        }
      }
    }
  };
}

@LogMethodCalls
class Calculator {
  add = (a: number, b: number) => {
    return a + b;
  };
  subtract = (a: number, b: number) => {
    return a - b;
  };
  multiply = (a: number, b: number) => {
    return a * b;
  };
  divide = (a: number, b: number) => {
    return a / b;
  };
}

const calc = new Calculator();

calc.add(2, 2);


// Type Manipulation
// 1
type IsString<T> = T extends string ? true : false;

// 2
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Test = Optional<{ a: string; b: number }>;

// 3
type Picked = Pick<{ a: number; b: number }, 'a'>;

// switch
enum Flower {
  Rose,
  Rhododendron,
  Violet,
  Daisy,
}

const flowerLatinName = (flower: Flower) => {
  switch (flower) {
    case Flower.Rose:
      return "Rosa rubiginosa";
    case Flower.Rhododendron:
      return "Rhododendron ferrugineum";
    case Flower.Violet:
      return "Viola reichenbachiana";
    case Flower.Daisy:
      return "Bellis perennis";

    default:
      const _exhaustiveCheck: never = flower;
      return _exhaustiveCheck;
  }
};
