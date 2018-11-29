# notes for the video [JavaScript for react](https://www.youtube.com/watch?v=NCwa_xi0Uuc)

## var vs let and const
After 2015 javascript(ES6) include 2 methods to include a variable `let` and `cons`. The main difference  from `var` is that if method was called outside its local scope, the variable could be called in the global scope causing unpredictable errors.
```
function sayHello(){
    for(var i=0;i<5;i++){
        console.log(i);
    }
        console.log(i);//this will print 5 
}

sayHello();

//vs using let
function sayHello(){
    for(let i=0;i<5;i++){
        console.log(i);
    }
        console.log(i);//this will print an error
}
sayHello();

```


And the difference  bewteen `let`  and `const` lies in the fact that the second cannot be reassigned (read-only accessible) .
Use let only if it is needed to reassign a variable.

## Objects
After ES6, a method inside an object can be code as:
```
const person = {
    name : 'Sam',
    walk() {},// instead of walk : function(){} 
    talk() {} // instead of talk : function(){} 
}
```

There are 2 ways to access the methods:
```
person.talk();
person['talk']; // this one is prefered if we don't know ahead of time   the name of the method that will be called

const targetMember = 'name';
person[targetMember.value]= 'Sam';
```



## this and binding
If a method is called outside of its object, it will be an object of its own. And if `this`is called outside the function, it will reference the global parent,the View. But because of react restrictions, it will be undefined  to avoid unpredictable errors. To reference the function, `bind` can be used to link `this` to an object.

```
const person = {
    name: "Sam",
    walk(){
        console.log(this);
    }
}
person.walk();

const walk =person.walk;
walk();//undefined in strick mode 

const walk =person.walk.bind(person);
walk();//it prints the person
```



## Arrow functions
Functions can be written with less code:
```
const square= function(n){
return n*n;
}
const square = n => n*n;
```
It can be used with arrays:
```
const jobs=[{id: 1,isActive: True},
{id:2,isActive: True},
{id: 3,isActive: False},
];

const activeJobs = jobs.filter(function (job){job.isActive;});
const activeJobs = jobs.filter(job=>job.isActive);//easier to read
```

Arrow functions don't rebind `this`

In callbacks the strick mode is not overrided so the next code returns the window object
```
const person = {
    talk(){
        setTimeout(function(){
        console.log("this",this);
        },1000);
    }
}
person.talk();
```

in the old days to reference person, it was needed to declare a `var` variable:
```
const person = {
    talk(){
        var self=this;
        setTimeout(function(){
        console.log("self",self);
        },1000);
    }
}
person.talk();
```

If it is included an arrow function, this is inherited and it is'nt need to reference with self.

```
const person = {
    talk(){
        setTimeout(()=>{
        console.log("this",this);
        },1000);
    }
}
person.talk();
```

`this` is not reset, it is  defined in the context that is declared. 

## Array.map

`.Map` is useful for iterating objects in an array. It can be used with arrow functions to keep it cleaner.
```
colors=['blue'red,'','yellow'];
const items=colors.map(color=>`<li>${color}<\li>`);
console.log(items);

```

## Object destructuring

In es6, to keep the code cleaner, declaration of variables can be define in a line:

```
const address={
street:'',
number:'',
city:''
};

const street = address.street;
const number = address.number;
const city = address.city;

//is equivalent to:
const {street,number,city}=address;

// and if they need an alias:

const {street:st,number:nb,city:ct}=address;

```

## Spread operator

To combine arrays, spread can be used (`...`) to paste the elements of an array.
```
cont first = [1,2,3];
cont first = [1,2,3];

const combined = first.concat (second);//old version
const combined = [...first,'a',...second,'b'];//new version

```

It can be used to combine two properties
```

const first ={name :"Sam"};
const second ={job: "programmer"};

const combined = {...first,...second,location:"Mexico"};
console.log(combined);
```

## Clases

First, a shortcut to move code is to use alt+down to move the code.
Just like in Java, Clases can be defined to declare multiple objets and inherite properties from parent Clases:

```
class Person {
    constructor(name){
    this.name=name};
    }
const walk(){
console.log("walk")};
    }
} 
class Teacher{
    constructor(name,degree){
        super (name);
        this.degree= degree;
        const teach=function(){
        console.log();
        }
    }
}

const teacher = new Teacher("Sam","Master");
```

## Modules

To keep the code cleaner, separate classes can be saved into different files to easy maintainability.

```
// In teacher.js... Person is assumed to be saved in person.js 

import {Person} from './person';

default export class Teacher extend Person {
    constructor(name,degree){
    super(name);
    this.degree= degree;
}
    const teach = function (){
    console.log("teach");
}
}
//index.js
import {Teacher} from './teacher';// crt+space to see available options to import

const teacher= new Teacher ("Sam","Msc");
teacher.teach();
```
## named and default export

When importing a module, objects ( clases  wrap functions, functions are objects ergo classes are objects) can be defaulted to export and the sintax for calling them change:

```
import Teacher, {promote} from './teacher';
```



