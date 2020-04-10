import React from "react";
import ErrorImg from "../../static/images/404.png";

const NotFoundPage = () => (
  <div>
    <section className="hero is-fullheight is-dark">
      <div
        className="hero-body has-text-centered"
        style={{ paddingTop: 0, alignItems: "flex-start" }}
      >
        <div className="container content">
          <h1 className="title" style={{ fontSize: 100, letterSpacing: 15 }}>
            404
          </h1>
          <div>
            <img src={ErrorImg} alt="404" />
          </div>
          <p className="title">
            You just hit a route that doesn&#39;t exist... the sadness.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default NotFoundPage;
