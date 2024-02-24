import { useState } from "react";
import QRCode from "react-qr-code";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Form />
      <Contact />
      <Footer />
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
  return (
    <header className="header">
      <a href="/">
        <img src="/logo.png" alt="Website logo" />
      </a>
    </header>
  );
}

function Form() {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("/site.png");

  async function handleForm(e) {
    e.preventDefault();
    if (!url) return;
    const response = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=${url}`
    );
    const blob = await response.blob();
    const src = URL.createObjectURL(blob);
    setQr(src);
  }

  function handleQrDownload() {
    const qrDataUrl = qr;

    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "qr.png";
    link.click();
    URL.revokeObjectURL(qrDataUrl);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleForm}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Place your link here.."
        />
      </form>
      <img src={qr} className="qr" alt="Qr Code generated" />
      <button className="download-qr-btn" onClick={handleQrDownload}>
        Download
      </button>
    </div>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isText, setIsText] = useState(true);
  const [contactRes, SetContactRes] = useState("");

  async function handleContact(e) {
    e.preventDefault();
    if (!name || !message || !email) return;

    const query = {
      name,
      email,
      message,
      from: "APIQR",
    };
    setIsText(false);
    let response = await fetch(
      `https://developerjaskaran.cyclic.app/api/v1/contact/add`,
      {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    SetContactRes(data.message);
    setTimeout(() => {
      SetContactRes("");
    }, 3000);
    setIsText(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleContact} className="contact-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name here.."
          value={name}
          onChange={(el) => setName(el.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email here.."
          value={email}
          onChange={(el) => setEmail(el.target.value)}
        />
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          rows="5"
          placeholder="Enter message here"
          value={message}
          onChange={(el) => setMessage(el.target.value)}
        ></textarea>
        <button>
          {isText ? (
            "Submit"
          ) : (
            <img src="/loading.svg" alt="No loader found" className="loading" />
          )}
        </button>
        <p className={isText ? "contact-msg" : "contact-msg active"}>
          {contactRes}
        </p>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <h2>APIQR</h2>
      <p className="stay-touch">
        <span>Stay in touch</span>
        <span>
          <a
            href="mailto:dhillonjaskaran4486@gmail.com?subject=Hi!%20Jaskaran"
            target="_blank"
          >
            <img src="/gmail.png" alt="Gmail Icon" />
          </a>
          <a
            href="https://www.facebook.com/jaskaransingh.dhillon.712"
            target="_blank"
          >
            <img src="/facebook.png" alt="Facebook Icon" />
          </a>
          <a href="https://github.com/karanjas39" target="_blank">
            <img src="/github.png" alt="Github Icon" />
          </a>
          <a href="https://www.linkedin.com/in/singhjaskaran/" target="_blank">
            <img src="/linkedin.png" alt="LinkedIn Icon" />
          </a>
        </span>
      </p>
      <p>
        Copyright &copy; {new Date().getFullYear()}| Developed and Designed by
        <a href="#">Jaskaran Singh</a>
      </p>
    </div>
  );
}
