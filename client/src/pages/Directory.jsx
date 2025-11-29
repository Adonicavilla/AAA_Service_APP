import React from 'react'
import { Link } from 'react-router-dom'

const BUSINESSES = [
  { id: 'paws-claws', name: 'Paws & Claws Pet Shop', type: 'Pet Shop', desc: 'Food, toys, and accessories.', location: '321 Pet Lane' },
  { id: 'manejkom', name: 'Manejkom Travel & Tours', type: 'Travel Agency', desc: 'Plan your dream vacation.', location: '555 Travel St' },
  { id: 'home-fix', name: 'Home Fix It Hardware', type: 'Hardware Store', desc: 'Tools and supplies for home projects.', location: '22 Tool Ave' }
]

export default function Directory(){
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Directory</h1>
        <p className="page-subtitle">Browse local businesses and services.</p>
      </div>

      <div className="card-grid">
        {BUSINESSES.map(b => (
          <div className="card" key={b.id}>
            <div className="card-image-container"><img src={`https://placehold.co/600x400.png`} alt={b.name} /></div>
            <div className="card-content">
              <h3 className="card-title">{b.name}</h3>
              <span className="badge outline">{b.type}</span>
              <p className="card-description">{b.desc}</p>
              <p className="card-location">{b.location}</p>
            </div>
            <div className="card-footer">
              <Link to={`/map?location=${b.id}`} className="button secondary full-width">View on Map</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
