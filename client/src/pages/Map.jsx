import React from 'react'

export default function Map(){
  return (
    <div id="map-page" className="container">
      <div className="page-header">
        <h1 className="page-title">Map</h1>
        <p className="page-subtitle">Find businesses and delivery locations near you.</p>
      </div>

      <div className="map-container-wrapper">
        <div className="map-search-bar">
          <input className="search-input" placeholder="Search location or business" />
          <button className="button">Search</button>
        </div>
        <div id="map" style={{height:400,background:'#eef2f7',borderRadius:8}}>
          <p style={{padding:16}}>Map placeholder — integrate a map library (Leaflet/Mapbox) in future.</p>
        </div>
      </div>
    </div>
  )
}
