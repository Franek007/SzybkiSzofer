const URL = 'https://www.zditm.szczecin.pl/api/v1/vehicles'

const whoIsFaster = () => {
	fetch(URL)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			const fetchedData = data.data.sort((a, b) => b.punctuality - a.punctuality)
			console.log(fetchedData)

			// Data
			const negativeValues = fetchedData.slice(-5)
			const positiveValues = fetchedData.slice(0, 5)
			const topFivePositiveNumbers = positiveValues.map(item => item.punctuality)
			const topFiveNegativeNumbers = negativeValues.map(item => item.punctuality)

			// Labels
			const labelsTopFivePositiveNum = [...positiveValues].map(item => item.line_number)
			const labelsTopFiveNegativeNum = [...negativeValues].map(item => item.line_number)

			const labelsForTopFiveBestDrivers = [...positiveValues].map(item => item.vehicle_id)
			const labelsForTopFiveWorstDrivers = [...negativeValues].map(item => item.vehicle_id)

			// Chce pobrac dane o punktualnosci pojadow z calej tablicy. potem obliczyc ile procent ma punctuality === 0 i ile ma 0< i >0

			let punctual = 0
			let overPunctual = 0
			let unPunctual = 0

			fetchedData.forEach(item => {
				if (item.punctuality === 0) {
					punctual++
				}
				if (item.punctuality > 0) {
					overPunctual++
				} else {
					unPunctual++
				}
			})

			const punctualDatacombined = punctual + overPunctual + unPunctual

			const percentageOfPunctual = (punctual / punctualDatacombined) * 100
			const percentageOfOverPunctual = (overPunctual / punctualDatacombined) * 100
			const percentageOfUnPunctual = (unPunctual / punctualDatacombined) * 100

			// console.log(percentageOfPunctual);
			// console.log(percentageOfunPunctual);

			console.log('---------------')
			console.log(punctual)
			console.log(overPunctual)
			console.log(unPunctual)
			console.log(punctualDatacombined)
			// ------------------------------------------------------------------
			// ------------------------------------------------------------------
			// ------------------------------------------------------------------

			const map = () => {
				const map = L.map('map').setView([53.425109842, 14.550810974], 13)

				L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
					// maxZoom: 13,
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				}).addTo(map)

				const markers = L.markerClusterGroup()

				fetchedData.forEach(tram => {
					const marker = L.marker([tram.latitude, tram.longitude]).bindPopup(`Tramwaj ${tram.vehicle_id}`)
					markers.addLayer(marker)
				})

				map.addLayer(markers)
			}
			map()

			const ctx1 = document.getElementById('driverChart1').getContext('2d')
			const myChart = new Chart(ctx1, {
				type: 'bar',
				data: {
					labels: labelsTopFivePositiveNum,
					datasets: [
						{
							label: 'Przed czasem (minut)',
							data: topFivePositiveNumbers,
							borderColor: '#36A2EB',
							backgroundColor: '#056517',
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						bottomText: {
							display: false,
							text: 'Najszybszi i najwolniejszy kierowcy:',
						},
					},
					scales: {
						x: {
							title: {
								display: true,
								text: 'Numer lini:',
							},
							stacked: true,
						},

						y: {
							beginAtZero: true,
						},
					},
				},
			})

			const ctx2 = document.getElementById('driverChart2').getContext('2d')
			const myChart2 = new Chart(ctx2, {
				type: 'bar',
				data: {
					labels: labelsTopFiveNegativeNum,
					datasets: [
						{
							label: 'Spóżniony (minut)',
							data: topFiveNegativeNumbers,
							borderColor: '#FF6384',
							backgroundColor: '#bf1029',
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						bottomText: {
							display: false,
							text: 'Najszybszi i najwolniejszy kierowcy:',
						},
					},
					scales: {
						x: {
							title: {
								display: true,
								text: 'Numer lini:',
							},
							stacked: true,
						},

						y: {
							beginAtZero: true,
						},
					},
				},
			})

			const ctx3 = document.getElementById('driverChart3').getContext('2d')
			const myChart3 = new Chart(ctx3, {
				type: 'bar',
				data: {
					labels: labelsForTopFiveBestDrivers,
					datasets: [
						{
							label: 'Przed czasem (minut)',
							data: topFivePositiveNumbers,
							borderColor: '#36A2EB',
							backgroundColor: '#056517',
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						bottomText: {
							display: false,
							text: 'Najszybszi i najwolniejszy kierowcy:',
						},
					},
					scales: {
						x: {
							title: {
								display: true,
								text: 'Numer konkretnego pojazdu:',
							},
							stacked: true,
						},

						y: {
							beginAtZero: true,
						},
					},
				},
			})

			const ctx4 = document.getElementById('driverChart4').getContext('2d')
			const myChart4 = new Chart(ctx4, {
				type: 'bar',
				data: {
					labels: labelsForTopFiveWorstDrivers,
					datasets: [
						{
							label: 'Spóżniony (minut)',
							data: topFiveNegativeNumbers,
							borderColor: '#FF6384',
							backgroundColor: '#bf1029',
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						bottomText: {
							display: false,
							text: 'Najszybszi i najwolniejszy kierowcy:',
						},
					},
					scales: {
						x: {
							title: {
								display: true,
								text: 'Najszybszi i najwolniejszy kierowcy:',
							},
							stacked: true,
						},

						y: {
							beginAtZero: true,
						},
					},
				},
			})

			const ctx5 = document.getElementById('driverChart5').getContext('2d')
			const myChart5 = new Chart(ctx5, {
				type: 'doughnut',
				data: {
					labels: ['Punktualanie', 'Szybciej niż powinni', 'Spoźnialscy'],
					datasets: [
						{
							label: 'Punktualnie',
							data: [
								percentageOfPunctual.toFixed(2),
								percentageOfOverPunctual.toFixed(2),
								percentageOfUnPunctual.toFixed(2),
							],
							backgroundColor: ['#056517', '#fcbf49', '#bf1029'],
							borderColor: ['#2a9d8f', '#f77f00', '#d62828'],
							borderWidth: 1,
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: 'Procentowy rozkład punktualności kierowców',
						},
					},
				},
			})
		})
		.catch(error => console.error('Coś nie tak Error:', error))
}
