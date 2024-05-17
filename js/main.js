const fastestDriver = document.querySelector('.fastest-driver')
const fastestDriverPanel = document.querySelector('.add-driver-panel')
const personIcon = document.querySelector('.fa-car-side')
const fastestDriverExitBtn = document.querySelector('.cancel')
const speedMeasureIcon = document.querySelector('.fa-gauge')
const speedMeasurePanel = document.querySelector('.add-speedMeasure-panel')
const speedMeasureExitBtn = document.querySelector('.cancel2')

const showFastestDriverPanel = () => {
	fastestDriverPanel.style.display = 'flex'
}

const exitFastestDriverPanel = () => {
	fastestDriverPanel.style.display = 'none'
}

const showSpeedMeasurePanel = () => {
	speedMeasurePanel.style.display = 'flex'
}

const exitSpeedMeasurePanel = () => {
	speedMeasurePanel.style.display = 'none'
}

whoIsFaster()

speedMeasureIcon.addEventListener('click', showSpeedMeasurePanel)
speedMeasureExitBtn.addEventListener('click', exitSpeedMeasurePanel)
personIcon.addEventListener('click', showFastestDriverPanel)
fastestDriverExitBtn.addEventListener('click', exitFastestDriverPanel)
