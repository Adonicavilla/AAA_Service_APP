import React from 'react'
import { Link } from 'react-router-dom'
import { BUSINESSES } from '../data/menus'

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
              {b.products && (
                <div style={{marginTop:8}}>
                  <div style={{fontSize:'0.9rem',fontWeight:600,marginBottom:6}}>Products</div>
                  {b.products.slice(0,3).map(p => (
                    <div key={p.id} style={{display:'flex',justifyContent:'space-between',fontSize:'0.9rem'}}>
                      <div>{p.name}</div>
                      <div style={{color:'#444'}}>${p.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
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
