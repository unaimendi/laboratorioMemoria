import { Carta, Tablero, crearColeccionDeCartasInicial, infoCartas } from "./modelo";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
const barajarCartas = (cartas: Carta[]): Carta[] => {
	let currentIndex = cartas.length;

	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[cartas[currentIndex], cartas[randomIndex]] = [cartas[randomIndex], cartas[currentIndex]];
	}

	return cartas;
};

/*
	Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
	return !tablero.cartas[indice].estaVuelta && !tablero.cartas[indice].encontrada ? true : false;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
	tablero.cartas[indice].estaVuelta = true;
	switch (tablero.estadoPartida) {
		case "CeroCartasLevantadas":
			tablero.estadoPartida = "UnaCartaLevantada";
			tablero.indiceCartaVolteadaA = indice;
			break;
		case "UnaCartaLevantada":
			tablero.intentos++;
			tablero.estadoPartida = "DosCartasLevantadas";
			tablero.indiceCartaVolteadaB = indice;
			break;
		default:
			break;
	}
};

/*
	Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
	return tablero.cartas[indiceA].imgId === tablero.cartas[indiceB].imgId ? true : false;
};

/*
	Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (indiceA: number, indiceB: number, tablero: Tablero): void => {
	tablero.cartas[indiceA].encontrada = true;
	tablero.cartas[indiceB].encontrada = true;
	tablero.cartas[indiceA].estaVuelta = true;
	tablero.cartas[indiceB].estaVuelta = true;
	tablero.indiceCartaVolteadaA = undefined;
	tablero.indiceCartaVolteadaB = undefined;
	tablero.estadoPartida = "CeroCartasLevantadas";
	if (esPartidaCompleta(tablero)) tablero.estadoPartida = "PartidaCompleta";
};

/*
	Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
export const parejaNoEncontrada = (indiceA: number, indiceB: number, tablero: Tablero): void => {
	tablero.cartas[indiceA].estaVuelta = false;
	tablero.cartas[indiceB].estaVuelta = false;
	tablero.estadoPartida = "CeroCartasLevantadas";
	tablero.indiceCartaVolteadaA = undefined;
	tablero.indiceCartaVolteadaB = undefined;
};

/*
	Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
export const esPartidaCompleta = (tablero: Tablero): boolean => tablero.cartas.every((carta) => carta.encontrada);

/*
  Iniciar partida
  */

export const iniciaPartida = (tablero: Tablero): void => {
	let cartas = crearColeccionDeCartasInicial(infoCartas);
	tablero.cartas = cartas;
	barajarCartas(tablero.cartas);
	tablero.intentos = 0;
	tablero.estadoPartida = "CeroCartasLevantadas";
};
