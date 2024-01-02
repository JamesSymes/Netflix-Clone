import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>Made by James Symes. This is a non-profit project and not affiliated with Netflix.</p>
      <ul>
        <li><Link to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About</Link></li>
        <li><Link to="/contact"><FontAwesomeIcon icon={faEnvelope} /> Contact</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;


