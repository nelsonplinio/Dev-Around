import React, { useState, useEffect } from "react";

import "./styles.css";

function DevForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [techs, setTechs] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 3000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      username,
      password,
      techs,
      latitude,
      longitude,
      useGithubInfo: true
    });

    setUsername("");
    setPassword("");
    setTechs("");
  }

  return (
    <form>
      <div className="input-block">
        <label htmlFor="username">Usuário</label>
        <input
          name="username"
          id="username"
          value={username}
          required
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="password">Senha</label>
        <input
          name="password"
          id="password"
          value={password}
          type="password"
          required
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Techs</label>
        <input
          name="techs"
          id="techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longetude">Longetude</label>
          <input
            type="number"
            name="longetude"
            id="longetude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" onClick={handleSubmit}>
        Cadastrar
      </button>
    </form>
  );
}

export default DevForm;
