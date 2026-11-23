let a ="hola";

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pedir(texto) {
  return new Promise((resolve) => rl.question(texto, resolve));
}

function leerNumero(texto) {
  return (async () => {
    while (true) {
      const entrada = await pedir(texto);
      const numero = Number(entrada);

      if (entrada.trim() !== "" && Number.isFinite(numero)) {
        return numero;
      }

      console.log("Introduce un numero valido.");
    }
  })();
}

async function calcular() {
  while (true) {
    console.log("\n=== Calculadora ===");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Elevar a una potencia");
    console.log("0. Salir");

    const opcion = (await pedir("\nElige una opcion: ")).trim();

    if (opcion === "0") {
      console.log("Hasta pronto.");
      rl.close();
      return;
    }

    if (!["1", "2", "3", "4", "5"].includes(opcion)) {
      console.log("Opcion no valida.");
      continue;
    }

    const a = await leerNumero("Primer numero: ");
    const b = await leerNumero("Segundo numero: ");
    let resultado;

    switch (opcion) {
      case "1":
        resultado = a + b;
        break;
      case "2":
        resultado = a - b;
        break;
      case "3":
        resultado = a * b;
        break;
      case "4":
        if (b === 0) {
          console.log("No se puede dividir entre cero.");
          continue;
        }
        resultado = a / b;
        break;
      case "5":
        resultado = Math.pow(a, b);
        break;
    }

    if (!Number.isFinite(resultado)) {
      console.log("El resultado no es un numero valido.");
    } else {
      console.log(`Resultado: ${resultado}`);
    }
  }
}

calcular();
