import { tablero } from "./modelo";
import { esPartidaCompleta, iniciaPartida, parejaEncontrada, parejaNoEncontrada, resetEstado, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta } from "./motor";

export const inicializa = () => {
	const app = document.getElementById("app");

	const handleClickCarta = (carta: HTMLButtonElement) => {
		const idCarta = carta.getAttribute("data-id");
		if (idCarta) {
			if (sePuedeVoltearLaCarta(tablero, parseInt(idCarta))) {
				voltearCartaUI(carta, idCarta);
			} else {
				crearFeedback("Esa carta ya está volteada");
			}
		}
	};

	const voltearCartaUI = (carta: HTMLButtonElement, idCarta: string) => {
		switch (tablero.estadoPartida) {
			case "CeroCartasLevantadas":
				voltearLaCarta(tablero, parseInt(idCarta));
				carta.classList.add("volteada");
				break;
			case "UnaCartaLevantada":
				voltearLaCarta(tablero, parseInt(idCarta));
				carta.classList.add("volteada");
				pintaIntentos();
				comparaCartas();
				break;
			case "DosCartasLevantadas":
				crearFeedback("Puede haber un maximo de dos cartas volteadas");
				carta.blur();
				break;
			default:
				break;
		}
	};

	const comparaCartas = () => {
		let idCartaA = tablero.indiceCartaVolteadaA;
		let idCartaB = tablero.indiceCartaVolteadaB;

		if (idCartaA !== undefined && idCartaB !== undefined) {
			let sonIguales = sonPareja(idCartaA, idCartaB, tablero);
			if (sonIguales) {
				parejaEncontrada(idCartaA, idCartaB, tablero);
				if (esPartidaCompleta(tablero)) mostrarPantallaFinal();
			} else {
				parejaNoEncontrada(idCartaA, idCartaB, tablero);
				setTimeout(() => {
					resetEstado(tablero);
					const cartaA = document.getElementById(`carta_${idCartaA}`);
					const cartaB = document.getElementById(`carta_${idCartaB}`);
					cartaA?.classList.remove("volteada");
					cartaB?.classList.remove("volteada");
				}, 1000);
			}
		}
	};

	const crearTitulo = (main: HTMLElement) => {
		const titulo = document.createElement("h1");
		titulo.innerText = "Juego de memoria";
		main.appendChild(titulo);
	};

	const crearCartas = (main: HTMLElement) => {
		iniciaPartida(tablero);
		tablero.cartas.forEach((carta, i) => {
			const elementoCarta = document.createElement("button");
			elementoCarta.classList.add("carta");
			elementoCarta.setAttribute("data-id", i.toString());
			elementoCarta.setAttribute("id", `carta_${i.toString()}`);

			const cartaInner = document.createElement("div");
			cartaInner.classList.add("carta-inner");

			const cartaFront = document.createElement("div");
			cartaFront.classList.add("carta-front");

			const cartaBack = document.createElement("div");
			cartaBack.classList.add("carta-back");

			const imgCarta = document.createElement("img");
			imgCarta.src = carta.imgUrl;

			cartaBack.appendChild(imgCarta);

			cartaInner.appendChild(cartaFront);
			cartaInner.appendChild(cartaBack);
			elementoCarta.appendChild(cartaInner);

			main.appendChild(elementoCarta);

			elementoCarta.addEventListener("click", () => {
				handleClickCarta(elementoCarta);
			});
		});
	};

	const crearBotonIniciar = (secTablero: HTMLElement) => {
		const botonIniciar = document.createElement("button");
		botonIniciar.setAttribute("id", "botonIniciar");
		botonIniciar.innerText = "Iniciar partida";
		secTablero.appendChild(botonIniciar);

		botonIniciar.addEventListener("click", () => {
			botonIniciar.remove();
			crearSecTablero();
		});
	};

	const crearSecTablero = () => {
		const secTablero = document.createElement("section");
		secTablero.setAttribute("id", "secTablero");
		secTablero.classList.add("grid");
		crearCartas(secTablero);

		const intentosText = document.createElement("h3");
		intentosText.setAttribute("id", "intentosText");

		const main = document.getElementById("main");
		if (main && main instanceof HTMLElement) {
			main.appendChild(secTablero);
			main.appendChild(intentosText);
		}
		pintaIntentos();
	};

	const pintaIntentos = (): void => {
		const intentosText = document.getElementById("intentosText");
		if (intentosText) {
			intentosText.innerText = `Intentos: ${tablero.intentos}`;
		}
	};

	const crearMain = () => {
		if (app && app instanceof HTMLDivElement) {
			const main = document.createElement("main");
			main.setAttribute("id", "main");
			app.appendChild(main);
			crearTitulo(main);

			crearBotonIniciar(main);
		}
	};

	const crearFeedback = (mensaje: string) => {
		if (app && app instanceof HTMLDivElement) {
			const feedbackBox = document.createElement("div");
			feedbackBox.setAttribute("id", "feedbackBox");
			feedbackBox.classList.add("activo");

			const feedbackText = document.createElement("p");
			feedbackText.setAttribute("id", "feedbackText");
			feedbackText.innerText = mensaje;

			feedbackBox.appendChild(feedbackText);

			const feedbackClose = document.createElement("button");
			feedbackClose.setAttribute("id", "feedbackClose");
			feedbackClose.innerText = "x";

			feedbackBox.appendChild(feedbackClose);

			feedbackClose.addEventListener("click", () => {
				feedbackBox.classList.remove("activo");
			});

			setTimeout(() => {
				feedbackBox.classList.remove("activo");
			}, 2000);

			app.appendChild(feedbackBox);
		}
	};

	const mostrarPantallaFinal = () => {
		const botonReiniciar = document.createElement("button");
		botonReiniciar.setAttribute("id", "botonReiniciar");
		botonReiniciar.innerText = "Reiniciar Partida";
		const main = document.getElementById("main");
		main?.appendChild(botonReiniciar);
		botonReiniciar.addEventListener("click", () => {
			botonReiniciar.remove();
			reiniciarPartida();
		});
	};

	const reiniciarPartida = () => {
		// iniciaPartida(tablero);
		const secTablero = document.getElementById("secTablero");
		secTablero?.remove();
		const intentosText = document.getElementById("intentosText");
		intentosText?.remove();
		crearSecTablero();
	};

	crearMain();
};
