import React, { useState , useEffect } from 'react';
import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';
import { Link } from 'react-router-dom';
import "./NavBar.css"
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav className="navbar w-full flex py-6 justify-between items-center navbar text-black" style={scrolled ? { height: '20px' , transition:"2s" } : {}}>
      <img src={logo} alt="Carthago credit scoring" className="w-[124px] h-[32px] flex" style={scrolled ? { display: 'none' } : {}}  />

      {/* Desktop navigation */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((el, index) => (
          <li key={el.id} className={`List ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}>
            <a href={`#${el.id}`} >
                  {el.title}
            </a>
          </li>          
        ))}
        <li key="Login" className={`Login`}>
            <Link to={`Login`} >
              Login
            </Link>
          </li>
      </ul>

      {/* Mobile navigation */}
      <div className="sm:hidden flex justify-end items-center">
        <img src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(prev => !prev)} />

        {/* Mobile menu */}
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((el, index) => (
              <li key={el.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}>
              <a href={`#${el.id}`} className="hover:text-gray-300">
                    {el.title}
              </a>
            </li>          
          ))}
          <li key="Login" className={`font-poppins font-normal cursor-pointer text-[16px]`}>
              <Link to={`Login`} className="hover:text-gray-300">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
