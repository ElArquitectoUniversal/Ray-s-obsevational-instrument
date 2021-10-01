let input_session_object = {
    "3.403": [[0,0,0,0,0,0],[1,0,0,0],[1,1,0]],
    "14.185": [[0,1,0,0,0,0],[1,0,0,0],[1,1,0]],
    "14.934": [[0,1,0,0,0,0],[1,0,0,0],[1,1,0]],
    "16.186": [[0,1,0,0,0,0],[1,0,0,0],[1,1,0]],
    "16.938": [[0,1,0,0,0,0],[1,0,0,0],[1,1,0]],
    "31.268": [[0,0,0,0,0,1],[1,0,0,0],[1,1,0]],
    "35.267": [[0,0,0,0,0,1],[1,0,0,0],[1,1,0]],
    "35.268": [[0,0,0,0,0,1],[1,0,0,0],[1,1,0]],
    "42.267": [[0,0,0,0,0,1],[1,0,0,0],[1,1,0]],
    "42.268": [[0,0,0,0,0,1],[1,0,0,0],[1,1,0]],
    "47.568": [[0,0,0,0,0,1],[1,0,0,0],[1,1,0]],
    "54.102": [[0,0,0,1,0,0],[1,0,0,0],[1,1,0]],
    "57.602": [[0,0,0,1,0,0],[1,0,0,0],[1,1,0]],
    "66.901": [[0,0,0,1,0,0],[1,0,0,0],[1,1,0]],
    "66.902": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]],
    "76.938": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]],
    "79.939": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]],
    "84.937": [[0,0,0,1,0,0],[1,0,0,0],[1,1,0]],
    "94.940": [[0,0,0,1,0,0],[1,0,0,0],[1,1,0]],
    "98.440": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]],
    "99.537": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]],
    "102.444": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]],
    "102.784": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]],
    "113.572": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]],
    "117.325": [[0,0,0,0,1,0],[1,0,0,0],[1,1,0]]
}

function get_string_case(i,j,k) {
    let string_abilities;
    let string_object_property;
    let string_object;

    let abilities_possible_cases = {0: "Conteo",1: "Identificacion Cardinal",2: "Identificacion Ordinal",3: "Variacion Cardinal",4: "Correspondecia Digito Objeto Palabra",5: "Otras"};
    let object_property_possible_cases = {0: "Instruir",1: "Instigar",2: "Señalar",3: "Discriminar"};
    let object_possible_cases = {0: "Ficha",1: "Cubo",2: "Enseñante"}
    
    if (i in abilities_possible_cases && j in object_property_possible_cases && k in object_possible_cases) {
        string_abilities = abilities_possible_cases[i];
        string_object_property = object_property_possible_cases[j];
        string_object = object_possible_cases[k];
    }
    
    return [string_abilities, string_object_property, string_object];    
}

function get_int_case(key_case) {
    let int_case;
    let possible_cases = {"111": 1 + " -FUNCION EMERGIDA-","110": 2,"101": 3,"000": 4,"001": 5,"010": 6,"100": 7,"011": 8 + " -EMERGENCIA DE FUNCIÓN-"};
    if (key_case in possible_cases) {
        int_case = possible_cases[key_case];
    }
    return int_case;
}

function analyze(input_session_object){
    let output_session_object = {};
    let object_keys = Object.keys(input_session_object);
    for (let x = 0; x < object_keys.length; x++) {
        const timestamp = object_keys[x];
        let timestamp_array = input_session_object[timestamp];
        let timestamp_array_abilities = timestamp_array[0];
        let timestamp_array_object_property = timestamp_array[1];
        let timestamp_array_object = timestamp_array[2];  
        //OBJETO CON INDICE OBTENIDO EN GET_STRING_CASE()
        let output_object_son = {};
        for (let i = 0, l = timestamp_array_abilities.length; i < l; i++){
            for (let j = 0, k = 0, m = timestamp_array_object_property.length, n = timestamp_array_object.length; j < m; j++){
                let string_array = get_string_case(i,j,k);
                let string_abilities = string_array[0];
                let string_object_property = string_array[1];
                let string_object = string_array[2];
                //OBTENCIÓN DEL INT CASE
                let key_case = `${timestamp_array_abilities[i]}${timestamp_array_object_property[j]}${timestamp_array_object[k]}`;
                let int_case = get_int_case(key_case);
                //DECLARACIÓN DEL INDICE DEL OBJETO (STRING) EL PARAMETRO ES UN OBJETO
                let output_object_son_index = `${string_abilities} // ${string_object_property} // ${string_object}`;
                output_object_son[output_object_son_index] = int_case;
                if (j == m - 1 && k < n - 1){
                    k++;
                    j = -1;
                }
            }
        }
        output_session_object[timestamp] = output_object_son;
    }
    return output_session_object; 
}
console.log(analyze(input_session_object));
