fetch(URL)
	.then(res => res.json())
	.then(data => {
		const fetchedData = data.data.sort((a, b) => b.velocity - a.velocity)
		// Pobieram lokalizacje pojazdow?
		// Wybrać punkty kontrolne: 1. ul Gdańska Merkatora nż 13 53.405353, 14.593914 70km/h 2. Bohaterów warszawy 53.432846, 14.532757 50km/h 3.  Koło poniatowskiego 53.440660, 14.513782 50km/h

		const controlPoints = [
			{
				name: 'ul. Gdańska',
				latitude: 53.405353,
				longitude: 14.593914,
				speedLimit: 70,
			},
			{
				name: 'ul. Bohaterów Warszawy',
				latitude: 53.432846,
				longitude: 14.532757,
				speedLimit: 50,
			},
			{
				name: 'ul. Adama Mickiewicza',
				latitude: 53.44066,
				longitude: 14.513782,
				speedLimit: 50,
			},
		]

		const haversineDistance = (lat1, lon1, lat2, lon2) => {
			const toRadians = degree => degree * (Math.PI / 180)
			const R = 6371e3

			const φ1 = toRadians(lat1)
			const φ2 = toRadians(lat2)
			const Δφ = toRadians(lat2 - lat1)
			const Δλ = toRadians(lon2 - lon1)

			const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

			return R * c
		}
		const setRecordSpeed = []
		const setRecordSpeed2 = []

		const monitorVehicleSpeed = () => {
			fetchedData.forEach(vehicle => {
				controlPoints.forEach(point => {
					const distance = haversineDistance(vehicle.latitude, vehicle.longitude, point.latitude, point.longitude)

					if (distance <= 1000) {
						setRecordSpeed.push(vehicle.velocity)
						setRecordSpeed2.push(vehicle.line_number)

						if (vehicle.velocity > point.speedLimit) {
							console.log(`Pojazd ${vehicle.line_number} przekracza limit prędkości w ${point.name}`)
						}
					}

					// Zapiswyac rekordzistow do nowej tablicy.
				})
			})
		}

		// setInterval(monitorVehicleSpeed, 30000) // Co 30 sekund

		monitorVehicleSpeed()

		const ctx = document.getElementById('speedChart').getContext('2d')
		const myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: setRecordSpeed2,
				datasets: [
					{
						label: 'km/h',
						data: setRecordSpeed,
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
	})
	.catch(error => console.error('Coś nie tak Error:', error))
