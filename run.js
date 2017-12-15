const Compilador = require('./compilador');

/* 
  Nossa regra dita que toda expressão abra e feche chaves, 
  e asoperações  são chamadas via nome SOMAR, SUBTRAIR, etc. 

  $ ---> símbulo d esconhecido, para testarmos o erro
*/

console.log('\n', '========== ENTRADA VÁLIDA ==========')
const entrada = '(somar 2 (subtrair 4 2))';
Compilador.compilar(entrada)


console.log('\n', '\n', '========== ENTRADA INVÁLIDA ==========')
const entrada2 = '(somar 2 (subtrair 4 2)&&&';
Compilador.compilar(entrada2)



