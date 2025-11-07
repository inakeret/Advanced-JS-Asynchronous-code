//RESUELVE TUS EJERCICIOS AQUI


/**************DogAPI**************/
/*Declara una funcion getAllBreeds que devuelva un array de strings con todas las razas de perro.*/
const urlBase = "https://dog.ceo/api/breed"
const raza = "komodor"
/**
 * Llamar a la api y conseguir datos
 * @param {string} url 
 * @returns {Promise}
 */
const llamarApi = async(url) =>{
    try {
        const resp = await fetch(url)
        if(resp.ok){
            const data = await resp.json()
            return data
        }else{
            throw "Error" + resp.status        
        }
    } catch (error) {
        throw error
    }
}

/**
 * funcion para devolver lista de razas de perro
 * @returns {Promise}
 */
const getAllBreeds = async() =>{
    try {
        const data = await llamarApi(`${urlBase}s/list/all`)

        if(data.status == "success"){
            return Object.keys(data.message)
        }else{
            throw "Error" + data.status
        }
    
    } catch (error) {
        console.log(error)
    }
}

/*Declara una función getRandomDog que obtenga una imagen random de una raza.*/

/**
 * Obtener el url de una foto random de la api dogApi
 * @returns {Promise}
 */
const getRandomDog = async() =>{
    try {
        const data = await llamarApi(`${urlBase}s/image/random`)

        if(data.status == "success"){
            return data.message
        }else{
            throw "Error" + data.status
        }
    
    } catch (error) {
        console.log(error)
    }
}


/* Declara una función getAllImagesByBreed que obtenga todas las imágenes de la raza komondor.*/
/**
 * Devuelve todas las fotos de la raza pasada como argumento
 * @param {string} raza 
 * @returns {Promise}
 */
const getAllImagesByBreed = async(raza) =>{
    try {
        const data = await llamarApi(`${urlBase}/${raza}/images`)

        if(data.status == "success"){
            //console.log(data)
            return data.message
        }else{
            throw "Error" + data.status
        }
    
    } catch (error) {
        console.log(error)
    }
}

/* Declara una funcion getAllImagesByBreed2(breed) que devuelva las imágenes de la raza pasada por el argumento*/
/**
 * Devuelve las imagenes dela raza pasada como argumento
 * @param {string} raza 
 * @returns {Promise}
 */
const getAllImagesByBreed2= async(raza)=>{
    return await getAllImagesByBreed(raza)
}

/**************GitHubAPI**************/



/*Declarara una función getGitHubUserProfile(username) que obtenga el perfil de usuario de github a partir de su nombre de usuario. (https://api.github.com/users/{username}).*/

/**
 * Devuelve el objeto usuario si lo encuentra en la api
 * @param {string} user 
 * @returns {Promise}
 */
const getGitHubUserProfile = async(user) => {
    try {
        const data = await llamarApi(`https://api.github.com/users/${user}`)
        return data
    
    } catch (error) {
        console.log(error)
    }
}

/*Declara una función printGithubUserProfile(username) que reciba como argumento el nombre de un usuario (username), retorne {img, name} y pinte la foto y el nombre en el DOM.*/

/**
 * Devuelve un objeto con la img de perfil y el nombre de usuario
 * @param {string} username 
 * @returns {Promise}
 */
const printGithubUserProfile = async(username) =>{
    try {
        const data = await getGitHubUserProfile(username)
        
        if(typeof(data) == "object"){
            let img = data['avatar_url']
            // console.log(img)
            let name = data['name']
            // console.log(name)
            return({img, name})
        }else{
            throw "No hay nombre ni imagen"+ data
        }
    
    } catch (error) {
        console.log(error)
    }
}

/**
 * Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API para obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, la estructura debe ser exactamente la misma:
 */


/**
 * Devuelve un string del html
 * @param {string} username 
 * @returns {Promise}
 */
const getAndPrintGitHubUserProfile = async(username) =>{
    try {
        const data = await getGitHubUserProfile(username)
        
        if(typeof(data) == "object"){
            return await pintarTarjeta(data)
        }else{
            throw "No hay nombre ni imagen"+ data
        }
    
    } catch (error) {
        console.log(error)
    }    
}
/**
 * Crea un string de la estructura html y lo devuelve 
 * @param {Object} data 
 * @returns {string}
 */
const pintarTarjeta = async (data) =>{
    const fragment = 
    `<section>
        <img src="${data.avatar_url}" alt="${data.name}">
        <h1>${data.name}</h1>
        <p>Public repos: ${data.public_repos}</p>
    </section>`
    // document.createDocumentFragment()

    // const section1 = document.createElement("SECTION")
    // const img1 = document.createElement("IMG")
    // img1.src = data.avatar_url
    // img1.alt = "Foto usuario"
    // const tit = document.createElement("H1")
    // tit.textContent = data.name
    // const parrafo = document.createElement("P")
    // parrafo.textContent = `Public repos: ${data.public_repos}`
    // section1.append(img1,tit,parrafo)
    // fragment.append(section1)
    // console.log (fragment)
    return fragment
}




/*Dada una lista de usuarios de github guardada en una array,crea una funcion fetchGithubUsers(userNames) que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.
Objetivo: Usar Promise.all()
Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
Pregunta. ¿cuántas promesas tendremos?
Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

Pasos:

Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
Cuando Promise.all() haya terminado: Consigue que se imprima por consola la url del repositorio de cada usuario. Consigue que se imprima por consola el nombre de cada usuario.*/

/**
 * @async
 * Devuelve una lista de los nombres de los usuarios si los encuentra en la api
 * @param {*} userNames 
 * @returns {Promise<string>}
 */
const fetchGithubUsers = async(userNames) =>{
    try {
        const reponses = await userNames.map(e=>getGitHubUserProfile(e))
        const promesas = await Promise.all(responses)
        return promesas.map(e=> e.name)
    } catch (error) {
        console.log(error)
    }
}   