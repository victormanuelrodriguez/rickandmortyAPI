
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
/**
 * Obtener listado de humanos que aparecen en el episodio 25
 *  
 */
async function ejercicio5 () {
    const url = 'https://rickandmortyapi.com/api/character/?species=human';
    const method ='GET';
    var sum = 0;
    var result = [];
    var character = [];
    await connect(method, url)
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            result = res;
        })
        .catch( error => console.log(error));
    sum = result.results.length;
        result.results.forEach(e=>{
            character.push(e);
        })
    for(i=0; i <= result.info.pages ;i++){
        if(i > 1){
            var url_ = `https://rickandmortyapi.com/api/character/?page=${i}&species=human`;
            await connect(method, url_).then(
                respuesta => {
                    var res = JSON.parse(respuesta);
                    res.results.forEach(e => {
                        character.push(e);
                    })
                    sum = sum + res.results.length;
                }
            )
        }
    }
    // console.log("suma final:", sum)
    // console.log("tamaño personajes:",character.length);
    characterCap = [];
    character.forEach((e) => {
        e.episode.forEach(a => {
            if (a.includes('/25')) {
                // console.log(e.name);
                characterCap.push(e);
            }
        });
    });
    /* var stream = fs.createWriteStream("file.txt");
    stream.once('open', function (fd) {
        stream.write(JSON.stringify(character));
        stream.end();
    }); */
    console.log(characterCap);
    console.log("Personajes:", characterCap.length);
}
/**
 * Con el listado obtenido de personas del episodio 5, muestra los humanos
 */
async function ejercicio6() {
    const url = 'https://rickandmortyapi.com/api/character/?species=human';
    const method = 'GET';
    var sum = 0;
    var result = [];
    var character = [];
    await connect(method, url)
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            result = res;
        })
        .catch(error => console.log(error));
    sum = result.results.length;
    result.results.forEach(e => {
        character.push(e);
    })
    for (i = 0; i <= result.info.pages; i++) {
        if (i > 1) {
            var url_ = `https://rickandmortyapi.com/api/character/?page=${i}&species=human`;
            await connect(method, url_).then(
                respuesta => {
                    var res = JSON.parse(respuesta);
                    res.results.forEach(e => {
                        character.push(e);
                    })
                    sum = sum + res.results.length;
                }
            )
        }
    }
    // console.log("suma final:", sum)
    // console.log("tamaño personajes:",character.length);
    characterCap = [];
    character.forEach((e) => {
        e.episode.forEach(a => {
            if (a.includes('/5')) {
                // console.log(e.name);
                characterCap.push(e);
            }
        });
    });
    /* var stream = fs.createWriteStream("file.txt");
    stream.once('open', function (fd) {
        stream.write(JSON.stringify(character));
        stream.end();
    }); */
    console.log(characterCap);
    console.log("Personajes:", characterCap.length);
}
/**
 * Muestra un listado de lugares de origen de los personajes  que aparecen en el episodio 20.
 * Envía una petición a la API para recoger a todos los personajes.
 * Espera a una promesa y Obtiene los lugares
 */
async function ejercicio7() {
    const url = 'https://rickandmortyapi.com/api/episode/20';
    const method = 'GET';
    var result = [];
    await connect(method, url)
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            result = res.characters;
        })
        .catch(error => console.log(error));
    var character = [];
    for (let index = 0; index < result.length; index++) {
        // console.log(result[index]);
        await connect(method, result[index]).then(
            res => {
                var respuesta = JSON.parse(res);
                character.push(respuesta);

            }
        ).catch(error => console.log(error))
    }
    var origen = [];
    character.forEach((e) => {
        origen.push(e.origin);
    });
    console.log("La lista de los lugares origen de los personajes es: ",origen);
}
/**
 * Del listado de sitios obtenidos del episodio 20, 
 * muestra los siguientes datos: Lugares de origen de cada personaje y 
 * listado de episodios en los que aparecen las distintos sitios que aparecen en este episodio.
 */
async function ejercicio8() {
    const url = 'https://rickandmortyapi.com/api/episode/20';
    const method = 'GET';
    var result = [];
    await connect(method, url)
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            result = res.characters;
        })
        .catch(error => console.log(error));
    var character = [];
    for (let index = 0; index < result.length; index++) {
        await connect(method, result[index]).then(
            res => {
                var respuesta = JSON.parse(res);
                character.push(respuesta);

            }
        ).catch(error => console.log(error))
    }
    var location = [];
    character.forEach((e, i = 0) => {
        location.push(e.location);
    });
    console.log(location);
}
/**
 * 
 * @param {Recibe el método para la petición: Get,Post,etc} method 
 * @param {Recibe una url para la petición} url 
 * Declaro var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 * Y la llamo con xhr versión XMLHttpRequest
 */
async function connect(method,url){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

ejercicio7()