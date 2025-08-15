document.addEventListener('DOMContentLoaded', function() {
    
    //======== GLOBAL ===========
    lucide.createIcons();

    //======== LOCATION DATABASE ===========
    const locationDatabase = {
        'pizza-palace': {
            name: 'Pizza Palace',
            lat: 14.8433,
            lng: 120.8114,
            address: '123 Main St, Downtown',
            category: 'Italian Restaurant',
            description: 'Authentic Italian pizza and pasta'
        },
        'sushi-central': {
            name: 'Sushi Central',
            lat: 14.8500,
            lng: 120.8200,
            address: '456 Ocean Ave, Waterfront',
            category: 'Japanese Restaurant',
            description: 'Fresh sushi and Japanese cuisine'
        },
        'burger-barn': {
            name: 'Burger Barn',
            lat: 14.8400,
            lng: 120.8050,
            address: '789 Park Blvd, Midtown',
            category: 'American Restaurant',
            description: 'Classic burgers and American fare'
        },
        'paws-claws': {
            name: 'Paws & Claws Pet Shop',
            lat: 14.8450,
            lng: 120.8050,
            address: '321 Pet Lane, Shopping District',
            category: 'Pet Shop',
            description: 'Your one-stop shop for all pet needs'
        },
        'manejkom-travel': {
            name: 'Manejkom Travel & Tours',
            lat: 14.8520,
            lng: 120.8180,
            address: '555 Travel St, Business Center',
            category: 'Travel Agency',
            description: 'Plan your dream vacation with expert travel agents'
        },
        'home-fix-it': {
            name: 'Home Fix It Hardware',
            lat: 14.8380,
            lng: 120.8080,
            address: '777 Hardware Ave, Industrial District',
            category: 'Hardware Store',
            description: 'Tools and supplies for home improvement projects'
        }
    };

    //======== MAP ===========
    const mapPage = document.getElementById('map-page');
    if (mapPage) {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const selectedLocation = urlParams.get('location');
        
        // Determine map center and locations to show
        let mapCenter, locationsToShow;
        
        if (selectedLocation && locationDatabase[selectedLocation]) {
            // Single location mode
            const loc = locationDatabase[selectedLocation];
            mapCenter = [loc.lat, loc.lng];
            locationsToShow = [loc];
        } else {
            // All locations mode (default)
            const MALOLOS_CENTER = [14.8433, 120.8114];
            mapCenter = MALOLOS_CENTER;
            locationsToShow = Object.values(locationDatabase);
        }
        
        // Initialize map
        const map = L.map('map').setView(mapCenter, selectedLocation ? 16 : 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Display markers
        const displayMarkers = (filter = '') => {
            // Clear existing markers
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            const filteredLocations = locationsToShow.filter(loc => 
                loc.name.toLowerCase().includes(filter.toLowerCase()) || 
                loc.category.toLowerCase().includes(filter.toLowerCase())
            );

            filteredLocations.forEach(loc => {
                const marker = L.marker([loc.lat, loc.lng]).addTo(map)
                    .bindPopup(`
                        <div style="min-width: 200px;">
                            <h3 style="margin: 0 0 8px 0; color: #2563eb;">${loc.name}</h3>
                            <p style="margin: 4px 0;"><strong>Category:</strong> ${loc.category}</p>
                            <p style="margin: 4px 0;"><strong>Address:</strong> ${loc.address}</p>
                            <p style="margin: 4px 0;">${loc.description}</p>
                        </div>
                    `);
                
                // Open popup immediately if single location mode
                if (selectedLocation) {
                    marker.openPopup();
                }
            });
        };

        // Search functionality (only show if in all locations mode)
        if (!selectedLocation) {
            const searchButton = document.getElementById('map-search-button');
            const searchInput = document.getElementById('map-search-input');
            
            searchButton.addEventListener('click', () => {
                displayMarkers(searchInput.value);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    displayMarkers(searchInput.value);
                }
            });
        } else {
            // Hide search bar for single location view
            const searchContainer = document.querySelector('.map-search-bar');
            if (searchContainer) {
                searchContainer.style.display = 'none';
            }
            
            // Update page title for single location
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle && locationDatabase[selectedLocation]) {
                pageTitle.textContent = `${locationDatabase[selectedLocation].name} - Location`;
            }
        }
        
        // Display markers
        displayMarkers();
    }

    //======== ACCOUNT ===========
    const accountPage = document.getElementById('account-page');
    if (accountPage) {
        const profileForm = document.getElementById('profile-form');
        const editButton = document.getElementById('edit-profile-btn');
        const cancelButton = document.getElementById('cancel-edit-btn');
        const nameInput = document.getElementById('profile-name');
        const emailInput = document.getElementById('profile-email');
        const formActions = profileForm.querySelector('.form-actions');

        const mockOrders = [
            { id: '123', title: 'Pizza from Pizza Palace', date: '2024-07-20', status: 'Delivered' },
            { id: '124', title: 'Pet Food from Paws & Claws', date: '2024-07-18', status: 'Delivered' },
            { id: '125', title: 'Sushi from Sushi Central', date: '2024-07-15', status: 'Cancelled' },
        ];

        const orderHistoryList = document.getElementById('order-history-list');

        const loadProfile = () => {
            const profile = JSON.parse(localStorage.getItem('userProfile')) || { name: 'John Doe', email: 'john.doe@example.com' };
            nameInput.value = profile.name;
            emailInput.value = profile.email;
        };
        
        const populateOrderHistory = () => {
            orderHistoryList.innerHTML = ''; // Clear list
            if (mockOrders.length === 0) {
                 orderHistoryList.innerHTML = '<li>No recent orders.</li>';
                 return;
            }
            mockOrders.forEach(order => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="order-item-details">
                        <span class="order-item-title">${order.title}</span>
                        <span class="order-item-date">${order.date}</span>
                    </div>
                    <span class="order-item-status">${order.status}</span>
                `;
                orderHistoryList.appendChild(li);
            });
        };
        
        const toggleEditMode = (isEditing) => {
            nameInput.disabled = !isEditing;
            emailInput.disabled = !isEditing;
            if (isEditing) {
                formActions.classList.remove('hidden');
                editButton.classList.add('hidden');
            } else {
                formActions.classList.add('hidden');
                editButton.classList.remove('hidden');
            }
        };

        editButton.addEventListener('click', () => {
            toggleEditMode(true);
        });

        cancelButton.addEventListener('click', () => {
            loadProfile(); // Reset to saved values
            toggleEditMode(false);
        });

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedProfile = {
                name: nameInput.value,
                email: emailInput.value,
            };
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            alert('Profile updated successfully!');
            toggleEditMode(false);
        });

        // Initial setup
        loadProfile();
        populateOrderHistory();
    }

});
