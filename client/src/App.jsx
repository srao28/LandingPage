import { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('contact') === 'open') {
      setShowContact(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <>
      <div className="portfolio">
        <Portfolio />
        <section className="contact-cta">
          <button
            type="button"
            className="btn-contact"
            onClick={() => setShowContact(true)}
          >
            Get in touch
          </button>
        </section>
      </div>
      {showContact && (
        <ContactForm onClose={() => setShowContact(false)} />
      )}
    </>
  );
}

export default App;
