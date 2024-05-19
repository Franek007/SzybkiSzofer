const URL = 'https://www.zditm.szczecin.pl/api/v1/vehicles'

const whoIsFaster = () => {
	fetch(URL)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			const fetchedData = data.data.sort((a, b) => b.punctuality - a.punctuality)

			const negativeValues = fetchedData.slice(-5)
			const positiveValues = fetchedData.slice(0, 5)
			console.log(positiveValues)
			// const fastTramlocation = positiveValues.map(tram => tram.)

			const topFivePositiveNumbers = positiveValues.map(item => item.punctuality)
			const topFiveNegativeNumbers = negativeValues.map(item => item.punctuality)

			const labels = [...positiveValues, ...negativeValues].map(item => item.line_number)

			// Potrzebuje dane posortowal od najwiekszego do najmniejszego i wtedy slice 5 najwiekszych i najmniejszych

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

			const ctx = document.getElementById('driverChart1').getContext('2d')
			const myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Przed czasem (minut)',
							data: topFivePositiveNumbers,
							borderColor: '#36A2EB',
							backgroundColor: '#056517',
						},
						{
							label: 'Spóżniony (minut)',
							data: [...Array(5).fill(0), ...topFiveNegativeNumbers.map(val => -val)],
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
		})
		.catch(error => console.error('Coś nie tak Error:', error))
}
