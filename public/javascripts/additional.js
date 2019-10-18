const messageContainer = document.querySelector('.messageContainer')
const redButton = document.querySelector('#redButton')
const greenButton = document.querySelector('#greenButton')
const blueButton = document.querySelector('#blueButton')
const about = document.querySelector('#about')

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 81) {
    console.log(123)
    blueButton.click()
  }
  if (e.keyCode == 87) {
    redButton.click()
  }
  if (e.keyCode == 69) {
    greenButton.click()
  }
  if (e.keyCode == 72) {
    about.click()
  }
})

document.querySelector('#about').addEventListener('click', (e) => {
  e.preventDefault()
  console.log(messageContainer.classList)
  if (!messageContainer.classList.contains('hidden')) {
    messageContainer.classList.add('hidden')
  } else {
    messageContainer.classList.remove('hidden')
  }
})