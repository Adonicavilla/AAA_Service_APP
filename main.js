document.addEventListener('DOMContentLoaded', function() {
    
    //======== GLOBAL ===========
    lucide.createIcons();

    //======== SEARCH FUNCTIONALITY ===========
    const homePage = document.getElementById('home-page');
    if (homePage) {
        initializeSearch();
    }

    function initializeSearch() {
        const searchInput = document.querySelector('.hero-search .search-input');
        const searchButton = document.querySelector('.hero-search .button.primary');
        
        if (!searchInput || !searchButton) return;

        let allSearchableItems = [];
        
        // Collect all searchable items
        function collectSearchableItems() {
            allSearchableItems = [];
            
            // Get all cards from featured sections
            const cards = document.querySelectorAll('.featured-section .card');
            cards.forEach(card => {
                if (card.classList.contains('view-more-card') || card.closest('.card-link')) return;
                
                const title = card.querySelector('.card-title')?.textContent || '';
                const description = card.querySelector('.card-description')?.textContent || '';
                const category = card.querySelector('.badge')?.textContent || '';
                const location = card.querySelector('.card-location')?.textContent || '';
                
                allSearchableItems.push({
                    element: card,
                    title: title.trim(),
                    description: description.trim(),
                    category: category.trim(),
                    location: location.trim(),
                    searchText: `${title} ${description} ${category} ${location}`.toLowerCase()
                });
            });
        }

        // Perform search
        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (!searchTerm) {
                showAllItems();
                return;
            }

            const matchingItems = allSearchableItems.filter(item => 
                item.searchText.includes(searchTerm)
            );

            displaySearchResults(matchingItems, searchTerm);
        }

        // Display search results
        function displaySearchResults(items, searchTerm) {
            // Hide all items first
            allSearchableItems.forEach(item => {
                item.element.style.display = 'none';
            });

            // Show matching items
            items.forEach(item => {
                item.element.style.display = 'block';
                highlightSearchTerm(item.element, searchTerm);
            });

            // Update section headers with result count
            updateSectionHeaders(items.length);
            
            // Show no results message if needed
            showNoResultsMessage(items.length === 0, searchTerm);
        }

        // Highlight search terms
        function highlightSearchTerm(element, searchTerm) {
            const textElements = element.querySelectorAll('.card-title, .card-description, .card-location');
            textElements.forEach(el => {
                const text = el.textContent;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                const highlightedText = text.replace(regex, '<mark class="search-highlight" style="background-color: #fef3c7; padding: 0.1rem 0.2rem;">$1</mark>');
                el.innerHTML = highlightedText;
            });
        }

        // Show all items
        function showAllItems() {
            allSearchableItems.forEach(item => {
                item.element.style.display = 'block';
                // Remove highlights
                const highlights = item.element.querySelectorAll('.search-highlight');
                highlights.forEach(highlight => {
                    const parent = highlight.parentNode;
                    parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                    parent.normalize();
                });
            });

            // Reset section headers
            resetSectionHeaders();
            
            // Remove no results message
            const noResults = document.querySelector('.no-search-results');
            if (noResults) noResults.remove();
        }

        // Update section headers
        function updateSectionHeaders(resultCount) {
            const sectionTitles = document.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                const originalText = title.textContent.split(' (')[0];
                title.textContent = `${originalText} (${resultCount} results)`;
            });
        }

        // Reset section headers
        function resetSectionHeaders() {
            const sectionTitles = document.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                const originalText = title.textContent.split(' (')[0];
                title.textContent = originalText;
            });
        }

        // Show no results message
        function showNoResultsMessage(show, searchTerm) {
            let noResults = document.querySelector('.no-search-results');
            
            if (show && !noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-search-results';
                noResults.innerHTML = `
                    <div class="text-center" style="padding: 2rem; margin: 2rem 0;">
                        <i data-lucide="search-x" style="font-size: 3rem; color: #9ca3af; margin-bottom: 1rem;"></i>
                        <h3 style="margin-bottom: 0.5rem;">No results found</h3>
                        <p style="color: #6b7280; margin-bottom: 1rem;">No items found matching "${searchTerm}"</p>
                        <button class="button secondary" onclick="clearSearch()">Show All</button>
                    </div>
                `;
                
                const main = document.querySelector('main');
                if (main) {
                    main.appendChild(noResults);
                    lucide.createIcons();
                }
            } else if (!show && noResults) {
                noResults.remove();
            }
        }

        // Clear search
        window.clearSearch = function() {
            searchInput.value = '';
            showAllItems();
        };

        // Initialize
        collectSearchableItems();
        
        // Add event listeners
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // Add clear button to search input
        const clearButton = document.createElement('button');
        clearButton.innerHTML = '<i data-lucide="x"></i>';
        clearButton.style.cssText = `
            position: absolute;
            right: 120px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: #6b7280;
            padding: 0.5rem;
            display: none;
        `;

        const searchContainer = document.querySelector('.hero-search');
        if (searchContainer) {
            searchContainer.style.position = 'relative';
            searchContainer.appendChild(clearButton);
            lucide.createIcons();

            clearButton.addEventListener('click', window.clearSearch);
            
            // Show/hide clear button
            searchInput.addEventListener('input', (e) => {
                clearButton.style.display = e.target.value ? 'block' : 'none';
            });
        }
    }

    //======== AUTHENTICATION PAGE ===========
    // Check if we're on the auth page
    const authPage = document.querySelector('.auth-page');
    if (authPage) {
        
        // Tab switching functionality
        window.showTab = function(tabName) {
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected form
            document.getElementById(`${tabName}-form`).classList.add('active');
            
            // Add active class to selected tab
            event.target.classList.add('active');
        };

        // Driver fields toggle based on user type
        const userTypeSelect = document.getElementById('signup-user-type');
        const driverFields = document.getElementById('driver-fields');
        
        if (userTypeSelect && driverFields) {
            userTypeSelect.addEventListener('change', function() {
                if (this.value === 'driver') {
                    driverFields.style.display = 'block';
                    // Make driver fields required
                    document.getElementById('license-number').required = true;
                    document.getElementById('vehicle-type').required = true;
                    document.getElementById('vehicle-model').required = true;
                } else {
                    driverFields.style.display = 'none';
                    // Remove required attribute
                    document.getElementById('license-number').required = false;
                    document.getElementById('vehicle-type').required = false;
                    document.getElementById('vehicle-model').required = false;
                }
            });
        }

        // Form submission handlers
        const signinForm = document.getElementById('signin-form');
        const signupForm = document.getElementById('signup-form');

        if (signinForm) {
            signinForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('signin-email').value;
                const password = document.getElementById('signin-password').value;
                
                // Basic validation
                if (!email || !password) {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Mock authentication - in real app, this would be an API call
                console.log('Sign in attempt:', { email, password });
                
                // Simulate successful login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                // Redirect to home page
                window.location.href = 'index.html';
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const fullName = document.getElementById('signup-fullname').value;
                const phone = document.getElementById('signup-phone').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const userType = document.getElementById('signup-user-type').value;
                
                // Additional fields for drivers
                let driverData = null;
                if (userType === 'driver') {
                    driverData = {
                        licenseNumber: document.getElementById('license-number').value,
                        vehicleType: document.getElementById('vehicle-type').value,
                        vehicleModel: document.getElementById('vehicle-model').value
                    };
                    
                    // Validate driver fields
                    if (!driverData.licenseNumber || !driverData.vehicleType || !driverData.vehicleModel) {
                        alert('Please fill in all driver-specific fields');
                        return;
                    }
                }
                
                // Basic validation
                if (!fullName || !phone || !email || !password) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // Password validation (minimum 6 characters)
                if (password.length < 6) {
                    alert('Password must be at least 6 characters long');
                    return;
                }
                
                // Mock registration - in real app, this would be an API call
                const userData = {
                    fullName,
                    phone,
                    email,
                    userType,
                    driverData
                };
                
                console.log('Registration data:', userData);
                
                // Store user data (in real app, this would be handled by backend)
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Auto-login after registration
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                // Redirect to home page
                window.location.href = 'index.html';
            });
        }

        // Forgot password link
        const forgotPasswordLink = document.querySelector('#signin-form .button-link');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Password reset functionality would be implemented here');
            });
        }
    }
    

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
