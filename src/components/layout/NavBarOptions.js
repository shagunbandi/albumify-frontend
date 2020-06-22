import React from 'react';
import { Link } from 'react-router-dom';

function NavbarOptions() {
    return (

        <nav className="navbar navbar-expand-lg navbar-light justify-content-center bg-black">

            <Link className="navbar-brand nav-item" to="/photos">
                <button className="btn btn-dark">All Photos</button>
            </Link>

            <Link className="navbar-brand nav-item" to="/album">
                <button className="btn btn-dark">Albums</button>
            </Link>

            <Link className="navbar-brand nav-item" to="/">
                <button className="btn btn-dark">For You :)</button>
            </Link>

        </nav>
    );
}

export default NavbarOptions;
