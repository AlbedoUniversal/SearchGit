// пример работы с export default
// export default может быть только один на весь файл и кроме него, в файле больше не должно быть других импортов

// пример с классом
export default class Eugene {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  work() {
    console.log(`${this.name} is working`)
  }
}

// пример с объектом. По сути, почти одно и то же
// const Eugene = {
//   name: 'Eugene',
//   age: 25,
//   work() {
//     console.log(`${this.name} is working`)
//   }
// }

// export default Eugene