import React from 'react'

const Navbar = (props) => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <a className="navbar-brand b" href="/"><h3>Expense Tracker</h3></a>
            </div>
            <div className={`form-check form-switch text-${props.mode === 'dark'? 'light': 'dark'}`}>
              <input className="form-check-input mx-1" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault"/>
              <label className="form-check-label mx-2" htmlFor="flexSwitchCheckDefault"></label>
            </div>
        </nav>
    )
}

export default Navbar
