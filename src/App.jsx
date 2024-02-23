import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Form />
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <h1>Welcome to APIQR</h1>
      <h3>Your QR Code Generator</h3>
    </div>
  );
}

function Header() {
  function createQrLink(e) {
    e.preventDefault();
  }

  return (
    <header className="header">
      <a href="/">
        <img src="/logo.png" alt="Website logo" />
      </a>
      <nav>
        <a href="#" onClick={createQrLink}>
          Create QR Code
        </a>
        <a href="#">Contact Us</a>
      </nav>
    </header>
  );
}

function Form() {
  const [url, setUrl] = useState("");
  return (
    <div className="form-container">
      <form>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Place your text here.."
        />
      </form>
      <img src="/logo.png" alt="generated OR Code" />
    </div>
  );
}
