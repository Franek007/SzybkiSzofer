const fastestDriver = document.querySelector('.fastest-driver')
const fastestDriverPanel = document.querySelector('.add-driver-panel')
const personIcon = document.querySelector('.fa-person')
const fastestDriverExitBtn = document.querySelector('.cancel')
// const URL = 'https://www.zditm.szczecin.pl/api/v1/vehicles'
// 1. Na klikniecie w ikone czlowieka otwiera sie modal (nadaje display flex)

// 2. Dane: Najszybszy kierowca dnia, jaki kierowca na jakiej lini nie ma opóźnienia i ktorego kierowcy unikac. 5 statystyk. Dane dla tych 5 ktorzy nie maja opóznienia. 5 dla tycj ktorzy maja opóźnienie.

// const whoIsFaster = () => {
// 	fetch(URL)
// 		.then(res => res.json())
// 		.then(data => console.log(data))
// 		.catch(error => console.error('Coś nie tak Error:', error))
// }

// whoIsFaster()

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

personIcon.addEventListener('click', showFastestDriverPanel)
fastestDriverExitBtn.addEventListener('click', exitFastestDriverPanel)
