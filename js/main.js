const fastestDriver = document.querySelector('.fastest-driver')
const fastestDriverPanel = document.querySelector('.add-driver-panel')
const personIcon = document.querySelector('.fa-car-side')
const fastestDriverExitBtn = document.querySelector('.cancel')

const showFastestDriverPanel = () => {
	if (!(fastestDriverPanel.style.display === 'flex')) {
		fastestDriverPanel.style.display = 'flex'
	} else {
		fastestDriverPanel.style.display = 'none'
	}
}

const exitFastestDriverPanel = () => {
	fastestDriverPanel.style.display = 'none'
}

whoIsFaster()


personIcon.addEventListener('click', showFastestDriverPanel)
fastestDriverExitBtn.addEventListener('click', exitFastestDriverPanel)
