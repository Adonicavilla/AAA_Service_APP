document.addEventListener('DOMContentLoaded', function() {
    
    //======== GLOBAL ===========
    lucide.createIcons();


    //======== MAP ===========
    const mapPage = document.getElementById('map-page');
    if (mapPage) {
        const MALOLOS_CENTER = [14.8433, 120.8114];
        const map = L.map('map').setView(MALOLOS_CENTER, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const locations = [
            { lat: 14.8433, lng: 120.8114, name: 'Sample Restaurant', category: 'Restaurant' },
            { lat: 14.8500, lng: 120.8200, name: 'Sample Pet Shop', category: 'Pet Shop' },
            { lat: 14.8400, lng: 120.8000, name: 'Sample Travel Agency', category: 'Travel Agency' },
            { lat: 14.855, lng: 120.815, name: 'Another Restaurant', category: 'Restaurant' },
        ];
        
        let markers = [];

        const displayMarkers = (filter = '') => {
            // Clear existing markers
            markers.forEach(marker => map.removeLayer(marker));
            markers = [];

            const filteredLocations = locations.filter(loc => 
                loc.name.toLowerCase().includes(filter.toLowerCase()) || 
                loc.category.toLowerCase().includes(filter.toLowerCase())
            );

            filteredLocations.forEach(loc => {
                const marker = L.marker([loc.lat, loc.lng]).addTo(map)
                    .bindPopup(`<b>${loc.name}</b><br>${loc.category}`);
                markers.push(marker);
            });
        };

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
        
        // Initially display all markers
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
