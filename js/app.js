/* Template Name: Landrick - Saas & Software Landing Page Template
   Author: Shreethemes
   E-mail: support@shreethemes.in
   Created: August 2019
   Version: 3.2.0
   Updated: April 2021
   File Description: Main JS file of the template
*/

/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Loader               *
 *     02.  Toggle Menus         *
 *     03.  Active Menu          *
 *     04.  Clickable Menu       *
 *     05.  Back to top          *
 *     06.  Feather icon         *
 *     06.  DD Menu              *
 *     06.  Active Sidebar Menu  *
 ================================*/

window.addEventListener('load', fn, false)

//  window.onload = function loader() {
function fn() {
  // Preloader
  if (document.getElementById('preloader')) {
    setTimeout(() => {
      document.getElementById('preloader').style.visibility = 'hidden'
      document.getElementById('preloader').style.opacity = '0'
    }, 350)
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
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
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
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
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
  var current = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )
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
  center: [38.779015, 8.99628], // starting position [lng, lat]
  zoom: 12, // starting zoom
})

var geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [38.768564, 9.009075],
      },
      properties: {
        title: 'Greek Club',
        description:
          '3 clay courts. Restaurant, <strong>beer</strong> and coffee. <br>Coordinates: 9.009075, 38.768564',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [38.765493, 9.018302],
      },
      properties: {
        title: 'Hilton Hotel',
        description: '4 clay courts.<br>Coordinates: 9.018302, 38.765493',
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
          '<h4>' +
            marker.properties.title +
            '</h4><p>' +
            marker.properties.description +
            '</p>'
        )
    )
    .addTo(map)
})
