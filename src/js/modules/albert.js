// пример работы с export
// простых экспортов может быть сколько угодно. Они экспортируют какую-то отдельную сущность
// особенно полезны, когда не нужно каждый раз экспортировать большой класс, или объект и для работы требуется импортировать 2-3 функции из модуля

const Albert = 'Albert'

export function work() {
  console.log(`${Albert} is working`)
}

export function relax() {
  console.log(`${Albert} is relaxing`)
}