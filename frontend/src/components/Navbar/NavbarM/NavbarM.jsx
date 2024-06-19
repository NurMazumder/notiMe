import React from "react";
import { Link } from "react-router-dom";
import "./NavbarM.css";
import Container from "../../Container/Container";

const NavbarM = () => {
  return (
    <Container>
      <div id="menu" className="snipcss-FKjpQ">
        <div id="menu_left">
          <ul id="nav" className="js-color-pc-constant color-pc-constant">
            <li className="small">
              <Link to="/anime" className="non-link">
                Anime
              </Link>
            </li>
            <li className="small">
              <Link to="/manga" className="non-link">
                Manga
              </Link>
            </li>
            <li>
              <Link to="/manhwa" className="non-link">
                Manhwa
              </Link>
            </li>
            <li className="small">
              <Link to="/novel" className="non-link">
                Novel
              </Link>
            </li>
            <li className="smaller">
              <Link to="/request" className="non-link">
                Request
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default NavbarM;
