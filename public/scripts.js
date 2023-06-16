function onOff() {
    document
        .querySelector ("#modal")
        .classList
        .toggle("hide")

        document
            .querySelector("body")
            .classList
            .toggle("hideScroll")

        document
            .querySelector("#modal")
            .classList
            .toggle("AddScroll")
}

function checkFields(event) {
    
    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link",
    ]

    // console.log(ypeof event.target["title"].value)
    // console.log(ypeof event.target["title"].value === "string"))

    const isEmpty = valuesToCheck.find(function(value) {    
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim() 

        if(checkIfIsString  && checkIfIsEmpty  ) {
        return true
        }
    })


    if (isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }
 }