window.addEventListener('load', fn, false)

// showModal()
renderScores()

function showModal() {
  // Beginning Licence
  // var myModal = new bootstrap.Modal(document.getElementById('license'), {})
  // document.onreadystatechange = function () {
  //   myModal.show()
  // }
  // End Licence

  // if (/Android/i.test(navigator.userAgent)) {
  //   // true for android mobile device
  //   if (navigator.userAgent.indexOf('Chrome') !== -1) {
  //     var myModal = new bootstrap.Modal(
  //       document.getElementById('AndroidAddHome'),
  //       {}
  //     )
  //     if (!window.matchMedia('(display-mode: standalone)').matches) {
  //       document.onreadystatechange = function () {
  //         myModal.show()
  //       }
  //     }
  //   }
  // } else
  if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
    if (navigator.userAgent.indexOf('Safari') !== -1) {
      var myModal = new bootstrap.Modal(document.getElementById('IOSAddHome'), {})
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        document.onreadystatechange = function () {
          myModal.show()
        }
      }
    }
  }
  // else {
  //   // console.log('other mobile device')
  // }
}

//  window.onload = function loader() {
function fn() {
  // Preloader
  if (document.getElementById('preloader')) {
    setTimeout(() => {
      document.getElementById('preloader').style.visibility = 'hidden'
      document.getElementById('preloader').style.opacity = '0'
    }, 1200)
  }
  // Menus
  activateMenu()
}

//Menu
// Toggle menu
function toggleMenu() {
  document.getElementById('isToggle').classList.toggle('open')
  var isOpen = document.getElementById('navigation')
  if (isOpen.style.display === 'block') {
    isOpen.style.display = 'none'
  } else {
    isOpen.style.display = 'block'
  }
}

//Menu Active
function getClosest(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      }
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem
  }
  return null
}

function activateMenu() {
  var menuItems = document.getElementsByClassName('sub-menu-item')
  if (menuItems) {
    var matchingMenuItem = null
    for (var idx = 0; idx < menuItems.length; idx++) {
      if (menuItems[idx].href === window.location.href) {
        matchingMenuItem = menuItems[idx]
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active')
      var immediateParent = getClosest(matchingMenuItem, 'li')
      if (immediateParent) {
        immediateParent.classList.add('active')
      }

      var parent = getClosest(matchingMenuItem, '.parent-menu-item')
      if (parent) {
        parent.classList.add('active')
        var parentMenuitem = parent.querySelector('.menu-item')
        if (parentMenuitem) {
          parentMenuitem.classList.add('active')
        }
        var parentOfParent = getClosest(parent, '.parent-parent-menu-item')
        if (parentOfParent) {
          parentOfParent.classList.add('active')
        }
      } else {
        var parentOfParent = getClosest(
          matchingMenuItem,
          '.parent-parent-menu-item'
        )
        if (parentOfParent) {
          parentOfParent.classList.add('active')
        }
      }
    }
  }
}

// Clickable Menu
if (document.getElementById('navigation')) {
  var elements = document.getElementById('navigation').getElementsByTagName('a')
  for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function (elem) {
      if (elem.target.getAttribute('href') === 'javascript:void(0)') {
        var submenu = elem.target.nextElementSibling.nextElementSibling
        submenu.classList.toggle('open')
      }
    }
  }
}

// Menu sticky
function windowScroll() {
  const navbar = document.getElementById('topnav')
  if (navbar != null) {
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      navbar.classList.add('nav-sticky')
    } else {
      navbar.classList.remove('nav-sticky')
    }
  }
}

window.addEventListener('scroll', (ev) => {
  ev.preventDefault()
  windowScroll()
})

// back-to-top
var mybutton = document.getElementById('back-to-top')
window.onscroll = function () {
  scrollFunction()
}

function scrollFunction() {
  if (mybutton != null) {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      mybutton.style.display = 'block'
    } else {
      mybutton.style.display = 'none'
    }
  }
}

function topFunction() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

//ACtive Sidebar
;(function () {
  var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
  if (current === '') return
  var menuItems = document.querySelectorAll('.sidebar-nav a')
  for (var i = 0, len = menuItems.length; i < len; i++) {
    if (menuItems[i].getAttribute('href').indexOf(current) !== -1) {
      menuItems[i].parentElement.className += ' active'
    }
  }
})()

//Feather icon
feather.replace()

// dd-menu
var ddmenu = document.getElementsByClassName('dd-menu')
for (var i = 0, len = ddmenu.length; i < len; i++) {
  ddmenu[i].onclick = function (elem) {
    elem.stopPropagation()
  }
}

//Tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
)
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

//small menu
try {
  var spy = new Gumshoe('#navmenu-nav a')
} catch (err) {}

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

async function getData() {
  let url =
    'https://script.google.com/macros/s/AKfycbz-TMGbvU9sUf0IjeEfIiMoRdqEfeY2GeTMQyqVJdMHhhqApOOL4O68fGZFIHD95e8mZg/exec'
  try {
    let res = await fetch(url)
    if (!res.ok) throw new Error('Request failed. Try again later')
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

async function renderScores() {
  // let scores = await formatJson()
  let matchesPlayedBox1
  let matchesPlayedBox2
  let matchesPlayedBox3
  let matchesPlayedBox4
  let matchesPlayedBox5

  let cellP1, cellP2, cellP3, cellP4, cellP5, cellP6, cellP7, cellP8

  //const scores = await getData()
  const scores = {
    data: [
      [1, 5, 1, 4, 3, 'ITA', 'Samuel', '@', '', '', 3, '', 0.5],
      [1, 2, 2, 9, 2, 'SIN', 'Lim', '', '@', '', 8, '', 0.5],
      [1, '', 3, 0, 4, 'PHI', 'Ariez', '', '', '@', '', '', 0],
      [1, '', 4, 24, 1, 'COL', 'William', 9, 9, '', '@', '', 1],
      [1, '', 5, 0, 4, '', '', '', '', '', '', '@', 0],
      [2, 5, 1, 0, 1, '', '', '@', '', '', '', '', 0],
      [2, 0, 2, 0, 1, '', '', '', '@', '', '', '', 0],
      [2, '', 3, 0, 1, '', '', '', '', '@', '', '', 0],
      [2, '', 4, 0, 1, '', '', '', '', '', '@', '', 0],
      [2, '', 5, 0, 1, '', '', '', '', '', '', '@', 0],
      [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
    ],
    main: {
      totMatches: 4,
      numPlayers: 4,
      matchPlayed: 2,
      numCountries: 4,
      lastUpdated: '2024-01-18T14:30:00.000Z',
      showRank: 0,
    },
    error: false,
  }

  const date = new Date(scores.main.lastUpdated)

  document.getElementById('updated').innerHTML = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'long',
  }).format(date)

  // if (scores.main.showBoxes == 1) {
  //   document.querySelector('#scores').classList.remove('d-none')
  //   document.querySelector('#comingsoon').classList.add('d-none')
  // }

  const boxSeparator = `<th class="text-center">
                          <i class="mdi mdi-tennis-ball text-yellow"></i>
                        </th>
                        `
  const boxSeparatorBg = `<th class="text-center bg-soft-primary-table">
                          <i class="mdi mdi-tennis-ball text-yellow "></i>
                        </th>
                        `

  for (i = 0; i < scores.data.length; i++) {
    boxNumber = scores.data[i][0]

    numberPlayers =
      String(scores.data[i][1]).length > 0 && scores.data[i][2] === 1
        ? scores.data[i][1]
        : numberPlayers

    if (String(scores.data[i][1]).length > 0 && scores.data[i][2] === 2)
      switch (scores.data[i][0]) {
        case 1:
          matchesPlayedBox1 = scores.data[i][1]
          break
        case 2:
          matchesPlayedBox2 = scores.data[i][1]
          break
        case 3:
          matchesPlayedBox3 = scores.data[i][1]
          break
        case 4:
          matchesPlayedBox4 = scores.data[i][1]
          break
        case 5:
          matchesPlayedBox5 = scores.data[i][1]
          break
      }

    matchesPlayed = parseFloat(scores.data[i][7 + numberPlayers]).toFixed(1) + '%'
    playerNumber = scores.data[i][2]
    totalPoints = scores.data[i][3]
    playerRank = scores.data[i][4]
    htmlPoints = `<td class="text-center">${totalPoints}</td>`
    if (playerRank === '') {
      htmlPoints = `<td class="text-center"><i class="mdi mdi-lock text-palid"></i></td>`
    }

    playerOut =
      scores.data[i][6] === 'Mesay' || scores.data[i][6] === 'Sami M.'
        ? `class="text-black-50  text-decoration-line-through"`
        : ``

    flag = `<span class="logo-light-mode">
                <img src="images/${scores.data[i][5]}_h.gif" class="me-0 l-light" height="auto" width="21" alt="" />
            </span>`

    let elimCriteria = scores.data[i][7 + numberPlayers]

    rankAux = `<sup>
              <span class="badge rounded-pill bg-soft-success">
                ${playerRank}
              </span>
            </sup>`
    rank =
      scores.main.showRank == 1
        ? totalPoints == 0 || playerRank == ''
          ? ''
          : `${rankAux}`
        : ``

    p =
      // scores.main.showRank == 1
      elimCriteria < 0.6 //Normally 0.5
        ? `${scores.data[i][6]}
            ${rank}
            <div class="progress" style="height: 2px;">
              <div class="progress-bar bg-success" role="progressbar" style="width:
                  ${
                    parseFloat(elimCriteria * 100).toFixed() + '%'
                  };" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
              </div>
            </div>`
        : `${scores.data[i][6]}
              ${rank}
              <div class="progress" style="height: 2px;">
                <div class="progress-bar bg-primary" role="progressbar" style="width:
                  ${
                    parseFloat(elimCriteria * 100).toFixed() + '%'
                  };" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                </div>
              </div>`
    // <a href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-html="true" title="${playerRank}">${scores.data[i][6]}</a>
    p1 = scores.data[i][7]
    cellP1 =
      p1 === '@'
        ? boxSeparatorBg
        : playerRank === '' && p1 != ''
        ? `<td class="text-center bg-soft-primary-table"><i class="mdi mdi-lock text-palid"></i></td>`
        : `<td class="text-center bg-soft-primary-table">${p1}</td>`

    p2 = scores.data[i][8]
    cellP2 =
      p2 === '@'
        ? boxSeparator
        : playerRank === '' && p2 != ''
        ? `<td class="text-center"><i class="mdi mdi-lock text-palid"></i></td>`
        : `<td class="text-center">${p2}</td>`

    p3 = scores.data[i][9]
    cellP3 =
      p3 === '@'
        ? boxSeparatorBg
        : playerRank === '' && p3 != ''
        ? `<td class="text-center bg-soft-primary-table"><i class="mdi mdi-lock text-palid"></i></td>`
        : `<td class="text-center bg-soft-primary-table">${p3}</td>`

    p4 = scores.data[i][10]
    cellP4 =
      p4 === '@'
        ? boxSeparator
        : playerRank === '' && p4 != ''
        ? `<td class="text-center"><i class="mdi mdi-lock text-palid"></i></td>`
        : `<td class="text-center">${p4}</td>`

    p5 = scores.data[i][11]
    cellP5 =
      p5 === '@'
        ? boxSeparatorBg
        : playerRank === '' && p5 != ''
        ? `<td class="text-center bg-soft-primary-table"><i class="mdi mdi-lock text-palid"></i></td>`
        : `<td class="text-center bg-soft-primary-table">${p5}</td>`

    if (numberPlayers === 6) {
      p6 = scores.data[i][12]
      cellP6 =
        p6 === '@'
          ? boxSeparator
          : playerRank === '' && p6 != ''
          ? `<td class="text-center"><i class="mdi mdi-lock text-palid"></i></td>`
          : `<td class="text-center">${p6}</td>`
    }

    if (numberPlayers === 7) {
      p6 = scores.data[i][12]
      cellP6 =
        p6 === '@'
          ? boxSeparator
          : playerRank === '' && p6 != ''
          ? `<td class="text-center"><i class="mdi mdi-lock text-palid"></i></td>`
          : `<td class="text-center">${p6}</td>`

      p7 = scores.data[i][13]
      cellP7 =
        p7 === '@'
          ? boxSeparatorBg
          : playerRank === '' && p7 != ''
          ? `<td class="text-center bg-soft-primary-table"><i class="mdi mdi-lock text-palid"></i></td>`
          : `<td class="text-center bg-soft-primary-table">${p7}</td>`
    }

    if (numberPlayers === 8) {
      p6 = scores.data[i][12]
      cellP6 =
        p6 === '@'
          ? boxSeparator
          : playerRank === '' && p6 != ''
          ? `<td class="text-center"><i class="mdi mdi-lock text-palid"></i></td>`
          : `<td class="text-center">${p6}</td>`

      p7 = scores.data[i][13]
      cellP7 =
        p7 === '@'
          ? boxSeparatorBg
          : playerRank === '' && p7 != ''
          ? `<td class="text-center bg-soft-primary-table"><i class="mdi mdi-lock text-palid"></i></td>`
          : `<td class="text-center bg-soft-primary-table">${p7}</td>`

      p8 = scores.data[i][14]
      cellP8 =
        p8 === '@'
          ? boxSeparator
          : playerRank === '' && p8 != ''
          ? `<td class="text-center"><i class="mdi mdi-lock text-palid"></i></td>`
          : `<td class="text-center">${p8}</td>`
    }

    strHtml = `
              <tr ${playerOut}>
                <td class="text-center">${playerNumber}</td>
                <td class="text-nowrap">${flag}${p}</td>
                ${cellP1}
                ${cellP2}
                ${cellP3}
                ${cellP4}
                ${cellP5}
                ${numberPlayers === 6 ? cellP6 : ''}
                ${numberPlayers === 7 ? cellP6 + cellP7 : ''}
                ${numberPlayers === 8 ? cellP6 + cellP7 + cellP8 : ''}
                ${htmlPoints}
              </tr>`

    if (boxNumber === 1) {
      document.getElementById('box1').innerHTML += strHtml
    } else if (boxNumber === 2) {
      document.getElementById('box2').innerHTML += strHtml
    } else if (boxNumber === 3) {
      document.getElementById('box3').innerHTML += strHtml
    } else if (boxNumber === 4) {
      document.getElementById('box4').innerHTML += strHtml
    } else if (boxNumber === 5) {
      document.getElementById('box5').innerHTML += strHtml
    }
  }

  let options = {
    series: [
      {
        name: 'Actual',

        data: [
          {
            x: 'Box 1',
            y: matchesPlayedBox1,
            goals: [
              {
                name: 'Expected',
                value: 15,
                strokeWidth: 5,
                strokeHeight: 10,
                strokeColor: '#c85a19',
              },
            ],
          },
          {
            x: 'Box 2',
            y: matchesPlayedBox2,
            goals: [
              {
                name: 'Expected',
                value: 21,
                strokeWidth: 5,
                strokeHeight: 10,
                strokeColor: '#c85a19',
              },
            ],
          },
          {
            x: 'Box 3',
            y: matchesPlayedBox3,
            goals: [
              {
                name: 'Expected',
                value: 21,
                strokeWidth: 5,
                strokeHeight: 10,
                strokeColor: '#c85a19',
              },
            ],
          },
          {
            x: 'Box 4',
            y: matchesPlayedBox4,
            goals: [
              {
                name: 'Expected',
                value: 21,
                strokeWidth: 5,
                strokeHeight: 10,
                strokeColor: '#c85a19',
              },
            ],
          },
          {
            x: 'Box 5',
            y: matchesPlayedBox5,
            goals: [
              {
                name: 'Expected',
                value: 15,
                strokeWidth: 5,
                strokeHeight: 10,
                strokeColor: '#c85a19',
              },
            ],
          },
        ],
      },
    ],
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
    colors: ['#00503c', '#c85a19'],
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#00503c', '#c85a19'],
      },
    },
  }

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
          background: '#00503c',
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
            color: '#00503c',
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            color: '#00503c',
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
            color: '#c85a19',
            opacity: 1,
          },
          {
            offset: 20,
            color: '#c85a19',
            opacity: 0.8,
          },
          {
            offset: 40,
            color: '#c85a19',
            opacity: 0.6,
          },

          {
            offset: 60,
            color: '#c85a19',
            opacity: 0.4,
          },
          {
            offset: 80,
            color: '#c85a19',
            opacity: 0.2,
          },
          {
            offset: 100,
            color: '#c85a19',
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

  document.getElementById('numCountries').innerText = scores.main.numCountries
  document.getElementById('numPlayers').innerText = scores.main.numPlayers
  document.getElementById('totMatches').innerText = scores.main.totMatches
  document.getElementById('matchPlayed').innerText = parseFloat(
    scores.main.matchPlayed
  ).toFixed(0)

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
}
