const input = document.querySelector('#search-input')
// input.addEventListener('input', (event) => {
//   const inputWord = event.target.value
//   input.value = inputWord.trim()
// })

const button = document.querySelector('#search-button')
button.addEventListener('click', (event) => {
  input.value = input.value.trim()
})
