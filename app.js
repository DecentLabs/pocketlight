const screen = document.getElementById('app')

let startX = 0
let startY = 0
let lightness = 70
let hue = 70

screen.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`


screen.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX
  startY = e.touches[0].clientY
})

screen.addEventListener('touchmove', (e) => {
  let posY = e.changedTouches[0].clientY
  let posX = e.changedTouches[0].clientX
  let deltaY = Math.abs(posY - startY)
  let deltaX = Math.abs(posX - startX)

  if (deltaY > 0 && deltaX < 10) {
    if  (posY < startY) {
      console.log('up')
      lightness += deltaY * 0.4
    } else {
      console.log('down')
      lightness -= deltaY * 0.4
    }
  }

  if (deltaX > 0 && deltaY < 10) {
    if (posX > startX) {
      console.log('right')
      hue += deltaX * 0.4
    } else {
      console.log('left')
      hue -= deltaX * 0.4
    }
  }

  startY = posY
  startX = posX

  screen.style.backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`
})

async function initWakeLock () {
  let status = ''
  if ('getWakeLock' in navigator) {
    let wakeLockObj

    try {
      // Create a wake lock for the type we want.
      wakeLockObj = await navigator.getWakeLock('screen')
      console.log('getWakeLock success', wakeLockObj)
      status = 'wakelock OK'
    } catch (err) {
      console.error('getWakeLock error', err)
      status = 'wakelock error'
    }
  } else {
    console.log('getWakeLock not supported')
    status = 'wakelock not supported'
  }

  screen.innerHTML = status
}

initWakeLock()
