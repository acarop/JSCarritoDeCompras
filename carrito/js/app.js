// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners
cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    // Dispara cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Dispara al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documemnto, mostrar LS
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Funciones

// Añadir el curso al carrito
function comprarCurso(e){
    e.preventDefault();

    // Delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        // obtener el curso (la card completa) 
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    };

}

// Leer los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    
    
    insertarCarrito(infoCurso);
}

// Mostrar el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${curso.imagen}"  width=100>
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();

    let curso, cursoID;

    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLocalStorage(cursoID);
}

// Elimina todos los cursos del carrito en el DOM
function vaciarCarrito(){
    // forma lenta y corta
    //listaCursos.innerHTML = "";

    // Forma rapida y recomendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    

    // Vaciar carrito LS
    vaciarLocalStorage();

    return false;
}

// Almacena cursos del carrigo en local storage 
function guardarCursoLocalStorage(curso){
    let cursos;

    // Toma el valor de un arreglo con datos de LS o vacío
    cursos = obtenerCursosLocalStorage();

    // El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

// Comprueba que haya elementos en LS
function obtenerCursosLocalStorage(curso){
    let cursosLS;

    // Comprobamos si hay algo en LS
    if(localStorage.getItem('cursos') == null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

// Imprime los cursos de LS en el carrito
function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        // construir el template
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${curso.imagen}"  width=100>
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        
        `;
        listaCursos.appendChild(row);
    });
}

// Elimina el curso por el ID en LS
function eliminarCursoLocalStorage(curso){
    let cursosLS;

    // obtemenos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();

    // Comparamos los id para eliminar
    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id == curso){
            cursosLS.splice(index, 1);
        }
    });

    // añadimos el arreglo actual a LS
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Elimina todos los cursos del carrito de LS
function vaciarLocalStorage(){
    localStorage.clear(); 
}