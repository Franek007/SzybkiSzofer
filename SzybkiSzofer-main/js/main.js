const fastestDriver = document.querySelector('.fastest-driver')
const fastestDriverPanel = document.querySelector('.add-driver-panel')
const personIcon = document.querySelector('.fa-car-side')
const fastestDriverExitBtn = document.querySelector('.cancel')
const speedMeasureIcon = document.querySelector('.fa-gauge')
const speedMeasurePanel = document.querySelector('.add-speedMeasure-panel')
const speedMeasureExitBtn = document.querySelector('.cancel2')
const mapIcon = document.querySelector('.fa-map-location-dot')
const mapPanel = document.querySelector('.add-Map-panel')
const mapExitBtn = document.querySelector('.cancel3')

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

const showMapPanel = () => {
	mapPanel.style.display = 'flex'
}

const exitMapPanel = () => {
	mapPanel.style.display = 'none'
}

whoIsFaster()

mapIcon.addEventListener('click', showMapPanel)
mapExitBtn.addEventListener('click', exitMapPanel)
speedMeasureIcon.addEventListener('click', showSpeedMeasurePanel)
speedMeasureExitBtn.addEventListener('click', exitSpeedMeasurePanel)
personIcon.addEventListener('click', showFastestDriverPanel)
fastestDriverExitBtn.addEventListener('click', exitFastestDriverPanel)


