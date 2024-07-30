const prompt = require("prompt-sync")();
const verificarInvalido = (aux) => aux.trim() == "";
const usuarios = [];
let ultimoId = 1;

const emailValido = (email) => {
  let valido = true;

  usuarios.forEach((usuario) => {
    if (email === usuario.email) {
      console.log("Email duplicado");
      valido = false;
    }
  });

  return valido && email !== "";
};

const adicionar = () => {
  let entrada = {};

  while (true) {
    entrada.email = prompt("Qual o seu email: ");
    if (verificarInvalido(entrada.email)) {
      console.log("O e-mail não pode ser vazio");
    } else if (!emailValido(entrada.email)) {
      console.log("O e-mail é inválido ou duplicado");
    } else {
      break;
    }
  }

  while (true) {
    entrada.nome = prompt("Digite o nome do usuário que será adicionado: ");
    if (verificarInvalido(entrada.nome)) {
      console.log("O nome não pode estar vazio");
    } else {
      break;
    }
  }

  entrada.telefones = [];
  let adicionarMais = true;

  while (adicionarMais) {
    let telefone = {};

    while (true) {
      telefone.numero = prompt("Digite seu número de celular: ");
      telefone.num = telefone.numero.replace(/\D/g, "");
      if (verificarInvalido(telefone.numero) || isNaN(telefone.num)) {
        console.log(
          "O número não pode estar vazio e deve ser um número (ex: 123)"
        );
      } else {
        telefone.codigoPais = prompt("Digite o código do país (ex: +10): ");
        telefone.cp = telefone.codigoPais.replace(/\D/g, "");
        if (
          verificarInvalido(telefone.codigoPais) ||
          telefone.cp.length > 3 ||
          isNaN(telefone.cp)
        ) {
          console.log(
            "O código do país deve ter no máximo 3 dígitos e deve ser formado apenas por números"
          );
        } else {
          telefone.completo = `+${telefone.cp} ${telefone.num}`;
          break;
        }
      }
    }

    entrada.telefones.push(telefone);

    let resposta = prompt(
      "Deseja adicionar outro telefone? (s/n): "
    ).toLowerCase();
    if (resposta !== "s") {
      adicionarMais = false;
    }
  }

  if (
    entrada.nome !== "" &&
    entrada.telefones.length > 0 &&
    emailValido(entrada.email)
  ) {
    entrada.id = ultimoId++;
    usuarios.push(entrada);
    console.log("Usuário adicionado com sucesso");
  } else {
    console.log(
      "Erro ao adicionar usuário. Verifique os dados e tente novamente."
    );
  }
};

const listagem = () => {
  usuarios.forEach((usuario) => {
    console.log("ID: " + usuario.id);
    console.log("Nome do usuário: " + usuario.nome);
    console.log("E-mail do usuário: " + usuario.email);
    console.log("Telefones do usuário: ");
    usuario.telefones.forEach((telefone, index) => {
      console.log("Telefone " + (index + 1) + ": " + telefone.completo);
    });
    console.log("");
  });
};

const atualizacao = () => {
  if (usuarios.length === 0) {
    console.log("Nenhum usuário cadastrado ainda.");
    return;
  }

  listagem();
  const escolha = parseInt(
    prompt("Qual o ID do cadastro que terá modificações? ")
  );
  const usuario = usuarios.find((u) => u.id === escolha);

  if (!usuario) {
    console.log("ID não encontrado.");
    return;
  }

  const novoNome = prompt(`Qual o novo nome? (Atual: ${usuario.nome}): `);
  if (!verificarInvalido(novoNome)) {
    usuario.nome = novoNome;
  }

  const novoEmail = prompt(`Qual o novo email? (Atual: ${usuario.email}): `);
  if (!verificarInvalido(novoEmail) && emailValido(novoEmail)) {
    usuario.email = novoEmail;
  }

  let atualizarTelefones = prompt(
    "Deseja alterar os números de telefone? (s/n): "
  ).toLowerCase();
  if (atualizarTelefones === "s") {
    usuario.telefones = [];
    let adicionarMais = true;

    while (adicionarMais) {
      let telefone = {};

      while (true) {
        telefone.numero = prompt("Digite seu número de celular: ");
        telefone.num = telefone.numero.replace(/\D/g, "");
        if (verificarInvalido(telefone.numero) || isNaN(telefone.num)) {
          console.log(
            "O número não pode estar vazio e deve ser um número (ex: 123)"
          );
        } else {
          telefone.codigoPais = prompt("Digite o código do país (ex: +10): ");
          telefone.cp = telefone.codigoPais.replace(/\D/g, "");
          if (
            verificarInvalido(telefone.codigoPais) ||
            telefone.cp.length > 3 ||
            isNaN(telefone.cp)
          ) {
            console.log(
              "O código do país deve ter no máximo 3 dígitos e deve ser formado apenas por números"
            );
          } else {
            telefone.completo = `+${telefone.cp} ${telefone.num}`;
            break;
          }
        }
      }

      usuario.telefones.push(telefone);

      let resposta = prompt(
        "Deseja adicionar outro telefone? (s/n): "
      ).toLowerCase();
      if (resposta !== "s") {
        adicionarMais = false;
      }
    }
  }

  console.log("Dados do usuário atualizados.");
};

const remocao = () => {
  if (usuarios.length === 0) {
    console.log("Nenhum usuário cadastrado ainda.");
    return;
  }

  listagem();
  const escolha = parseInt(prompt("Qual o ID do cadastro que será excluído? "));
  const index = usuarios.findIndex((u) => u.id === escolha);

  if (index === -1) {
    console.log("ID não encontrado.");
    return;
  }

  usuarios.splice(index, 1);
  console.log("Usuário removido com sucesso.");
};

module.exports = {
  adicionar,
  listagem,
  atualizacao,
  remocao,
};
