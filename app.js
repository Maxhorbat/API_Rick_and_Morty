const API_URL = "https://rickandmortyapi.com/api/character";

const contenedor = document.getElementById("contenedorPersonajes");
const textoPagina = document.getElementById("textoPagina");
const mensajeError = document.getElementById("mensajeError");

let paginaActual = 1;
let totalPaginas = 1;

async function obtenerPersonajes(pagina = 1) {

    try {

        mensajeError.innerHTML = "";

        const respuesta = await fetch(`${API_URL}?page=${pagina}`);

        if (!respuesta.ok) {
            throw new Error("Error al obtener personajes");
        }

        const datos = await respuesta.json();

        totalPaginas = datos.info.pages;

        textoPagina.textContent =
            `Página ${paginaActual} de ${totalPaginas}`;

        mostrarPersonajes(datos.results);

    } catch (error) {

        contenedor.innerHTML = "";

        mensajeError.innerHTML = `
            <div class="alert alert-danger text-center">
                No se pudieron cargar los personajes.
            </div>
        `;
    }
}

function obtenerClaseEstado(estado){

    if(estado === "Alive") return "alive";
    if(estado === "Dead") return "dead";

    return "unknown";
}

function mostrarPersonajes(personajes){

    contenedor.innerHTML = "";

    personajes.forEach(personaje => {

        const card = document.createElement("div");

        card.className = "col-12 col-md-6 col-lg-3";

        card.innerHTML = `
            <div class="card text-white">

                <img
                    src="${personaje.image}"
                    class="card-img-top"
                    alt="${personaje.name}"
                >

                <div class="card-body">

                    <h5>${personaje.name}</h5>

                    <p>
                        <span class="status-dot ${obtenerClaseEstado(personaje.status)}"></span>
                        ${personaje.status} - ${personaje.species}
                    </p>

                    <small class="text-secondary">
                        Última ubicación:
                    </small>

                    <div class="location-text mb-3">
                        ${personaje.location.name}
                    </div>

                    <button
                        class="btn btn-primary btn-detalle"
                        onclick="window.location.href='detalle.html?id=${personaje.id}'"
                    >
                        Detalle
                    </button>

                </div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

async function mostrarDetalle(id){

    try{

        const respuesta = await fetch(`${API_URL}/${id}`);

        if(!respuesta.ok){
            throw new Error("Error");
        }

        const personaje = await respuesta.json();

        document.getElementById("modalTitulo").textContent =
            personaje.name;

        const fecha = new Date(personaje.created);

        const fechaFormateada =
            fecha.toLocaleDateString("es-ES");

        document.getElementById("modalContenido").innerHTML = `

            <div class="row">

                <div class="col-md-4 text-center">
                    <img
                        src="${personaje.image}"
                        class="img-fluid rounded"
                    >
                </div>

                <div class="col-md-8">

                    <p><strong>ID:</strong> ${personaje.id}</p>

                    <p>
                        <strong>Estado:</strong>
                        ${personaje.status}
                    </p>

                    <p>
                        <strong>Especie:</strong>
                        ${personaje.species}
                    </p>

                    <p>
                        <strong>Género:</strong>
                        ${personaje.gender}
                    </p>

                    <p>
                        <strong>Tipo:</strong>
                        ${personaje.type || "Sin tipo"}
                    </p>

                    <p>
                        <strong>Origen:</strong>
                        ${personaje.origin.name}
                    </p>

                    <p>
                        <strong>Última ubicación:</strong>
                        ${personaje.location.name}
                    </p>

                    <p>
                        <strong>Episodios:</strong>
                        ${personaje.episode.length}
                    </p>

                    <p>
                        <strong>Creado:</strong>
                        ${fechaFormateada}
                    </p>

                </div>

            </div>
        `;

        const modal = new bootstrap.Modal(
            document.getElementById("detalleModal")
        );

        modal.show();

    }catch(error){

        alert("No se pudo cargar el detalle");
    }
}

document.getElementById("btnSiguiente")
.addEventListener("click", () => {

    if(paginaActual < totalPaginas){

        paginaActual++;

        obtenerPersonajes(paginaActual);
    }
});

document.getElementById("btnAnterior")
.addEventListener("click", () => {

    if(paginaActual > 1){

        paginaActual--;

        obtenerPersonajes(paginaActual);
    }
});

obtenerPersonajes();