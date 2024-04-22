export interface Carta {
	imgId: number;
	imgUrl: string;
	estaVuelta: boolean;
	encontrada: boolean;
}

interface InfoCarta {
	imgId: number;
	imgUrl: string;
}

const BASE_URL = "/src/img/";
const infoCartas: InfoCarta[] = [
	{
		imgId: 1,
		imgUrl: `${BASE_URL}1.png`,
	},
	{
		imgId: 2,
		imgUrl: `${BASE_URL}2.png`,
	},
	{
		imgId: 3,
		imgUrl: `${BASE_URL}3.png`,
	},
	{
		imgId: 4,
		imgUrl: `${BASE_URL}4.png`,
	},
	{
		imgId: 5,
		imgUrl: `${BASE_URL}5.png`,
	},
	{
		imgId: 6,
		imgUrl: `${BASE_URL}6.png`,
	},
];

const crearCartaInicial = (imgId: number, imgUrl: string): Carta => ({
	imgId,
	imgUrl,
	estaVuelta: false,
	encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
	let cartas: Carta[] = [];
	infoCartas.forEach((carta: InfoCarta) => {
		cartas.push(crearCartaInicial(carta.imgId, carta.imgUrl));
		cartas.push(crearCartaInicial(carta.imgId, carta.imgUrl));
	});
	return cartas;
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

type EstadoPartida = "PartidaNoIniciada" | "CeroCartasLevantadas" | "UnaCartaLevantada" | "DosCartasLevantadas" | "PartidaCompleta";

export interface Tablero {
	cartas: Carta[];
	estadoPartida: EstadoPartida;
	indiceCartaVolteadaA?: number;
	indiceCartaVolteadaB?: number;
	intentos: number;
}

const crearTableroInicial = (): Tablero => ({
	cartas: cartas,
	estadoPartida: "PartidaNoIniciada",
	intentos: 0,
});

export let tablero: Tablero = crearTableroInicial();
