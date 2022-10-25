let [a, b] = [1, 2];
console.log(a, b);

let p = {
    name: "tom",
    age: 23
};
let {
    name,
    age
} = p;

console.log(name, age);

console.log(..."test");

let people = [{
        name: 'Mike Smith',
        family: {
            mother: 'Jane Smith',
            father: 'Harry Smith',
            sister: 'Samantha Smith'
        },
        age: 35
    },
    {
        name: 'Tom Jones',
        family: {
            mother: 'Norah Jones',
            father: 'Richard Jones',
            brother: 'Howard Jones'
        },
        age: 25
    }
];

for (let {
        name: n,
        family: {
            father: f
        }
    } of people) {
    console.log('Name: ' + n + ', Father: ' + f);
}