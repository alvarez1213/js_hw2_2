class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.reset();
    this.registerEvents();

    this.timerId = null
    this.timer = 10
    this.startTime = Date.now()
    this.timerElement = container.querySelector('.timer')
    this.resetTimer()
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;        
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */

    let onKey = (e) => {
      const cur = this.currentSymbol
      
      // если шифт, то выходим
      if (e.key === 'Shift' || e.key === 'Enter' || e.key === 'Escape') {
        return
      }
      
      // проверяем текущий символ с нажатым
      if (cur.textContent == e.key) {
        this.success()
      } else {
        this.fail()
      }
    }  

    // добавляем обработчик нажатия
    document.addEventListener('keydown', onKey)
  }

  updateTimer() {
    if (this.timer === 0) {
      this.fail()
      
      return
    }
    this.timer--
    console.log(this.timer)
    this.timerElement.textContent = this.timer
  }

  resetTimer() {
    this.startTime = Date.now()
    this.timerId = setInterval(this.updateTimer.bind(this), 1000)
    this.timer = 10
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    clearInterval(this.timerId)
    this.resetTimer()
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
    clearInterval(this.timerId)
    this.resetTimer()
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

