// Set this variable to true for API, false for file
const useApi = false

// Initialize scores as an empty object
let scores = {}

// Initialize uniqueBoxNumbers as an empty array
let uniqueBoxNumbers = []

// Flag to track if static table 2 has been added
let staticTable2Added = true

// Function to fetch data from an API or a file
async function fetchData() {
  try {
    if (useApi) {
      // Replace 'API_URL' with your actual API endpoint
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwRtkiZxXWZ7U0kU8xpA08p5POIYa_wc9OOBveSGqePvwJ9MN2zmzxj4t8UyMZ0dRckyQ/exec'
      )
      scores = await response.json()
    } else {
      // Assuming scores.json is in the same directory as the HTML file
      const response = await fetch('/data/data-champ.json')
      scores = await response.json()
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Function to initialize the page
function initializePage() {
  // Set uniqueBoxNumbers after fetching data
  uniqueBoxNumbers = [...new Set(scores.data.map((row) => row[0]))]

  // Display stats
  displayStats()

  const date = new Date(scores.main.lastUpdated)

  document.getElementById('updated').innerHTML =
    'Updated ' +
    new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'long',
    }).format(date)

  // Loop through the unique box numbers to generate tables for each box
  uniqueBoxNumbers.forEach((boxNumber, index) => {
    generateBoxTable(boxNumber)

    // Check if it's the last iteration
    if (index === uniqueBoxNumbers.length - 1 && !staticTable2Added) {
      // Add static table 2 after all boxes
      document.getElementById('box-containers').innerHTML += `
<div class="col-lg-6 col-md-12 col-12 mt-4 pt-2">
            <div class="table-responsive bg-white shadow-md rounded-md">
              <table class="table mb-0 table-center align-middle caption-top">
                <caption class="text-center bg-soft-success">
                  <span class="fw-bold">New Players in Round 2</span>
                </caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="border-bottom text-center"
                      style="width: 40%"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="border-bottom text-center"
                      style="width: 60%"
                    >
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">1</td>
                    <td class="text-nowrap">
                      <span class="logo-light-mode">
                        <img
                          src="images/CAM_h.gif"
                          class="me-0 l-light"
                          height="auto"
                          width="21"
                          alt=""
                        />
                      </span>
                      Loic
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">2</td>
                    <td class="text-nowrap">
                      <span class="logo-light-mode">
                        <img
                          src="images/NIG_h.gif"
                          class="me-0 l-light"
                          height="auto"
                          width="21"
                          alt=""
                        />
                      </span>
                      Daniel
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">3</td>
                    <td class="text-nowrap">
                      <span class="logo-light-mode">
                        <img
                          src="images/CAM_h.gif"
                          class="me-0 l-light"
                          height="auto"
                          width="21"
                          alt=""
                        />
                      </span>
                      Brad
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">4</td>
                    <td class="text-nowrap">
                      <span class="logo-light-mode">
                        <img
                          src="images/GBR_h.gif"
                          class="me-0 l-light"
                          height="auto"
                          width="21"
                          alt=""
                        />
                      </span>
                      Seale
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">5</td>
                    <td class="text-nowrap">
                      <span class="logo-light-mode">
                        <img
                          src="images/RUS_h.gif"
                          class="me-0 l-light"
                          height="auto"
                          width="21"
                          alt=""
                        />
                      </span>
                      Pavel
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`

      // Set the flag to true
      staticTable2Added = true
    }
  })
}

// Function to generate HTML table for each box
function generateBoxTable(boxNumber) {
  // Filter data for the current box
  const boxData = scores.data.filter((row) => row[0] === boxNumber)

  // Find the number of players for the current box
  const numberPlayers = boxData.find((row) => row[2] === 1)?.[1]

  let tableHtml = `
          <div class="table-responsive bg-white shadow-md rounded-md">
              <table class="table mb-0 table-center align-middle caption-top">
                  <caption class="text-center bg-soft-success">
                      <span class="fw-bold">Box ${boxNumber}</span>
                  </caption>
                  <thead>
                      <tr>
                          <th scope="col" class="border-bottom text-center" style="width: 5%">#</th>
                          <th scope="col" class="border-bottom text-center" style="width: 30%">Name</th>
                          ${Array.from(
                            { length: numberPlayers },
                            (_, i) =>
                              `<th scope="col" class="border-bottom text-center" style="width: 5%">${
                                i + 1
                              }</th>`
                          ).join('')}
                          <th scope="col" class="border-bottom text-center" style="width: 10%">Pts</th>
                      </tr>
                  </thead>
                  <tbody id="box-container-${boxNumber}">
                  </tbody>
              </table>
          </div>
      `

  // Create a new box container dynamically
  const container = document.createElement('div')
  container.id = `box-container-${boxNumber}`
  container.classList.add('col-lg-6', 'col-md-12', 'col-12', 'mt-4', 'pt-2')

  // Append the HTML table to the box container
  container.innerHTML += tableHtml

  // Replace "@" with an icon in the player rows
  const replaceIcon = (score) => {
    return score === '@' ? '<i class="mdi mdi-tennis-ball text-yellow"></i>' : score
  }

  // Populate the table with player data
  boxData.forEach((row) => {
    const playerNumber = row[2]
    const playerName = row[6]
    const scoreVsPlayers = row.slice(7, 7 + numberPlayers)
    const totalPoints = row[3]
    const playerRank = row[4]
    const elimCriteria = row[7 + numberPlayers]

    // Calculate flag variable
    const flag = `<span class="logo-light-mode">
          <img src="images/${row[5]}_h.gif" class="me-0 l-light" height="auto" width="21" alt="" />
      </span>`

    // Check if the player is inactive (Total Points is zero)
    const isInactive = parseFloat(totalPoints) === 0

    // Check if rank should be displayed
    const showRank = scores.main.showRank === 1 && !isInactive

    // Calculate rank HTML
    const rank = showRank
      ? `
          <sup>
              <span class="badge rounded-pill bg-soft-success">
                  ${playerRank}
              </span>
          </sup>`
      : ''

    let playerHtml = `
          <tr ${isInactive ? 'class="opacity-50"' : ''}>
              <td class="text-center">${playerNumber}</td>
              <td class="text-nowrap">${flag}${playerName}${showRank ? rank : ''}`

    // Add score vs players data to the row
    scoreVsPlayers.forEach((score, index) => {
      const bgClass = index % 2 === 0 ? 'bg-soft-primary-table' : ''
      playerHtml += `<td class="text-center ${bgClass}">${replaceIcon(score)}</td>`
    })

    // Add total points to the row
    playerHtml += `<td class="text-center">${totalPoints}</td></tr>`

    // Append the player row to the corresponding box table
    container.querySelector('tbody').innerHTML += playerHtml

    // Add progress bar based on participation percentage
    const participationPercentage = parseFloat(elimCriteria) * 100
    const progressBarClass = elimCriteria < 0.6 ? 'bg-success' : 'bg-primary'

    const progressHtml = `
          <div class="progress" style="height: 2px;">
              <div class="progress-bar ${progressBarClass}" role="progressbar" style="width: ${participationPercentage}%;"
                  aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
              </div>
          </div>`

    // Add progress bar to the cell
    container.querySelector(
      `#box-container-${boxNumber} tbody tr:last-child td:nth-child(2)`
    ).innerHTML += progressHtml
  })

  // Append the box container to the main container
  document.getElementById('box-containers').appendChild(container)
}
// Function to display stats
function displayStats() {
  // Display stats
  const matchesPlayedPerBox = uniqueBoxNumbers.map((boxNumber) => {
    const matchesPlayed = scores.data
      .filter((row) => row[0] === boxNumber && row[2] === 2)
      .map((row) => row[1])

    return matchesPlayed.length > 0 ? matchesPlayed[0] : 0
  })

  const possibleMatchesPerBox = uniqueBoxNumbers.map((boxNumber) => {
    const numPlayers = scores.data
      .filter((row) => row[0] === boxNumber && row[2] === 1)
      .map((row) => row[1])

    // Assuming numPlayers array will contain only one element
    const n = numPlayers.length > 0 ? numPlayers[0] : 0

    // Calculate total possible matches using the formula n * (n-1) / 2
    return (n * (n - 1)) / 2
  })

  let options = {
    series: [],
    chart: {
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
      height: 350,
      type: 'bar',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 4,
        left: 0,
        top: -2,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ['#336699', '#c85a19'],
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#336699', '#c85a19'],
      },
    },
  }

  let seriesData = []
  for (let i = 0; i < matchesPlayedPerBox.length; i++) {
    seriesData.push({
      x: `Box ${i + 1}`,
      y: matchesPlayedPerBox[i],
      goals: [
        {
          name: 'Expected',
          value: possibleMatchesPerBox[i], // Use possibleMatchesPerBox here
          strokeWidth: 5,
          strokeHeight: 10,
          strokeColor: '#c85a19',
        },
      ],
    })
  }
  options.series.push({
    name: 'Actual',
    data: seriesData,
  })

  var chart = new ApexCharts(document.querySelector('#dashboard'), options)
  chart.render()

  let matchPlayed = parseInt(scores.main.matchPlayed)
  let totMatches = parseInt(scores.main.totMatches)

  let totalMachesPlayedPercent = parseFloat(
    (matchPlayed / (matchPlayed + totMatches)) * 100
  ).toFixed(1)

  let options1 = {
    series: [totalMachesPlayedPercent],
    chart: {
      height: 420,
      type: 'radialBar',
      offsetY: -10,

      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: '#436180',
          opacity: 0.1,
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          name: {
            fontSize: '16px',
            color: '#336699',
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            color: '#336699',
            formatter: function (val) {
              return val + '%'
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,

        colorStops: [
          {
            offset: 0,
            color: '#336699',
            opacity: 1,
          },
          {
            offset: 20,
            color: '#336699',
            opacity: 0.8,
          },
          {
            offset: 40,
            color: '#336699',
            opacity: 0.6,
          },

          {
            offset: 60,
            color: '#336699',
            opacity: 0.4,
          },
          {
            offset: 80,
            color: '#336699',
            opacity: 0.2,
          },
          {
            offset: 100,
            color: '#336699',
            opacity: 0.1,
          },
        ],
      },
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      width: 2,
      dashArray: 0,
    },
    labels: [''],
  }

  var chart = new ApexCharts(document.querySelector('#matchesplayed'), options1)
  chart.render()

  //mapsbox
  mapboxgl.accessToken =
    'pk.eyJ1Ijoid2hzNDY1IiwiYSI6ImNrcjF2eGt4ZjFyMmwydHBsZjVwNmhiamUifQ.3f6FDFFgSpxqPUa8gG66Sg'
  var map = new mapboxgl.Map({
    container: 'mapid', // container id
    style: 'mapbox://styles/whs465/ckr1wbjam84eq17mc4tpw4heh', // style URL
    center: [54.416264, 24.446542], // starting position [lng, lat]
    zoom: 10, // starting zoom
  })

  var geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [54.38302, 24.44304],
        },
        properties: {
          title: 'Abu Dhabi Country Club',
          description:
            '9 courts. Restaurants, <strong>beer</strong> and coffee. <br>Coordinates: 24.442947, 54.383117',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [54.388927, 24.504229],
        },
        properties: {
          title: 'ACTIVE Al Maryah',
          description: '4 courts. <br>Coordinates: 24.504229, 54.388927',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [54.458793, 24.413473],
        },
        properties: {
          title: 'Zayed Sports City',
          description:
            'With eight tennis courts to practice, a stunning tennis stadium and the city’s best tennis coaches. <br>Coordinates: 24.413473, 54.458793',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [38.78984, 8.992436],
        },
        properties: {
          title: 'Bole 23 Tennis Club',
          description: '4 clay courts.<br>Coordinates: 8.992436, 38.789840',
        },
      },

      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [38.783554, 9.004033],
        },
        properties: {
          title: 'Shala Park',
          description: '2 clay courts.<br>Coordinates: 9.004033, 38.783554',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [38.757829, 9.014916],
        },
        properties: {
          title: 'Addis Ababa Tennis Club',
          description:
            '5 clay courts. <strong>Beer</strong> and coffee. Parking.<br>Coordinates: 9.014916, 38.757829',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [38.779015, 8.99628],
        },
        properties: {
          title: 'Bole 19 Tennis Club',
          description:
            '3 clay courts. Great ambience, local food, <strong>beer</strong> and coffee. In front of Antica Bar & Restaurant.<br>Coordinates: 8.996280, 38.779015',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [38.795576903032526, 8.989876263478747],
        },
        properties: {
          title: "Pilot's Club",
          description:
            '3 courts in good condition.<br>Coordinates: 8.996280, 38.779015',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [38.72907175631836, 9.009951302869334],
        },
        properties: {
          title: "Defence Force Officer's Club",
          description:
            '4 courts in good condition.<br>Coordinates: 9.009951, 38.729071',
        },
      },
    ],
  }
  // add markers to map
  geojson.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement('div')
    el.className = 'marker'

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            ` <h4>
              ${marker.properties.title}
            </h4>
            <p>
              ${marker.properties.description}
            </p>
          `
          )
      )
      .addTo(map)
  })

  document.getElementById('numCountries').innerText = scores.main.numCountries
  document.getElementById('numPlayers').innerText = scores.main.numPlayers
  document.getElementById('totMatches').innerText = scores.main.totMatches
  document.getElementById('matchPlayed').innerText = parseFloat(
    scores.main.matchPlayed
  ).toFixed(0)
}

const counterElements = document.querySelectorAll('.counter-value')
const speed = 80 // the lower the slower

// Counters
function counter(target, start, stop) {
  target.innerText = 0
  const counterInterval = setInterval(() => {
    const inc = Number(stop / speed)
    start += inc
    const valueConverted = (Math.round(start * 100) / 100).toFixed(0)
    target.innerText = valueConverted
    if (valueConverted === stop) {
      clearInterval(counterInterval)
    }
  }, 30)
}

function obCallBack(entries) {
  entries.forEach((entry) => {
    const { target } = entry
    const stopValue = target.innerText
    const startValue = 0
    if (!entry.isIntersecting) return
    counter(target, startValue, stopValue)
    counterObserver.unobserve(target)
  })
}

const counterObserver = new IntersectionObserver(obCallBack, {
  threshold: 1,
})
counterElements.forEach((counterElem) => counterObserver.observe(counterElem))

// Fetch data when the script is loaded and initialize the page
fetchData().then(initializePage)
