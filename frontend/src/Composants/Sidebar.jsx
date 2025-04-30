import { NavLink,useLocation } from 'react-router-dom';
import '../style.css';
import LogoLattonForum from '../assets/LogoLattonForum.jpg';
import { IoHome, IoChatbubbles, IoChatboxEllipsesSharp, IoLibrary, IoLockClosedSharp, IoExitSharp } from "react-icons/io5";


function Sidebar() {
  const location = useLocation();
  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink to="/" className="logo-link">
            <img src={LogoLattonForum} alt="Logo Latton Forum" className="logo" />
          </NavLink>
        </li>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <NavLink to="/">
            <span className="icon"><IoHome size={30} /></span>
            <span className="title">Dashboard</span>
          </NavLink>
        </li>
        <li className={location.pathname === '/forum' ? 'active' : ''}>
          <NavLink to="/forum">
            <span className="icon"><IoChatbubbles size={30} /></span>
            <span className="title">Forum de discussion</span>
          </NavLink>
        </li>
        <li className={location.pathname === '/mes-questions' ? 'active' : ''}>
          <NavLink to="/mes-questions">
            <span className="icon"><IoChatboxEllipsesSharp size={30} /></span>
            <span className="title">Mes Questions</span>
          </NavLink>
        </li>
        <li className={location.pathname === '/support' ? 'active' : ''}>
          <NavLink to="/support">
            <span className="icon"><IoLibrary size={30} /></span>
            <span className="title">Supports de Cours</span>
          </NavLink>
        </li>
        <li className={location.pathname === '/compte' ? 'active' : ''}>
          <NavLink to="/compte">
            <span className="icon"><IoLockClosedSharp size={30} /></span>
            <span className="title">Compte</span>
          </NavLink>
        </li>
        <li className={location.pathname === '/logout' ? 'active' : ''}>
          <NavLink to="/logout">
            <span className="icon"><IoExitSharp size={30} /></span>
            <span className="title">Déconnexion</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
