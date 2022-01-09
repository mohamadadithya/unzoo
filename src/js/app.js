const rangeForm = document.querySelector('.header__form')
const rangeInput = rangeForm.querySelector('.header__form--input')
const preloaderEl = document.querySelector('.preloader')
const randomButton = document.querySelector('.random-btn')

const animalsContainer = document.querySelector('.animals .container')

const getAnimals = async () => {
  preloader('show')
  const response = await fetch(`https://zoo-animal-api.herokuapp.com/animals/rand/${rangeInput.value.length <= 0 ? 1: rangeInput.value}`)
  const result = await response.json()
  const data = await result
  animalsContainer.innerHTML = ""
  showAnimals(data)
  preloader('hide')
}

const showAnimals = (animals) => {
  animals.forEach((animal) => {
    animalsContainer.innerHTML += `<div class="card">
    <img src="${animal.image_link}" alt="${animal.name}" class="card__image">
    <h1 class="card__name">${animal.name}</h1>
    <p class="card__latin">${animal.latin_name}</p>
    <ul class="card__infos">
    <li><span class="f-bold">Animal Type</span>${animal.animal_type}</li>
    <li><span class="f-bold">Active Time</span>${animal.active_time}</li>
    <li><span class="f-bold">Weight</span>${animal.weight_min}-${animal.weight_max} lbs.</li>
    <li><span class="f-bold">Length</span>${animal.length_min}-${animal.length_max} ft.</li>
    <li><span class="f-bold">Lifespan</span>${animal.lifespan} years</li>
    <li><span class="f-bold">Habitat</span>${animal.habitat}</li>
    <li><span class="f-bold">Diet</span>${animal.diet}</li>
    <li><span class="f-bold">Location</span>${animal.geo_range}</li>
    </ul>
    </div>`
  })
}

rangeForm.addEventListener('submit', (e) => {
  e.preventDefault()
  rangeInput.blur()
  getAnimals()
})

randomButton.addEventListener('click', getAnimals)

const preloader = (status) => {
  if (status === 'show') {
    preloaderEl.classList.add('show')
  } else {
    preloaderEl.classList.remove('show')
  }
}

getAnimals()
