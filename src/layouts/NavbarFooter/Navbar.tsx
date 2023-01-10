import { useOktaAuth } from "@okta/okta-react"
import { Link, NavLink } from "react-router-dom"
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {

  const { oktaAuth, authState } = useOktaAuth();
  if (!authState) {
    <SpinnerLoading />
  }

  const handleLogout = async () => { oktaAuth.signOut() };



  return (<nav className='navbar navbar-expand-lg navbar-dark main-color py-2'>
    <div className='container-fluid '>
      <span className='navbar-brand'>Library</span>
      <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavdropdown' aria-controls='navbarNavdropdown' aria-expanded='false' area-label='Toggle Navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavdropdown'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to="/home">Home</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to="/search">Search books</NavLink>
          </li>

        </ul>
        <ul className='navbar-nav ms-auto'>
          <li className='nav-item m-1'>
            {authState?.isAuthenticated ?
              <button type='button' className='btn btn-outline-light' onClick={() => handleLogout()} >Logout</button>

              :
              <Link type='button' className='btn btn-outline-light' to={"/login"}>Sign In</Link>
            }
          </li>
        </ul>
      </div>
    </div>
  </nav>)
}