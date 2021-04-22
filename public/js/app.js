console.log('app.js loadedddddddddd.............')

// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => {
//         response.json()
//         .then((data) => {
//             console.log(data)
//         })
//     })

// fetch('http://127.0.0.1:3000/weather?address=london%20UK')
// .then((response) => {
//     response.json()
//     .then((data) => {
//         if(data.error) {
//             console.log(data.error)

//         }
//         else {
//             console.log(data.location, data.forecast)    
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p-1')
const messageTwo = document.querySelector('#p-2')

weatherForm.addEventListener('submit',(e) => {   
    e.preventDefault()
    messageOne.textContent = "Loading...."
    fetch('http://127.0.0.1:3000/weather?address='+search.value)
        .then((response) => {
            response.json()
            .then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error
                }
                else {
                    messageOne.textContent = data.location 
                    messageTwo.textContent = data.forecast     
                }
            })
        })

    //console.log('Test')
})

