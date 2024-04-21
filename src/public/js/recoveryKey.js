function submitForm() {
    // Recopila los datos del formulario en un objeto
    const formData = {
        email: document.getElementById('usuario').value.toUpperCase(),
    }

    // Realiza una solicitud POST utilizando fetch y envía los datos en formato JSON
    fetch('/api/auth/recoveryKey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.status === 'Success') { 
            window.location.href = '/login' // Redirecciona solo si fue exitoso el reset
        } else {
            console.log("Error al restaurar la clave")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email incorrecto",
              })
        }
    })
    .catch(error => console.error('Error:', error))
}

//capturo el span de registrate para cuando hago un click redireccionarlo
const registrate = document.getElementById('Registrate')
//agrego funcion de escucha para cuando hagan click, redireccionar:
registrate.addEventListener('click', () => {
    window.location.href = '/signup'
})

