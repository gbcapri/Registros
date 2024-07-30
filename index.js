const prompt = require("prompt-sync")();
const { adicionar, listagem, atualizacao, remocao } = require("./cadastro.js");

while (true) {
  console.log(`
          1 - adicionar cadastro
          2 - Listar cadastros
          3 - atualizar um cadastro
          4 - Remover um cadastro
          0 - Sair`);
  const opcao = prompt("Qual opção deseja?");

  switch (opcao) {
    case "1":
      adicionar();
      break;
    case "2":
      listagem();
      break;
    case "3":
      atualizacao();
      break;
    case "4":
      remocao();
      break;
    case "0":
      process.exit();
      break;
    default:
      console.log("Opção inválida");
      break;
  }
}
