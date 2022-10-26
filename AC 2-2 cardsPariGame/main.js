const GAME_STATE = {
  FirstCardAwaits: 'FirstCardAwaits',
  SecondCardAwaits: 'SecondCardAwaits',
  CardsMatchFailed: 'CardsMatchFailed',
  CardsMatched: 'CardsMatched',
  GameFinished: 'GameFinished'
}

const Symbols = [
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png', // 黑桃
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png', // 愛心
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png', // 方塊
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png' // 梅花
]

const utilities = {
  getRandomNumberArray (count) {
    const number = Array.from(Array(count).keys())
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1))
      ;[number[index], number[randomIndex]] = [
        number[randomIndex],
        number[index]
      ]
    }
    return number
  }
}

const model = {
  revealedCards: [],
  score: 0,
  triedTimes: 0,

  isRevealedCardsMatched () {
    return (
      this.revealedCards[0].dataset.index % 13 ===
      this.revealedCards[1].dataset.index % 13
    )
  }
}

const view = {
  appendWrongAnimation (...cards) {
    cards.map(card => {
      card.classList.add('wrong')
      card.addEventListener(
        'animationend',
        event => event.target.classList.remove('wrong'),
        { once: true }
      )
    })
  },

  pairCard (...card) {
    card.forEach(card => card.classList.add('paired'))
  },

  flipCard (...card) {
    card.forEach(card => {
      if (card.matches('.back')) {
        card.classList.remove('back')
        // card.innerHTML = this.getCardContent(Number(card.dataset.index))
      } else {
        card.classList.add('back')
        // card.innerHTML = null
      }
    })
  },

  // getCardContent (index) {
  //   const number = this.transformNumber((index % 13) + 1)
  //   const symbol = Symbols[Math.floor(index / 13)]
  //   return `
  //     <p>${number}</p>
  //     <img src="${symbol}">
  //     <p>${number}</p>
  //   `
  // },

  getCardElement (index) {
    const number = this.transformNumber((index % 13) + 1)
    const symbol = Symbols[Math.floor(index / 13)]
    return `
    <div class="card back" data-index="${index}">    
      <p>${number}</p>
      <img src="${symbol}">
      <p>${number}</p>        
    </div>`
  },

  displayCards (index) {
    document.querySelector('#cards').innerHTML = index
      .map(number => {
        return this.getCardElement(number)
      })
      .join('')
  },

  transformNumber (number) {
    switch (number) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
      default:
        return number
    }
  },

  renderScore (score) {
    document.querySelector('.score').innerHTML = `Score: ${score}`
  },

  renderTriedTimes (times) {
    document.querySelector('.tried').innerHTML = `You've tried: ${times} times`
  },

  showGameFinished () {
    const div = document.createElement('div')
    div.classList.add('completed')
    div.innerHTML = `
      <p>Complete!</p>
      <p>Score: ${model.score}</p>
      <p>You've tried: ${model.triedTimes} times</p>
    `
    const header = document.querySelector('#header')
    header.before(div)
  }
}

const controller = {
  currentState: GAME_STATE.FirstCardAwaits,

  generateCards () {
    view.displayCards(utilities.getRandomNumberArray(52))
  },

  dispatchCardAction (card) {
    if (!card.classList.contains('back')) {
      return
    }
    switch (this.currentState) {
      case GAME_STATE.FirstCardAwaits:
        view.renderTriedTimes((model.triedTimes += 1))
        view.flipCard(card)
        model.revealedCards.push(card)
        this.currentState = GAME_STATE.SecondCardAwaits
        break
      case GAME_STATE.SecondCardAwaits:
        view.flipCard(card)
        model.revealedCards.push(card)
        // 配對成功
        if (model.isRevealedCardsMatched()) {
          this.currentState = GAME_STATE.CardsMatched
          view.renderScore((model.score += 10))
          view.pairCard(...model.revealedCards)
          if (model.score === 260) {
            this.currentState = GAME_STATE.GameFinished
            view.showGameFinished()
            return
          }
          controller.resetCards()
          // 配對失敗
        } else {
          this.currentState = GAME_STATE.CardsMatchFailed
          view.appendWrongAnimation(...model.revealedCards)
          setTimeout(() => {
            view.flipCard(...model.revealedCards)
            controller.resetCards()
          }, 500)
        }
        break
    }
    console.log('this.currentState', this.currentState)
    console.log(
      'revealedCards',
      model.revealedCards.map(card => card.dataset.index)
    )
  },

  resetCards () {
    model.revealedCards = []
    controller.currentState = GAME_STATE.FirstCardAwaits
  }
}

controller.generateCards()
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', event => {
    console.log(card)
    controller.dispatchCardAction(card)
  })
})
