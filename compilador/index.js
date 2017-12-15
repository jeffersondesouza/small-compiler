const fs = require('fs');
const listaDeTokens = JSON.parse(fs.readFileSync(`${__dirname}/tokens.json`, 'utf-8'));



function ehNumero(caractere) {
  return /\d/.test(caractere);
}
function ehLetra(caractere) {
  return /\w/.test(caractere);
}


function gerarTokens(entrada) {

  let indiceCorrente = 0;
  const tokens = [];

  while (indiceCorrente < entrada.length) {

    let caractereAtual = entrada.charAt(indiceCorrente);

    if (!ehLetra(caractereAtual) && !ehNumero(caractereAtual) && listaDeTokens[caractereAtual]) {
      tokens.push(listaDeTokens[caractereAtual])
      indiceCorrente++;
      continue;
    } else if (/\s/.test(caractereAtual)) {
      indiceCorrente++;
      continue;
    } else if (ehNumero(caractereAtual)) {
      let fragmentoCaractereAtual = '';

      while (ehNumero(caractereAtual)) {
        fragmentoCaractereAtual += caractereAtual;
        caractereAtual = entrada[++indiceCorrente];
      }

      tokens.push({ type: 'number', value: fragmentoCaractereAtual });

    } else if (ehLetra(caractereAtual)) {
      let fragmentoCaractereAtual = '';

      while (ehLetra(caractereAtual)) {
        fragmentoCaractereAtual += caractereAtual;
        caractereAtual = entrada[++indiceCorrente];
      }

      tokens.push({ type: 'string', value: fragmentoCaractereAtual });

    }

    else {
      throw new TypeError('Caractere Desconhecido: ' + caractereAtual);
    }
  }

  console.log('Tokens: ', '\n', tokens, '\n');
  return tokens;
}

function gerarArvoreSintatica(tokens) {

  let indiceCorrente = 0;

  function avaliarTokens() {

    let token = tokens[indiceCorrente];

    if (token.type === 'number') {
      indiceCorrente++;
      return {
        type: 'NumeroLiteral',
        value: token.value,
      };
    }

    if (token.type === 'string') {
      indiceCorrente++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    if (
      token.type === 'paren' &&
      token.value === '('
    ) {

      token = tokens[++indiceCorrente];

      let node = {
        type: 'ChamaExpression',
        name: token.value,
        params: [],
      };

      token = tokens[++indiceCorrente];

      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(avaliarTokens());
        token = tokens[indiceCorrente];
      }

      indiceCorrente++;

      return node;
    }

    // Lança excessão em caso de não achar token
    throw new TypeError('Token ou caractere desconhecido: ',token.type);
  }


  let arvoreSintatica = {
    type: 'Program',
    body: [],
  };

  while (indiceCorrente < tokens.length) {
    arvoreSintatica.body.push(avaliarTokens());
  }
  console.log('Árvore Sintática: ', '\n',JSON.stringify(arvoreSintatica, null, 2))
  return arvoreSintatica;
}


function compilar(entrada) {
  console.log('\n', 'Entrada: ', entrada, '\n');

  const tokens = gerarTokens(entrada);
  const arvereSintatica = gerarArvoreSintatica(tokens);
}

function Compilador() {
  return {
    compilar
  }
}

module.exports = new Compilador();