// Initialize the map centered on Malolos, Bulacan, Philippines
const map = L.map("map").setView([14.8433, 120.8114], 13);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Add sample pins for delivery services
const sampleLocations = [
  { lat: 14.8433, lng: 120.8114, name: "Pizza Palace" },
  { lat: 14.85, lng: 120.82, name: "Sushi Central" },
  { lat: 14.84, lng: 120.8, name: "Quick Courier" },
];
sampleLocations.forEach((loc) => {
  L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.name).openPopup();
});

let routingControl = null;

// Function to show route between two points
function showRoute(start, end) {
  if (routingControl) {
    map.removeControl(routingControl);
  }
  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(start[0], start[1]), // User's location (Malolos City Hall)
      L.latLng(end[0], end[1]), // Destination
    ],
    routeWhileDragging: false,
    addWaypoints: false,
    lineOptions: {
      styles: [{ color: "#FF9999", weight: 4 }],
    },
  }).addTo(map);

  // Zoom to fit the route
  routingControl.on("routesfound", function (e) {
    const routes = e.routes;
    map.fitBounds(e.routes[0].coordinates);
  });
}

// Add click event for action buttons to show route
document.querySelectorAll(".action-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (e.target === this) {
      // Only trigger route if not clicking the link
      const lat = parseFloat(this.getAttribute("data-lat"));
      const lng = parseFloat(this.getAttribute("data-lng"));
      showRoute([14.8433, 120.8114], [lat, lng]);
    }
  });
});

// Smooth scroll for internal links
document.querySelectorAll(".navbar .nav-links a").forEach((anchor) => {
  if (anchor.getAttribute("href").startsWith("#")) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
      // Close burger menu on link click
      document.querySelector(".nav-links").classList.remove("active");
      document.querySelector(".burger").classList.remove("active");
    });
  }
});

// Burger menu toggle
document.querySelector(".burger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".burger").classList.toggle("active");
});

// Search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const globalSearch = document.getElementById("global-search");

function filterItems(query) {
  query = query.toLowerCase();
  document.querySelectorAll(".service-item").forEach((item) => {
    const keywords = item.getAttribute("data-keywords").toLowerCase();
    if (keywords.includes(query)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    filterItems(query);
  } else {
    document
      .querySelectorAll(".service-item")
      .forEach((item) => item.classList.remove("hidden"));
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  filterItems(query);
});

globalSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = globalSearch.value.trim();
    if (query) {
      filterItems(query);
    } else {
      document
        .querySelectorAll(".service-item")
        .forEach((item) => item.classList.remove("hidden"));
    }
    // Close burger menu on search
    document.querySelector(".nav-links").classList.remove("active");
    document.querySelector(".burger").classList.remove("active");
  }
});

globalSearch.addEventListener("input", () => {
  const query = globalSearch.value.trim();
  filterItems(query);
});
