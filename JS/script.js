
/*Validar el formulario de iniciar sesion.
Modificar estetica del input en caso de un mal ingreso
Crear entidades del localStorage
*/
function sendForm(){
    localStorage.setItem("record","[]");
    localStorage.setItem("games",0);
    const name = document.getElementById("name").value;
    if(name != ""){
        window.location.href = "../HTML/main.html";
        document.getElementById("name").innerHTML = "";
        localStorage.setItem("user",name);
        document.getElementById("nameInput").classList.remove("input-fail");
    return true}else{
            document.getElementById("warning").innerHTML = "Ingrese un usuario válido";
            document.getElementById("name").innerHTML = "";
            document.getElementById("nameInput").classList.add("input-fail");
            return false;
        }
    }

/*Cambiar el username de la vista al dado por el usuario*/

function changeTitle(){
    document.getElementById("user-name").innerHTML = localStorage.getItem("user");
}


/*Iniciar la pantalla de juego*/
function startGame(){
    window.location.href = "../HTML/game.html";
    return true
    }


//Regresar a la pantalla indice (cerrar sesion)
function backIndex(){
    window.location.href = "../HTML/index.html";
    return true
    }

/*Cambiar el nombre de usuario visto en la pantalla del juego. 
Agregar nuevos atributos al local storage para las funcionalidades del juego*/
function changeUser(){
    document.getElementById("user-name-game").innerHTML = localStorage.getItem("user");
    localStorage.setItem("SL","");
    localStorage.setItem("strikes",0);
    localStorage.setItem("point",0);
    localStorage.setItem("target",0);
    localStorage.setItem("attend",0);
    addLetterDivGame();
    }

/*Tomar la letra introducida por el usuario y validar:
-Se trata de una letra
-La letra no fue seleccionada antes
*/
function sendLetter(){
    document.getElementById("warning-letter-announce").innerHTML = "";
    let letter = document.getElementById("selectLetter").value;
    if(letter != "" && (String(letter)).length == 1 ) {
        addAttend()
        addLetterToList(letter);
        document.getElementById("sl").innerHTML = localStorage.getItem("SL");
        
    }else{
        validateLetterInput();
        }
    document.getElementById("selectLetter").value = "";
    }

/*Agregar un intento
*/
function addAttend(){
    let a = parseInt(localStorage.getItem("attend"));
    a++;
    localStorage.setItem("attend",a);
    document.getElementById("attend-nmr").innerText = localStorage.getItem("attend")
}

function validateLetterInput(){
    document.getElementById("warning-letter-announce").innerHTML = "Ingrese una letra valida";
    document.getElementById("selectLetterInput").classList.add("input-fail");

}

/*Agregar una letra nueva a la lista de letras ya dichas por el usuario
*/
function addLetterToList(lett){
    let letter = lett.toLowerCase();
    console.log(letter);
    let abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];

    let repetitiveLetter = false;
    let aLetter = false;

    const larray = localStorage.getItem("SL").split(", ");

    larray.forEach(i => {
        if(i == letter ){
            repetitiveLetter = true;
        }
    });

    abc.forEach(i => {
        if(i == letter ){
            aLetter = true;
        }
    });

    if( !repetitiveLetter && aLetter){
        let letters = localStorage.getItem("SL");
        l = letters + letter + ", ";
        localStorage.setItem("SL",l);
        validateLetterWord(letter);
        document.getElementById("selectLetterInput").classList.remove("input-fail");
    }else{
        document.getElementById("warning-letter-announce").innerHTML = "Ingrese una letra valida"
        document.getElementById("selectLetterInput").classList.add("input-fail");
    }
}

/*dividir la palabra del juego en espacios y posicionarlo en el juego dinamicamente segun el numero de letras
*/

function addLetterDivGame(){
    chooseWord();
    const word = addDivisionWord();
    const warray = word.split("-");
    document.getElementById("letter-1").innerHTML = warray[0];
    for (let i = 1; i < warray.length; i++) {

        const section = document.getElementById("container-letter-word-div");
        let section2 = section.cloneNode(true);
        section2.innerHTML = '<p1 class = "letter-a" id="letter-'+(i+1)+'">' +warray[i]+ '</p1>' ;

        const section3 = document.getElementById("hline-main hline-word");
        const section4 = section3.cloneNode(true);

        document.getElementById("container-letter-word").appendChild(section2);
        document.getElementById("container-letter-word-space").appendChild(section4);
    }
}

//Validar si la letra introducida por el usuario pertenece a la palabra del juego. La letra cambia de color en caso de ser descubierta

function validateLetterWord(letter){

    const word = addDivisionWord();
    const a = word.split("-");
    let aux = 0;
    

    for (let i = 0; i < a.length; i++) {
        if(a[i] == letter){
            console.log("letter-"+(i+1));
            document.getElementById("letter-"+(i+1)).classList.add("letter-b");
            document.getElementById("letter-"+(i+1)).classList.remove("letter-a");
            aux++;
            let point = parseInt(localStorage.getItem("point")) + 10;
            localStorage.setItem("point", point)
            document.getElementById("score-game-points").innerText = point;

            let target = parseInt(localStorage.getItem("target")) + 1;
            localStorage.setItem("target", target);
            if(target == a.length){
                localStorage.setItem("title", "HAS GANADO");
                localStorage.setItem("msj", "😇😇😇");
                window.location.href = "../HTML/end.html";
                localStorage.setItem("state", "GANADOR")
                let record = [localStorage.getItem("user"), localStorage.getItem("point"),  localStorage.getItem("state")];
                localStorage.setItem("games",parseInt(localStorage.getItem("games"))+1);
                saveRecord();
            }
        }
        
    }

    if(aux == 0){
        drawMan();
        if(parseInt(localStorage.getItem("point")) > 0){
            let point = parseInt(localStorage.getItem("point")) - 5;
            localStorage.setItem("point", point)
            document.getElementById("score-game-points").innerText = point;
        }
    }
}

//Dibujar el ahorcado cada intento fallido por el usuario

function drawMan(){
    let strikes = localStorage.getItem("strikes");
    if(strikes == 0 ){
        changeColorMan("head", "head-game", "head-game-lost")
    }else if(strikes == 1){
        changeColorMan("body", "body-game", "body-game-lost")
    }else if(strikes == 2){
        changeColorMan("left-arm", "left-arm", "left-arm-lost")
    }else if(strikes == 3){
        changeColorMan("right-arm", "right-arm", "right-arm-lost")
    }else if(strikes == 4){
        changeColorMan("left-leg", "left-leg", "left-leg-lost")
    }else if(strikes == 5){
        changeColorMan("right-leg", "right-leg", "right-leg-lost")
        window.location.href = "../HTML/end.html";
        localStorage.setItem("title", "HAS PERDIDO");
        localStorage.setItem("msj", "😈😈😈");
        localStorage.setItem("state", "PERDEDOR");
        let record = [localStorage.getItem("user"), localStorage.getItem("point"),  localStorage.getItem("state")];
        localStorage.setItem("games",parseInt(localStorage.getItem("games"))+1);
        saveRecord();

    }
    strikes++;
    localStorage.setItem("strikes",strikes);
}

//Modificar la clase CSS del ahorcado para que se vaya dibujando
function changeColorMan(bpart, cl1, cl2){
    document.getElementById(bpart).classList.add(cl2);
    document.getElementById(bpart).classList.remove(cl1);
}


//Funcion para escoger una palabra al azar 
function chooseWord(){
    const Wordlist = ["manzana", "naranja", "banana", "uva", "pera", "limon", "piña", "fresa", "frambuesa", "arandano", "kiwi", "mango", "melocoton", "cereza", "sandia"];
     // Obtener un índice aleatorio dentro del rango de la longitud de la lista
    var randomIndex  = Math.floor(Math.random() * Wordlist.length);
    // Almacenar un valor
    localStorage.setItem('word', Wordlist[randomIndex]);
}


//Funcion para convertir una palabra en guiones
function addDivisionWord() {

    let word = localStorage.getItem('word');
    word = word.toLowerCase();
    let scripts = [];
    for (let i = 0; i < word.length; i++) {
        
        if(i>0){
            scripts.push("-");
        }
        scripts.push(word[i]);
    }
    return scripts.join("");

}

//Funcion salir al menu principal
function exit(){
    window.location.href = "../HTML/main.html";
    return true
}


//Datos modificados en la vista pos juego para conocer el resultado
function endPage(){
    document.getElementById("title").innerHTML = localStorage.getItem("title");
    document.getElementById("user-name").innerHTML = localStorage.getItem("user");
    document.getElementById("msj").innerHTML = localStorage.getItem("msj");
    document.getElementById("pt").innerHTML = "Puntaje: "+ localStorage.getItem("point");
}

//guardar los datos de la partida jugada en un diario de puntajes
function saveRecord(){
    let p = {
        partida: "Partida "+ localStorage.getItem('games'),
        nombre:  localStorage.getItem('user'),
        puntos: localStorage.getItem('point'),
        resultado: localStorage.getItem('state')
    }

    
    const jsonString = JSON.stringify(p);
    const ls = localStorage.getItem("record");
    lss = ls.substring(0,ls.length-1);
    if(parseInt(localStorage.getItem("games")) == 1){
        const load = lss + jsonString + "]";
        localStorage.setItem("record",load);
    }else{
        const load =  lss + "," + jsonString + "]";
        localStorage.setItem("record",load);
    }
    
    
    
}


//abrir la pantalla de resultados
function seeBoard(){
    window.location.href = "../HTML/board.html";
    return true
}

//Rellenar la tabla de resultados con la informacion del diario de resultados

function actTable(){
    const data = JSON.parse(localStorage.getItem("record"));
    let aux = 4;
    let a = 0;

    data.forEach(i => {
        console.log(i)
        const section = document.getElementById("header-table");
        console.log(section)
        let section2 = section.cloneNode(true);
        section2.innerHTML = '<th class = id="c'+(aux++)+'">' +data[a]["partida"]+ '</th>' + '<th class = id="c'+(aux++)+'">' +data[a]["puntos"]+ '</th>'+'<th class = id="c'+(aux++)+'">' +data[a++]["resultado"]+ '</th>';
        
        document.getElementById("table").appendChild(section2);
    });



}
