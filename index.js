let qs = (element) => { return document.querySelector(element) }
let ce = (element) => { return document.createElement(element) }

let monsterFormDiv = qs('#create-monster')
let monsterContainer = qs('#monster-container')
let forwardButton = qs('#forward')
let backButton = qs('#back')

let form = ce('form')
let nameInput = ce('input')
let ageInput = ce('input')
let bioInput = ce('input')
let createButton = ce('button')

let allMonsters = []
let currentPage = 1
let pageLimit = 50

function fetchMonsters(pageNum) {
    fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${pageNum}`)
    .then( res => res.json() )
    .then( json => allMonsters = json)
    .then( render )
}

function render() {
    monsterContainer.innerHTML = ''
    allMonsters.forEach(monster => {
        let monsterCard = ce('div')
        let name = ce('h2')
        let age = ce('h4')
        let bio = ce('p')
        name.innerText = monster.name
        age.innerText = "Age: " + monster.age
        bio.innerText = "Bio: " + monster.description
        monsterCard.append(name, age, bio)
        monsterContainer.append(monsterCard)
    })
    renderForm()
}

function addNavigation() {
    forwardButton.addEventListener('click', () => {
        if (allMonsters.length < pageLimit) {
            alert('No moar pages ahead.')
        }
        else {
            currentPage++
            console.log('page', currentPage)
            fetchMonsters(currentPage) 
        }
    })

    backButton.addEventListener('click', () => {
        if (currentPage <= 1) {
            console.log ('page', currentPage)
            alert(`Ain't no monstas back there.`)
        }
        else {
            --currentPage
            console.log('page', currentPage)
            fetchMonsters(currentPage)
        }
    })
}

//form stuff

function renderForm() {
    nameInput.setAttribute('name', 'name')
    nameInput.setAttribute('placeholder', 'name')
    ageInput.setAttribute('name', 'age')
    ageInput.setAttribute('placeholder', 'age')
    bioInput.setAttribute('name', 'bio')
    bioInput.setAttribute('placeholder', 'description')
    createButton.innerText = 'Create Monsta'
    createButton.setAttribute('type', 'submit')
    createButton.setAttribute('placeholder', 'description')
    
    form.append(nameInput, ageInput, bioInput, createButton)

    monsterFormDiv.append(form)
}

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     let data = {
//         'name': e.target.name.value,
//         'age': e.target.age.value,
//         'description': e.target.bio.value
//     }

//     fetch('http://localhost:3000/monsters/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': "application/json"
//         },
//         body: JSON.stringify(data) 
        
//     })

// })


createButton.addEventListener('click', (e) => {
    e.preventDefault()
    let data = {
        'name': nameInput.value,
        'age': ageInput.value,
        'description': bioInput.value
    }

    fetch('http://localhost:3000/monsters/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify(data) 
        
    })

})



fetchMonsters(currentPage)
addNavigation()