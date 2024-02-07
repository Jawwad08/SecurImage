// import React, { useState } from 'react';
// import { Button } from './Button';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import Dropdown from './Dropdown';

// function Navbar() {
//   const [click, setClick] = useState(false);
//   const [dropdown, setDropdown] = useState(false);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const onMouseEnter = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(true);
//     }
//   };

//   const onMouseLeave = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(false);
//     }
//   };

//   return (
//     <>
//       <nav className='navbar'>
//         <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
//           EPIC
//           <i class='fab fa-firstdraft' />
//         </Link>
//         <div className='menu-icon' onClick={handleClick}>
//           <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>
//         <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//           <li className='nav-item'>
//             <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//               Home
//             </Link>
//           </li>
//           <li
//             className='nav-item'
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//           >
//             <Link
//               to='/services'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Services <i className='fas fa-caret-down' />
//             </Link>
//             {dropdown && <Dropdown />}
//           </li>
//           <li className='nav-item'>
//             <Link
//               to='/products'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Products
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link
//               to='/contact-us'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to='/sign-up'
//               className='nav-links-mobile'
//               onClick={closeMobileMenu}
//             >
//               Sign Up
//             </Link>
//           </li>
//         </ul>
//         <Button />
//       </nav>
//     </>
//   );
// }

// export default Navbar;
import { Link } from 'react-router-dom'
import { useLogout } from '../hook/useLogout'
import { useAuthContext } from '../hook/useAuthContext'

const NavBar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  
  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>SecurImage</h1>
        </Link>
        <nav>
        {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default NavBar