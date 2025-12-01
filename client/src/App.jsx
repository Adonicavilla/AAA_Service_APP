import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Delivery from './pages/Delivery'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Directory from './pages/Directory'
import Map from './pages/Map'
import Auth from './pages/Auth'
import './index.css'
import Modal from './components/Modal'

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const previouslyFocused = useRef(null)

  const closeMobile = () => setMobileOpen(false)

  return (
    <Router>
      <div>
        <header className="header">
          <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <NavLink to="/" className="logo" onClick={closeMobile}>AlaServeX</NavLink>

            <button className="mobile-menu-toggle" aria-label="Toggle menu" onClick={() => setMobileOpen(v => !v)}>
              ☰
            </button>

            <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
              <NavLink to="/" onClick={closeMobile} className={({isActive}) => isActive ? 'active-link' : ''}>Home</NavLink>
              <NavLink to="/directory" onClick={closeMobile} className={({isActive}) => isActive ? 'active-link' : ''}>Directory</NavLink>
              <NavLink to="/map" onClick={closeMobile} className={({isActive}) => isActive ? 'active-link' : ''}>Map</NavLink>
              <NavLink to="/delivery" onClick={closeMobile} className={({isActive}) => isActive ? 'active-link' : ''}>Delivery</NavLink>
              <NavLink to="/account" onClick={closeMobile} className={({isActive}) => isActive ? 'active-link' : ''}>Account</NavLink>
              <button className="button danger" onClick={() => {
                previouslyFocused.current = document.activeElement
                setLogoutOpen(true)
                setMobileOpen(false)
              }}>Log Out</button>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/delivery" element={<Delivery />} />
              <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/map" element={<Map />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>

        <Modal open={logoutOpen} onClose={() => setLogoutOpen(false)} title="Confirm Logout" description="Are you sure you want to log out?">
          <Modal.Actions>
            <button className="button" onClick={() => { announce('Logout cancelled'); setLogoutOpen(false); try{ previouslyFocused.current?.focus() }catch(e){} }}>Cancel</button>
            <button className="button primary" onClick={() => {
              localStorage.removeItem('userData')
              localStorage.removeItem('userSettings')
              announce('Logged out')
              setLogoutOpen(false)
              setTimeout(() => { window.location.href = '/'; }, 600)
            }}>Log Out</button>
          </Modal.Actions>
        </Modal>
      </div>
    </Router>
  )
}

  function announce(message){
    const el = document.getElementById('aria-live')
    if(el){ el.textContent = ''; setTimeout(() => el.textContent = message, 50) }
    else { try{ window.alert(message) }catch(e){} }
  }

  // removed custom focus trap; Modal component handles trapping & focus restore
