import React, { useState } from 'react'

export default function Auth(){
  const [tab, setTab] = useState('signin')

  return (
    <div className="container auth-page" style={{paddingTop:48,paddingBottom:48}}>
      <div className="auth-container">
        <div className="auth-header">
          <h1>Sign in to AlaServeX</h1>
          <p className="tagline">Fast, local services at your fingertips.</p>
        </div>

        <div className="auth-tabs">
          <button className={`tab-btn ${tab==='signin' ? 'active' : ''}`} onClick={() => setTab('signin')}>Sign In</button>
          <button className={`tab-btn ${tab==='signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
        </div>

        <form className={`auth-form ${tab==='signin' ? 'active' : ''}`} onSubmit={(e)=>{e.preventDefault(); alert('Signed in (demo)');}}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-input" type="email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-input" type="password" required />
          </div>
          <div style={{textAlign:'center'}}>
            <button type="submit" className="button primary">Sign In</button>
          </div>
        </form>

        <form className={`auth-form ${tab==='signup' ? 'active' : ''}`} onSubmit={(e)=>{e.preventDefault(); alert('Signed up (demo)');}}>
          <div className="form-group">
            <label>Full name</label>
            <input className="form-input" type="text" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-input" type="email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-input" type="password" required />
          </div>
          <div style={{textAlign:'center'}}>
            <button type="submit" className="button primary">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  )
}
