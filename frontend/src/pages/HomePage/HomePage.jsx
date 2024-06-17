import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <Container>
        <section className="home">
          <div className="dark-overlay">
            <div className="home-inner">
              <h1 className="x-large">NotiMe</h1>
              <p className="lead">
                NotiMe allows for avid readers of Manhwa, manga, and web novels.
                It addresses the common challenge faced by foreign readers who
                struggle to keep track of the latest releases, often scattered
                across various third-party sites. NotiMe provides a centralized
                platform where users can stay updated on the newest chapters,
                bookmark their favorite titles, and easily manage their reading
                lists. With NotiMe, you can ensure you never miss an update on
                your favorite stories again.
              </p>
              <div className="buttons">
                <Link to="/login" className="btn-login">
                  Login
                </Link>
                <Link to="/signup" className="btn-signup">
                  Sign Up
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
