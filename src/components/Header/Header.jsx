import React, { useState } from "react";

function Header() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const searchHandler = (e) => {
    e.preventDefault();
    fetch(`https://www.omdbapi.com/?s=${search}&apikey=e4d22da3`)
      .then((res) => res.json())
      .then((value) => setData(value.Search));
  };

  const download = (url) => {
    fetch(url)
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Movies</a>
          <form className="d-flex" role="search" onSubmit={searchHandler}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="row">
        {data.map((movie) => (
          <div className="col-md-3">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={movie.Poster}
                className="card-img-top"
                alt={movie.Title}
              />
              <div className="card-body">
                <h4 className="card-title">{movie.Title}</h4>
                <a
                  className="btn btn-primary"
                  onClick={() => download(movie.Poster)}
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
