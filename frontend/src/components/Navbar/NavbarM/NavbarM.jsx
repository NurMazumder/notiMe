import React from "react";
import "./NavbarM.css";
import Container from "../../Container/Container";

const NavbarM = () => {
  return (
    <Container>
      <div id="menu" class="snipcss-FKjpQ">
        <div id="menu_left">
          <ul id="nav" class="js-color-pc-constant color-pc-constant">
            <li class="small">
              <a href="#" class="non-link">
                Anime
              </a>
            </li>
            <li class="small">
              <a href="#" class="non-link">
                Manga
              </a>
            </li>
            <li>
              <a href="#" class="non-link">
                Manhwa
              </a>
            </li>

            <li class="small">
              <a href="#" class="non-link">
                Novel
              </a>
            </li>

            <li class="smaller">
              <a href="#" class="non-link">
                Request
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default NavbarM;
