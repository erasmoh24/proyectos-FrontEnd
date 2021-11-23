import colorDePrioridad from "./colorPrioridades.js"
import elementosDelDom from "./elementosDom.js"
const oscuro = document.querySelector('.oscuro')
let actualizar = false
let contador = 0;

elementosDelDom.botonEliminar.addEventListener("click",() => {
    actualizar = false
    for(let i = 0; i < elementosDelDom.contenedorDeTareas.children.length; i++) {
        elementosDelDom.contenedorDeTareas.children[i].children[0].children[0].style.display = "block"
    }

})

elementosDelDom.botonEnvio.addEventListener('click',() => {
    const form = new FormData(elementosDelDom.formulario)  

    contador += 1;
    let task = {
        tipoTarea: form.get('tipoTarea'), 
        tipoPrioridad: form.get('tipoPrioridad'),
        descripcionTask: elementosDelDom.descripcionTarea.value
    }

    let contenedorTareas = `
        <div class="tareas">
            <div class="tituloPrioridad">
                    <div class="contenedorCheckbox">
                        <input type="checkbox" id="checkboxTask name="${contador}">
                    </div>
                
                <h3>${task.tipoTarea}</h3>
                <h5 style=color:${colorDePrioridad(task)};>${task.tipoPrioridad}</h5>
            </div>
            <p>${task.descripcionTask}</p>
        </div>
    `
    document.forms[0].reset()
    elementosDelDom.contenedorDeTareas.innerHTML += contenedorTareas
})

elementosDelDom.logoLuna.addEventListener('click',() => {
    elementosDelDom.header.classList.toggle('headerOscuro')
    elementosDelDom.main.classList.toggle('mainOscuro')
    elementosDelDom.footer.classList.toggle('footerOscuro')
    elementosDelDom.logoLuna.style.visibility = "hidden"
    elementosDelDom.logoSol.style.visibility = "visible"
})

elementosDelDom.logoSol.addEventListener('click',() => {
    elementosDelDom.logoSol.style.visibility = "hidden"
    elementosDelDom.logoLuna.style.visibility = "visible"
    elementosDelDom.main.classList.toggle('mainOscuro')
    elementosDelDom.header.classList.toggle('headerOscuro')
    elementosDelDom.footer.classList.toggle('footerOscuro')
})

elementosDelDom.contenedorDeTareas.addEventListener('change',(e) => {
    for(let i = 0; i < elementosDelDom.contenedorDeTareas.children.length; i++) {
        if(elementosDelDom.contenedorDeTareas.children[i].children[0].children[0].children[0] == e.target && actualizar) {
            elementosDelDom.actualizacionTarea.style.opacity = '1'
            elementosDelDom.actualizacionTarea.style.visibility = "visible"
            break;
        }
        else if(elementosDelDom.contenedorDeTareas.children[i].children[0].children[0].children[0]== e.target && !actualizar)  {
            elementosDelDom.contenedorDeTareas.children[i].style.display = 'none'
            break;
        }
    }

    console.log(elementosDelDom.contenedorDeTareas.children[0].children[0].children[0].children[0])
})

elementosDelDom.botonActualizar.addEventListener('click',() => {
    actualizar = true
    for(let i = 0; i < elementosDelDom.contenedorDeTareas.children.length; i++) {
        elementosDelDom.contenedorDeTareas.children[i].children[0].children[0].style.display = "block"
    }
})

elementosDelDom.formActualizarTarea.addEventListener('submit',(e) => {
    e.preventDefault()
    const datosFormulario = new FormData(elementosDelDom.formActualizarTarea)

    const tareaActualizada = {
        tipoTarea: datosFormulario.get('tipoTarea'),
        tipoPrioridad: datosFormulario.get('tipoPrioridad'),
        descripcionTask: datosFormulario.get('taskDescription')
    }

    elementosDelDom.formActualizarTarea.reset()

    for(let i = 0; i < elementosDelDom.contenedorDeTareas.children.length; i++) {
        if(elementosDelDom.contenedorDeTareas.children[i].children[0].children[0].children[0].checked) {
            elementosDelDom.contenedorDeTareas.children[i].outerHTML = `
                <div class="tareas">
                    <div class="tituloPrioridad">
                        <div class="contenedorCheckbox">
                            <input type="checkbox" id="checkboxTask name="${contador}">
                        </div>
                        <h3>${tareaActualizada.tipoTarea}</h3>
                        <h5 style=color:${colorDePrioridad(tareaActualizada)};>${tareaActualizada.tipoPrioridad}</h5>
                    </div>
                    <p>${tareaActualizada.descripcionTask}</p>
                </div>
            `
            break;
        }
    }
})

elementosDelDom.cerrarFormularioActualizacion.addEventListener('click',() => {
    elementosDelDom.actualizacionTarea.style.opacity = '0'
    elementosDelDom.actualizacionTarea.style.visibility = 'hidden'
})
