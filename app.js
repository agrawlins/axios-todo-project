//Create

const todoForm = document.todoform

todoForm.addEventListener("submit", function(e){
    e.preventDefault()
    const newTodo = {
        title: todoForm.title.value,
        price: todoForm.price.value,
        description: todoForm.description.value,
        imgUrl: todoForm.imgUrl.value,
        completed: false
    }
    axios.post("https://api.vschool.io/adamrawlins/todo", newTodo)
        .then(response => {
            console.log(response.data)
            clearAll()
            getAll()
        })
        .catch(error => console.log(error))

})

//Read ONE

// const oneToDo = (id) => {
//     axios.get(`https://api.vschool.io/adamrawlins/todo/${id}`)
//         .then(response => {
//             const toDoItem = document.createElement("li")
//             const h2 = document.createElement('h2')
//             const headerValue = response.data[i].title
//             h2.textContent = headerValue;
//             const p = document.createElement('p')
//             const pValue = response.data[i].description
//             p.textContent = pValue;
//             const img = document.createElement('img')
//             const updateForm = document.createElement('input')
//             const completeButton = document.createElement('button')
//             const lineBreak1 = document.createElement('br')
//             const deleteButton = document.createElement('button')
//             updateForm.textContent = "Change Info Here"
//             completeButton.textContent = "Update"
//             deleteButton.textContent = "X"
//             toDoItem.appendChild(h2)
//             toDoItem.appendChild(p)
//             toDoItem.appendChild(updateForm)
//             toDoItem.appendChild(completeButton)
//             toDoItem.appendChild(lineBreak1)
//             toDoItem.appendChild(deleteButton)
//         })
//         .catch(error => console.log(error))
// }

//Read ALL

const clearAll = () => {
    const toDoList = document.getElementById("list")
    while (toDoList.firstChild) {
        toDoList.removeChild(toDoList.firstChild)
    }
}

const populateToDo = () => {

}

const getAll = () =>{
    axios.get("https://api.vschool.io/adamrawlins/todo")
        .then(response => {
            for(let i = 0; i < response.data.length; i++){
                const toDoItem = document.createElement("li")
                toDoItem.setAttribute("id", `${response.data[i]._id}`)
                const h2 = document.createElement('h2')
                const headerValue = response.data[i].title
                h2.textContent = headerValue;

                const s = document.createElement('s')
                s.textContent = headerValue;

                const price = document.createElement('p')
                const priceValue = `$${response.data[i].price}`
                price.textContent = priceValue;

                const p = document.createElement('p')
                const pValue = response.data[i].description
                p.textContent = pValue;

                const img = document.createElement('img')
                const imgValue = response.data[i].imgUrl
                img.src = imgValue;
                document.getElementById("list").appendChild(img)

                const updateForm = document.createElement('input')
                updateForm.placeholder = "Change Info Here"

                // const updateButton = document.createElement('button')

                const completeButton = document.createElement('button')
                const boxCheck = response.data[i].completed
                if (boxCheck === false) {
                    toDoItem.appendChild(h2)
                    completeButton.textContent = "Complete"
                    // console.log(boxCheck)
                } else if (boxCheck === true){
                    toDoItem.appendChild(s)
                    completeButton.textContent = "Incomplete"
                    // console.log(boxCheck)
                }

                const lineBreak1 = document.createElement('br')
                const lineBreak2 = document.createElement('br')
                const lineBreak3 = document.createElement('br')

                const deleteButton = document.createElement('button')
                deleteButton.textContent = "X"
                
                toDoItem.appendChild(lineBreak1)
                toDoItem.appendChild(img)
                toDoItem.appendChild(price)
                toDoItem.appendChild(p)
                toDoItem.appendChild(updateForm)
                toDoItem.appendChild(lineBreak2)
                toDoItem.appendChild(completeButton)
                toDoItem.appendChild(lineBreak3)
                toDoItem.appendChild(deleteButton)
                completeButton.addEventListener("click", (e) => {
                    completeToDo(e, boxCheck)
                })
                // updateButton.addEventListener("click", (e) => {
                //     updateToDo(e)
                // })
                deleteButton.addEventListener("click", (e) => {
                    deleteToDo(e)
                })
                document.getElementById("list").appendChild(toDoItem)
            }
        })
        .catch(error => console.log(error))
}


const completeToDo = (e, boxCheck) => {
    console.log(boxCheck)
    boxCheck = !boxCheck
    const updatedToDo = {
        completed: boxCheck
    }
    const {id} = e.target.parentElement
    axios.put(`https://api.vschool.io/adamrawlins/todo/${id}`, updatedToDo)
        .then(response => {
            console.log(response.data)
            clearAll()
            getAll()
        })
        .catch(error => console.log(error))
}

//Complete

// const updateToDo = (e) => {
//     console.log(e)
//     const {id} = e.target.parentElement
//     const updatedTodo = {
//         title: todoForm.title.value,
//         price: todoForm.price.value,
//         description: todoForm.description.value,
//         imgUrl: todoForm.imgUrl.value
//     }
//     axios.put(`https://api.vschool.io/adamrawlins/todo/${id}`)
//         .then(response => {
//             console.log(response.data)
//             clearAll()
//             getAll()
//         })
//         .catch(error => console.log(error))
// }

//Delete

const deleteToDo = (e) => {
    console.log(e)
    const {id} = e.target.parentElement
    axios.delete(`https://api.vschool.io/adamrawlins/todo/${id}`)
        .then(response => {
            console.log(response.data)
            clearAll()
            getAll()
        })
        .catch(error => console.log(error))
}
getAll()