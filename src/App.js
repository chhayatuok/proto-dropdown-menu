import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';


import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SettingsIcon from '@material-ui/icons/Settings';

// Functional component
function App() {
  return (
    <div>
      <Navbar>
        <NavItem icon={<AddIcon />} />
        <NavItem icon={<NotificationsIcon />} />
        <NavItem icon={<MailIcon />} />

        <NavItem icon={<KeyboardArrowUpIcon />}>
          <DropdownMenu />
        </NavItem>
      </Navbar>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> { props.children } </ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{height: menuHeight}} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem
              leftIcon={<SettingsIcon />}
              rightIcon={<ChevronRightIcon />}
              goToMenu="settings"
            >
              Settings
            </DropdownItem>
          </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem leftIcon={<ChevronLeftIcon />} goToMenu="main" />
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings2</DropdownItem>
            <DropdownItem>Settings3</DropdownItem>
            <DropdownItem>Settings4</DropdownItem>
            <DropdownItem>Settings5</DropdownItem>
            <DropdownItem>Settings6</DropdownItem>
          </div>
      </CSSTransition>
    </div>
  );
}

export default App;
