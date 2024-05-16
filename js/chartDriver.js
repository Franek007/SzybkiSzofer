// 1. Na klikniecie w ikone czlowieka otwiera sie modal (nadaje display flex)

// 2. Dane: Najszybszy kierowca dnia, jaki kierowca na jakiej lini nie ma opóźnienia i ktorego kierowcy unikac. 5 statystyk. Dane dla tych 5 ktorzy nie maja opóznienia. 5 dla tycj ktorzy maja opóźnienie.
const URL = 'https://www.zditm.szczecin.pl/api/v1/vehicles'

const whoIsFaster = () => {
	fetch(URL)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			const fetchedData = data.data

			for (let i = 0; i < 5; i++) {
				const item = fetchedData[i]
				console.log(`Line Number: ${item.line_number}`)
				console.log(`Direction: ${item.direction}`)
				console.log(`punctuality: ${item.punctuality}`)
				console.log(`Longitude: ${item.longitude}`)
				console.log('---')
			}

			const labels = fetchedData.map(item => item.line_number)
			const positiveValues = fetchedData.slice(0, 5).map(item => item.velocity) // Pierwsze 5 wartości dodatnich
			const negativeValues = fetchedData.slice(5, 10).map(item => -item.velocity) // Kolejne 5 wartości ujemnych


            const ctx = document.getElementById('driverChart').getContext('2d')
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Label 1',
                        'Label 2',
                        'Label 3',
                        'Label 4',
                        'Label 5',
                        'Label 6',
                        'Label 7',
                        'Label 8',
                        'Label 9',
                        'Label 10',
                    ],
                    datasets: [
                        {
                            label: 'Punktualni kierowcy',
                            data: positiveValues,
                            borderColor: '#36A2EB',
                            backgroundColor: '#9BD0F5',
                        },
                        {
                            label: 'Nie punktualni kierowcy',
                            data: [0, 0, 0, 0, -10, -20, -30, -40, -50],
                            borderColor: '#FF6384',
                            backgroundColor: '#FFB1C1',
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
                            text: 'Najszybszi i najwolniejszy kierowcy:',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            })
		})
		.catch(error => console.error('Coś nie tak Error:', error))
}

whoIsFaster()

