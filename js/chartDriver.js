// 1. Na klikniecie w ikone czlowieka otwiera sie modal (nadaje display flex)

// 2. Dane: Najszybszy kierowca dnia, jaki kierowca na jakiej lini nie ma opóźnienia i ktorego kierowcy unikac. 5 statystyk. Dane dla tych 5 ktorzy nie maja opóznienia. 5 dla tycj ktorzy maja opóźnienie.
const URL = 'https://www.zditm.szczecin.pl/api/v1/vehicles'

const whoIsFaster = () => {
	fetch(URL)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			const fetchedData = data.data.sort((a,b) => b.punctuality - a.punctuality)

			const negativeValues = fetchedData.slice(-5)
			const positiveValues = fetchedData.slice(0, 5) 
            
            const topFivePositiveNumbers = positiveValues.map(item => item.punctuality)
            const topFiveNegativeNumbers = negativeValues.map(item => item.punctuality)

            const labels = [...positiveValues, ...negativeValues].map(item => item.line_number)

			// Potrzebuje dane posortowal od najwiekszego do najmniejszego i wtedy slice 5 najwiekszych i najmniejszych

			const ctx = document.getElementById('driverChart').getContext('2d')
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
						title: {
							display: true,
							text: 'Najszybszi i najwolniejszy kierowcy:',
						},
					},
					scales: {
						x: {
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
