
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * Obtener listado de humanos que aparecen en el episodio 25
 *  
 */
async function ejercicio5 () {
    const url = 'https://rickandmortyapi.com/api/character/?species=human';
    const method ='GET';
    var result = [];
    await connect(method, url)
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            result = res.results;
        })
        .catch( error => console.log(error))
    result.forEach(e=>{
        e.episode.forEach(a=>{
            if (a.includes('/25')) {
                console.log(e);
            }
        });
    });
}


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

ejercicio5()