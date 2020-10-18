module.exports = function check(str, bracketsConfig) {
  const ResultArr = [];
  const openBrackets = []; // массив открывающихся скобок
  const closeBrackets = []; // массив закрывающихся скобок

  // идем по массиву (аргумент 2) bracketsConfig и так как в нем в правильном порядке все скобки, то при переборе кладем их в 2 массива (с откр скобками и с закр скобками)
  bracketsConfig.forEach((item) => {
    openBrackets.push(item[0]);
    closeBrackets.push(item[1]);
  });

  // цикл прокручивает по индексам входящую строку str (аргумент 1)
  for (let i = 0; i < str.length; i++) {

    //если массив с закрывающимися скобками включает в себе i-ый элемент строки str
    // И  длина результирующего массива НЕ РАВНО 0 , То:
    if (closeBrackets.includes(str[i]) && ResultArr.length !== 0) {
      const correspondBracket = openBrackets[closeBrackets.indexOf(str[i])]; 
      // в константу положим открывающуюся скобку (она будет меняться на другие открывающиеся по ходу цикла)
      // как получаем нужную открывающую скобку: 
        //openBrackets[closeBrackets.indexOf(str[i])] = берем элемент массива openBrackets, индекс которого находится как [индекс первого вхождения элемента str[i] в массив closeBrackets (массив закрывающихся скобок) ]


      // если определенный элемент массива ResultArr (где номер элемента это "длина ResultArr минус 1") равен открывающ скобке, которая лежит в correspondBracket 
      // ИЛИ
      // если определенный элемент массива ResultArr (где номер этого элемента это "длина ResultArr минус 1") равен i элементу строки str
      if (ResultArr[ResultArr.length - 1] === correspondBracket || ResultArr[ResultArr.length - 1] === str[i]) {
        // если так, то мы вырезаем 1 символ с конца в массиве ResultArr
        ResultArr.pop();

        // если  i-ый элемент строки str не равен открытой скобке
      } else if (str[i] !== correspondBracket) {
        return false; // то возвращаем false

      } else { // иначе записываем в ResultArr i-ый элемент строки str
        ResultArr.push(str[i]);

      }
    } else { // иначе записываем в ResultArr i-ый элемент строки str
      ResultArr.push(str[i]);
    }
  }

  // return (сравнение) 
  // вернет true, если длина ResultArr === 0, 
  // false, если длина массива ResultArr НЕ НОЛЬ
  return ResultArr.length === 0;
  


}




check('()',         [['(', ')']]) // -> true
check('((()))()',   [['(', ')']]) // -> true
check('())(',       [['(', ')']]) // -> false
check('([{}])',     [['(', ')'], ['[', ']'], ['{', '}']]) // -> true
check('[(])',       [['(', ')'], ['[', ']']]) // -> false
check('[]()',       [['(', ')'], ['[', ']']]) // -> true
check('[]()(',      [['(', ')'], ['[', ']']]) // -> false

// special case: opening and closing bracket can be the same :)

check('||',           [['|', '|']]) // -> true
check('|()|',         [['(', ')'], ['|', '|']]) // -> true
check('|(|)',         [['(', ')'], ['|', '|']]) // -> false
check('|()|(||)||',   [['(', ')'], ['|', '|']]) // -> true