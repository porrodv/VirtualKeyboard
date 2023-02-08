const keys = [
    [
        ["|", "°"],
        ["1", "!"],
        ["2", '"'],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¿", "¡"],
        ["←", "←"],
    ],
    [
        ["↹", "↹"],
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["´", "¨"],
        ["+", "*"],
        ["ENTER2", "ENTER2"],
    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["{", "["],
        ["}", "]"],
        ["ENTER", "ENTER"],
    ],
    [
        ["⇧", "⇧"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"],
        ["SHIFT", "SHIFT"],
    ],
    [
        ["CTRL", "CTRL"],
        ["WIN", "WIN"],
        ["ALT", "ALT"],
        ["SPACE", "SPACE"],
        ["ALT GR", "ALT GR"],
        ["WIN", "WIN"],
        ["MENU", "MENU"],
        ["CTRL", "CTRL"],
    ]
];
// prender lus para mayus
let mayus = false;
let shift = false;
let current = null;

renderKeyboard();

function renderKeyboard(){
    const keyboardContainer = document.querySelector("#keyboard-container");
    let empty = `<div class="key-empty"></div>`;

    let layers = keys.map((layer) =>{
        return layer.map(key =>{

            if (key[0] == "←"){
                return `<button class="key key-backspace">${key[0]}</button>`
            }

            if (key[0] == "↹"){
                return `<button class="key key-tab">${key[0]}</button>`
            }

            if (key[0] == "ENTER"){
                return `<button class="key key-enter">${key[0]}</button>`
            }
            if (key[0] == "ENTER2"){
                return `<button class="key key-enterTop">${key[0]}</button>`
            }

            if (key[0] == "CTRL"){
                return `<button class="key key-control">${key[0]}</button>`
            }

            if (key[0] == "SHIFT"){
                return `<button class="key key-shift">${key[0]}</button>`
            }
            if (key[0] == "⇧"){
                return `<button class="key key-shift2">${key[0]}</button>`
            }

            if (key[0] == "MAYUS"){
                return `<button class="key key-mayus">${key[0]}</button>`
            }

            if (key[0] == "ALT"){
                return `<button class="key key-alt">${key[0]}</button>`
            }

            if (key[0] == "ALT GR"){
                return `<button class="key key-altgr">${key[0]}</button>`
            }

            if (key[0] == "WIN"){
                return `<button class="key key-windows">${key[0]}</button>`
            }

            if (key[0] == "MENU"){
                return `<button class="key key-menu">${key[0]}</button>`
            }

            if (key[0] == "SPACE"){
                return `<button class="key key-space"></button>`
            }

            // Si shift está activado devuelvo el segundo valor (mayus y shift), si no evaluo otra condición..
            // Si mayus está activado y la primera posición de las teclas está en el rango ASCII permitido devuelvo el segundo valor (que solo son mayúsculas), sino sigo devuelvo el segundo valor.
            return `
                <button class="key key-normal">
                ${
                    shift 
                    ? key[1] 
                    : mayus && 
                        key[0].toLowerCase().charCodeAt(0) >= 97 &&  // ASCII: a   
                        key[0].toLowerCase().charCodeAt(0) <= 122    // ASCII: z
                    ? key[1] 
                    : key[0]
                }
                </button>
            `;
        });
    });
    
    /*
    layers[2].push(empty); // push: agrega elemento al final
    */

    const HTMLLayers = layers.map(layer =>{
        return layer.join("");
    });
    
    keyboardContainer.innerHTML = "";

    HTMLLayers.forEach(layer =>{
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;
    });

    document.querySelectorAll(".key").forEach(key =>{
        key.addEventListener("click", e=>{
            if (current){
                if (key.textContent == "SHIFT" || key.textContent == "⇧"){
                    shift = !shift; // OPUESTO: false a true
                } else if (key.textContent == "MAYUS") {
                    mayus = !mayus;
                } else if (key.textContent == ""){
                    current.value += " ";
                } else if (key.textContent == "←") {
                    current.value = current.value.substring(0, current.value.length - 1);
                } else if (key.textContent == "ENTER"){
                    current.value = "";
                } else {
                    current.value += key.textContent.trim();
                    if (shift){
                        shift = false;
                    }   
                }
                renderKeyboard();
                current.focus();
            }
        });
    });
}

document.querySelectorAll("input").forEach(input =>{
    input.addEventListener("focusin", e=>{
        current = e.target;
    });
});
