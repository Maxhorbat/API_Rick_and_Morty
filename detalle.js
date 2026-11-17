const API_URL = "https://rickandmortyapi.com/api/character";

const contenedor = document.getElementById("detalle");

// Obtener el id desde la URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

async function cargarDetalle() {

    try {

        if (!id) {
            throw new Error("ID no válido");
        }

        const respuesta = await fetch(`${API_URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error("Personaje no encontrado");
        }

        const personaje = await respuesta.json();

        const fecha = new Date(personaje.created);

        const fechaFormateada = fecha.toLocaleDateString(
            "es-ES",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

        contenedor.innerHTML = `
            <div class="card shadow p-4">

                <div class="row">

                    <div class="col-md-4 text-center">
                        <img
                            src="${personaje.image}"
                            alt="${personaje.name}"
                            class="img-fluid rounded"
                        >
                    </div>

                    <div class="col-md-8">

                        <h2 class="mb-3">
                            ${personaje.name}
                        </h2>

                        <hr>

                        <p>
                            <strong>ID:</strong>
                            ${personaje.id}
                        </p>

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
                            <strong>Total de episodios:</strong>
                            ${personaje.episode.length}
                        </p>

                        <p>
                            <strong>Fecha de creación:</strong>
                            ${fechaFormateada}
                        </p>

                    </div>

                </div>

            </div>
        `;

    } catch (error) {

        const colorEstado =
    personaje.status === "Alive"
        ? "success"
        : personaje.status === "Dead"
        ? "danger"
        : "secondary";

        contenedor.innerHTML = `

        <div class="card shadow-lg border-0 bg-dark text-white">

            <div class="card-header">
                <h3 class="mb-0">${personaje.name}</h3>
            </div>

            <div class="card-body">

                <div class="row">

                    <div class="col-md-4 text-center">

                        <img
                            src="${personaje.image}"
                            alt="${personaje.name}"
                            class="img-fluid rounded shadow"
                        >

                    </div>

                    <div class="col-md-8">

                        <table class="table table-dark align-middle">

                            <tbody>

                                <tr>
                                    <td class="text-secondary">ID</td>
                                    <td>${personaje.id}</td>
                                </tr>

                                <tr>
                                    <td class="text-secondary">Estado</td>
                                    <td>
                                        <span
                                            style="
                                                display:inline-block;
                                                width:10px;
                                                height:10px;
                                                border-radius:50%;
                                                margin-right:8px;
                                                background:
                                                ${
                                                    personaje.status === "Alive"
                                                        ? "#00ff55"
                                                        : personaje.status === "Dead"
                                                        ? "#ff3333"
                                                        : "gray"
                                                };
                                            ">
                                        </span>

                                        ${personaje.status}
                                    </td>
                                </tr>

                                <tr>
                                    <td class="text-secondary">Especie</td>
                                    <td>${personaje.species}</td>
                                </tr>

                                <tr>
                                    <td class="text-secondary">Género</td>
                                    <td>${personaje.gender}</td>
                                </tr>

                                <tr>
                                    <td class="text-secondary">Tipo</td>
                                    <td>${personaje.type || "Sin tipo"}</td>
                                </tr>

                                <tr>
                                    <td class="text-secondary">Origen</td>
                                    <td>${personaje.origin.name}</td>
                                </tr>

                                <tr>
                                    <td class="text-secondary">Última ubicación</td>
                                    <td>${personaje.location.name}</td>
                                </tr>

                                <tr>
                                    <td class="text-secondary">Episodios</td>
                                    <td>${personaje.episode.length}</td>
                                </tr>

                                <tr>
                                    <td class="text-secondary">Creado</td>
                                    <td>${fechaFormateada}</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            <div class="card-footer text-end">

                <a href="index.html"
                class="btn btn-secondary">
                Cerrar
                </a>

            </div>

        </div>

        `;
    }
}

cargarDetalle();