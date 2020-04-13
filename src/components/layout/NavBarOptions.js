import React from 'react';
import { Link } from 'react-router-dom';

function NavbarOptions() {
    return (

        <nav class="navbar navbar-expand-lg navbar-light justify-content-center grey-navbar">

            <Link className="navbar-brand nav-item" to="/photos">
                <button class="btn btn-light">All Photos</button>
            </Link>

            <Link className="navbar-brand nav-item" to="/album">
                <button class="btn btn-light">Albums</button>
            </Link>

            <Link className="navbar-brand nav-item" to="/">
                <button class="btn btn-light">For You :)</button>
            </Link>

        </nav>
    );
}

export default NavbarOptions;
