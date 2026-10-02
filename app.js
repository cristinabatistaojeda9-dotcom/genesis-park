/* =========================================================
   GENESIS PARK
   SISTEMA PRINCIPAL DE LA APLICACIÓN
========================================================= */


/* =========================================================
   DATOS DE LOS DINOSAURIOS

   AQUÍ PODREMOS MODIFICAR:
   - Nombre
   - Especie
   - Sexo
   - Edad
   - Peso
   - Longitud
   - Peligrosidad
   - Estado
   - Posición en el mapa
========================================================= */

const dinosaurios = [

    {
        id: "REX-01",
        nombre: "Rex",
        especie: "Tyrannosaurus rex",
        sexo: "Macho",
        edad: 14,
        peso: 7200,
        longitud: 11.8,
        peligrosidad: "Extrema",
        estado: "Activo",
        x: 680,
        y: 160
    },

    {
        id: "RAPTOR-01",
        nombre: "Raptor 01",
        especie: "Velociraptor",
        sexo: "Hembra",
        edad: 8,
        peso: 42,
        longitud: 1.9,
        peligrosidad: "Alta",
        estado: "Activo",
        x: 700,
        y: 440
    },

    {
        id: "TRIKE-01",
        nombre: "Trike 01",
        especie: "Triceratops",
        sexo: "Macho",
        edad: 21,
        peso: 6000,
        longitud: 8,
        peligrosidad: "Media",
        estado: "Activo",
        x: 200,
        y: 440
    },

    {
        id: "STEGO-01",
        nombre: "Stego 01",
        especie: "Stegosaurus",
        sexo: "Hembra",
        edad: 17,
        peso: 3100,
        longitud: 7,
        peligrosidad: "Baja",
        estado: "Activo",
        x: 280,
        y: 350
    }

];


/* =========================================================
   POSICIÓN DEL JUGADOR

   Estas coordenadas representan su posición
   DENTRO DEL MAPA DE GENESIS PARK.
========================================================= */

const jugador = {

    nombre: "Jugador",

    x: 450,

    y: 390

};


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const configuracion = {

    movimientoAutomatico: false,

    mostrarDistancias: true,

    alertasActivas: true,

    distanciaPrecaucion: 1000,

    distanciaPeligro: 500,

    distanciaCritica: 200

};


/* =========================================================
   FUNCIONES DE UTILIDAD
========================================================= */


/*
   Buscar un dinosaurio por su ID.
*/

function buscarDinosaurio(id) {

    return dinosaurios.find(
        dinosaurio => dinosaurio.id === id
    );

}


/*
   Calcular distancia entre dos puntos del mapa.
*/

function calcularDistancia(x1, y1, x2, y2) {

    const diferenciaX = x1 - x2;

    const diferenciaY = y1 - y2;

    return Math.sqrt(
        diferenciaX * diferenciaX +
        diferenciaY * diferenciaY
    );

}


/*
   Convertir la distancia del mapa
   en una distancia ficticia en metros.

   Más adelante podremos sustituir esto
   por una escala real.
*/

function distanciaEnMetros(distanciaMapa) {

    return distanciaMapa * 10;

}


/* =========================================================
   MOSTRAR FICHA DEL DINOSAURIO
========================================================= */

function mostrarDinosaurio(dinosaurio) {

    const titulo =
        document.getElementById("titulo-panel");

    const contenido =
        document.getElementById("contenido-panel");


    if (!titulo || !contenido) {

        console.warn(
            "No se encontró el panel de información."
        );

        return;

    }


    titulo.textContent =
        dinosaurio.nombre;


    contenido.innerHTML = `

        <div class="dato">

            <span class="dato-etiqueta">
                Identificación
            </span>

            <span class="dato-valor">
                ${dinosaurio.id}
            </span>

        </div>


        <div class="dato">

            <span class="dato-etiqueta">
                Especie
            </span>

            <span class="dato-valor">
                ${dinosaurio.especie}
            </span>

        </div>


        <div class="dato">

            <span class="dato-etiqueta">
                Sexo
            </span>

            <span class="dato-valor">
                ${dinosaurio.sexo}
            </span>

        </div>


        <div class="dato">

            <span class="dato-etiqueta">
                Edad
            </span>

            <span class="dato-valor">
                ${dinosaurio.edad} años
            </span>

        </div>


        <div class="dato">

            <span class="dato-etiqueta">
                Peso
            </span>

            <span class="dato-valor">
                ${dinosaurio.peso.toLocaleString("es-ES")} kg
            </span>

        </div>


        <div class="dato">

            <span class="dato-etiqueta">
                Longitud
            </span>

            <span class="dato-valor">
                ${dinosaurio.longitud} m
            </span>

        </div>


        <div class="dato">

            <span class="dato-etiqueta">
                Peligrosidad
            </span>

            <span class="dato-valor">
                ${dinosaurio.peligrosidad}
            </span>

        </div>


        <div class="dato">

            <span class="dato-etiqueta">
                Estado
            </span>

            <span class="dato-valor">
                ${dinosaurio.estado}
            </span>

        </div>

    `;

}


/* =========================================================
   ACTUALIZAR POSICIÓN DE UN DINOSAURIO EN EL MAPA
========================================================= */

function actualizarMarcadorDinosaurio(dinosaurio) {

    const marcador =
        document.querySelector(
            `[data-dinosaurio="${dinosaurio.id}"]`
        );


    if (!marcador) {

        return;

    }


    marcador.setAttribute(
        "transform",
        `translate(${dinosaurio.x}, ${dinosaurio.y})`
    );

}


/* =========================================================
   MOVER UN DINOSAURIO MANUALMENTE
========================================================= */

function moverDinosaurio(id, x, y) {

    const dinosaurio =
        buscarDinosaurio(id);


    if (!dinosaurio) {

        console.warn(
            "Dinosaurio no encontrado:",
            id
        );

        return;

    }


    dinosaurio.x = x;

    dinosaurio.y = y;


    actualizarMarcadorDinosaurio(
        dinosaurio
    );


    actualizarDistancias();

}


/* =========================================================
   MOVER AL JUGADOR MANUALMENTE
========================================================= */

function moverJugador(x, y) {

    jugador.x = x;

    jugador.y = y;


    const marcador =
        document.getElementById(
            "marcador-jugador"
        );


    if (marcador) {

        marcador.setAttribute(
            "transform",
            `translate(${jugador.x}, ${jugador.y})`
        );

    }


    actualizarDistancias();

}


/* =========================================================
   CALCULAR DISTANCIAS
========================================================= */

function actualizarDistancias() {

    const lista =
        document.getElementById(
            "lista-distancias"
        );


    if (!lista) {

        return;

    }


    lista.innerHTML = "";


    dinosaurios.forEach(
        dinosaurio => {

            const distanciaMapa =
                calcularDistancia(
                    jugador.x,
                    jugador.y,
                    dinosaurio.x,
                    dinosaurio.y
                );


            const metros =
                distanciaEnMetros(
                    distanciaMapa
                );


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "distancia-dinosaurio";


            elemento.innerHTML = `

                <strong>
                    ${dinosaurio.id}
                </strong>

                <span>
                    ${Math.round(metros)} m
                </span>

            `;


            lista.appendChild(
                elemento
            );

        }
    );


    actualizarAlerta();

}


/* =========================================================
   SISTEMA DE ALERTAS
========================================================= */

function actualizarAlerta() {

    if (
        !configuracion.alertasActivas
    ) {

        return;

    }


    const alerta =
        document.getElementById(
            "alerta-principal"
        );


    if (!alerta) {

        return;

    }


    let dinosaurioMasCercano =
        null;


    let distanciaMasCercana =
        Infinity;


    dinosaurios.forEach(
        dinosaurio => {

            const distancia =
                calcularDistancia(
                    jugador.x,
                    jugador.y,
                    dinosaurio.x,
                    dinosaurio.y
                );


            if (
                distancia <
                distanciaMasCercana
            ) {

                distanciaMasCercana =
                    distancia;

                dinosaurioMasCercano =
                    dinosaurio;

            }

        }
    );


    const metros =
        distanciaEnMetros(
            distanciaMasCercana
        );


    if (
        metros <=
        configuracion.distanciaCritica
    ) {

        alerta.innerHTML = `
            🔴 ALERTA CRÍTICA<br>
            ${dinosaurioMasCercano.nombre}
            se encuentra a
            ${Math.round(metros)} metros.
        `;

        alerta.className =
            "alerta critica";

    }

    else if (
        metros <=
        configuracion.distanciaPeligro
    ) {

        alerta.innerHTML = `
            🟠 PELIGRO<br>
            ${dinosaurioMasCercano.nombre}
            se encuentra a
            ${Math.round(metros)} metros.
        `;

        alerta.className =
            "alerta peligro";

    }

    else if (
        metros <=
        configuracion.distanciaPrecaucion
    ) {

        alerta.innerHTML = `
            🟡 PRECAUCIÓN<br>
            ${dinosaurioMasCercano.nombre}
            se encuentra a
            ${Math.round(metros)} metros.
        `;

        alerta.className =
            "alerta precaucion";

    }

    else {

        alerta.innerHTML = `
            🟢 ZONA SEGURA<br>
            No hay dinosaurios peligrosos
            en las proximidades.
        `;

        alerta.className =
            "alerta segura";

    }

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

function iniciarAplicacion() {

    console.log(
        "Genesis Park iniciado."
    );


    actualizarDistancias();

}


/*
   Ejecutar cuando se haya cargado la página.
*/

document.addEventListener(
    "DOMContentLoaded",
    iniciarAplicacion
);
