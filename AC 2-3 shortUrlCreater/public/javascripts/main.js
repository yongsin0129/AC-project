function copyURL () {
  const shortURL = document.querySelector('#shortURL')
  navigator.clipboard.writeText(shortURL.textContent)
  alert('Copied the text: ' + shortURL.textContent)
}
