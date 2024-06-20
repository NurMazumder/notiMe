import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";

const HomePage = () => {
  return (
    <>
      <Container>
        <section className="home">
          <div className="dark-overlay">
            <div className="home-inner">
              <h1 className="x-large">Request</h1>
              <p className="lead">
                Want to request any new sites to scrape? Email us the website
              </p>
              <div className="buttons">
                <Link to="/demo" className="btn-demo">
                  Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default HomePage;
