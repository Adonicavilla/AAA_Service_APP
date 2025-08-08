document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        const map = L.map('map').setView([14.8433, 120.8114], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const sampleLocations = [
            { lat: 14.8433, lng: 120.8114, name: 'Pizza Palace', category: 'Restaurant' },
            { lat: 14.8500, lng: 120.8200, name: 'Paws & Claws Pet Shop', category: 'Pet Shop' },
            { lat: 14.8400, lng: 120.8000, name: 'Manejkom Travel & Tours', category: 'Travel Agency' },
            { lat: 14.8350, lng: 120.8150, name: 'Home Fix It Hardware', category: 'Hardware' },
            { lat: 14.8480, lng: 120.8050, name: 'Green Leaf Florist', category: 'Florist' },
            { lat: 14.8443, lng: 120.8124, name: 'Burger Barn', category: 'Restaurant' }
        ];

        let markers = [];

        function addPins(locations) {
            // Clear existing markers
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];

            locations.forEach(loc => {
                const marker = L.marker([loc.lat, loc.lng]).addTo(map)
                    .bindPopup(`<b>${loc.name}</b><br>${loc.category}`);
                markers.push(marker);
            });
        }
        
        // Initially display all pins
        addPins(sampleLocations);

        const searchInput = document.getElementById('map-search-input');
        const searchButton = document.getElementById('map-search-button');

        function handleSearch() {
            const query = searchInput.value.toLowerCase();
            if (!query) {
                addPins(sampleLocations); // Show all if query is empty
                return;
            }
            const filteredLocations = sampleLocations.filter(loc => 
                loc.name.toLowerCase().includes(query) || 
                loc.category.toLowerCase().includes(query)
            );
            addPins(filteredLocations);
        }

        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });
    }
});
