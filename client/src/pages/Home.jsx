import React from 'react'
import { Link } from 'react-router-dom'

const RESTAURANTS = [
  { id: 'pizza-palace', name: 'Pizza Palace', eta: '25-35 min', price: '$$', rating: 4.5, location: '123 Main St, Downtown' },
  { id: 'sushi-central', name: 'Sushi Central', eta: '30-40 min', price: '$$$', rating: 4.8, location: '456 Ocean Ave, Waterfront' },
  { id: 'burger-barn', name: 'Burger Barn', eta: '20-30 min', price: '$', rating: 4.2, location: '789 Park Blvd, Midtown' }
]

const SERVICES = [
  { id: 'paws-claws', name: 'Paws & Claws Pet Shop', type: 'Pet Shop', location: '321 Pet Lane' },
  { id: 'manejkom', name: 'Manejkom Travel & Tours', type: 'Travel Agency', location: '555 Travel St' },
  { id: 'home-fix', name: 'Home Fix It Hardware', type: 'Hardware Store', location: '22 Tool Ave' }
]

export default function Home(){
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Welcome to AlaServeX</h1>
          <p className="hero-subtitle">Your one-stop platform for food delivery, local business discovery, and more.</p>
          <div className="hero-search">
            <input type="search" placeholder="Search for services or businesses..." className="search-input large" />
            <button className="button primary large"><span>Search</span></button>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Restaurants</h2>
            <Link to="/delivery" className="button-link">View All Restaurants →</Link>
          </div>

          <div className="card-grid">
            {RESTAURANTS.map(r => (
              <div className="card" key={r.id}>
                <div className="card-image-container"><img src={`https://placehold.co/600x400.png`} alt={r.name} /></div>
                <div className="card-content">
                  <h3 className="card-title">{r.name}</h3>
                  <span className="badge outline">{r.eta} · {r.price}</span>
                  <p className="card-description">Rating: {r.rating}</p>
                  <p className="card-location">{r.location}</p>
                </div>
                <div className="card-footer">
                  <Link to={`/delivery?restaurant=${r.id}`} className="button primary full-width">Order Now</Link>
                  <Link to={`/map?location=${r.id}`} className="button secondary full-width">View on Map</Link>
                </div>
              </div>
            ))}

            <Link to="/delivery" className="card-link">
              <div className="card view-more-card">
                <span className="view-more-icon">🍽️</span>
                <span className="view-more-text">Explore More Food</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Services</h2>
            <Link to="/directory" className="button-link">Browse Directory →</Link>
          </div>

          <div className="card-grid">
            {SERVICES.map(s => (
              <div className="card" key={s.id}>
                <div className="card-image-container"><img src={`https://placehold.co/600x400.png`} alt={s.name} /></div>
                <div className="card-content">
                  <h3 className="card-title">{s.name}</h3>
                  <span className="badge outline">{s.type}</span>
                  <p className="card-description">{s.type} — {s.location}</p>
                </div>
                <div className="card-footer">
                  <Link to={`/directory`} className="button secondary full-width">Visit Page</Link>
                </div>
              </div>
            ))}

            <Link to="/directory" className="card-link">
              <div className="card view-more-card">
                <span className="view-more-icon">🛍️</span>
                <span className="view-more-text">Discover Businesses</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
