import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [formStatus, setFormStatus] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // ADD THIS
  
  // ADD THIS FUNCTION
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // WhatsApp form refs
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const quantityRef = useRef();
  const brickRef = useRef();
  const locationRef = useRef();

  // Live quote calculator
  const calculateQuote = () => {
    const qty = quantityRef.current?.value || 0;
    const type = brickRef.current?.value;
    const prices = { type1: 9.34, type2: 7.6, type3: 7.6, type4: 7.6, type5: 2 };
    const total = (qty * (prices[type] || 0)).toLocaleString();
    const quoteElement = document.getElementById('quote-total');
    if (quoteElement) quoteElement.textContent = `₹${total}`;
  };

  // WhatsApp auto-submit
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    setFormStatus('✅ Quote sent to WhatsApp!');
    
    const formData = {
      name: nameRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      email: emailRef.current?.value || '',
      quantity: quantityRef.current?.value || '',
      brick: brickRef.current?.options[brickRef.current.selectedIndex]?.text || '',
      location: locationRef.current?.value || ''
    };
    
    const message = `🏭 RD BRICKS QUOTE REQUEST

👤 Name: ${formData.name}
📱 WhatsApp: ${formData.phone}
📧 Email: ${formData.email}
📦 Quantity: ${formData.quantity}
🧱 Type: ${formData.brick}
🚚 Location: ${formData.location}
💰 Total: ${document.getElementById('quote-total')?.textContent || '₹0'}

Please confirm availability & delivery!`;

    const whatsappUrl = `https://wa.me/919771084122?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const products = [
    { id: 1, type: 'type1', title: '🔥 Type 1 Red Bricks', price: '₹9.34', desc: 'Premium Quality, House Construction',img: 'https://via.placeholder.com/280x200/DC143C/FFF?text=Type+1+Premium'},
    { id: 2, type: 'type2', title: '🏗️ Type 2 Red Bricks', price: '₹7.6', desc: 'Standard Grade, Wall Construction', img: 'https://via.placeholder.com/280x200/C71585/FFF?text=Type+2+Standard' },
    { id: 3, type: 'type3', title: '💪 Type 3 Red Bricks', price: '₹7.6', desc: 'Basic Grade, Floor Filling', img: 'https://via.placeholder.com/280x200/B22222/FFF?text=Type+3+Basic' },
    { id: 4, type: 'type4', title: '🪨 Type 4 Red Bricks', price: '₹7.6', desc: 'Strong, Structural Base', img: 'https://via.placeholder.com/280x200/8B0000/FFF?text=Type+4+Strong' },
    { id: 5, type: 'type5', title: '🧱 Tukda Bricks', price: '₹2', desc: 'Broken Pieces, Perfect Filling', img: 'https://via.placeholder.com/280x200/A52A2A/FFF?text=Tukda+Fill' }
  ];

  return (
    <div className="App">
      {/* FIXED NAVIGATION */}
      <button 
        className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#home" onClick={toggleMenu}>Home</a></li>
          <li><a href="#services" onClick={toggleMenu}>Services</a></li>
          <li><a href="#products" onClick={toggleMenu}>Products</a></li>
          <li><a href="#gallery" onClick={toggleMenu}>Gallery</a></li>
          <li><a href="#about" onClick={toggleMenu}>About</a></li>
          <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
        </ul>
      </nav>
      
      <a href="#quote" className="get-quote">Get Quote</a>

      {/* ALL YOUR OTHER SECTIONS - EXACTLY SAME */}
      <header id="home">
        <div>
          <h1><strong>RD Bricks</strong></h1>
          <p>Gaya's Premium Red Bricks manufacturer<br /><strong>Bulk Supply Across Bihar</strong></p>
        </div>
      </header>

      {/* Products, Services, Gallery, About, Quote, Contact - ALL SAME AS YOURS */}
      <section id="products">
        <h2>🧱 RD Bricks Product Range</h2>
        <div className="filter">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">👀 View All Clay Bricks</option>
            <option value="type1">Type 1 Red Bricks</option>
            <option value="type2">Type 2 Red Bricks</option>
            <option value="type3">Type 3 Red Bricks</option> 
            <option value="type4">Type 4 Red Bricks</option>
            <option value="type5">Tukda Bricks</option>
          </select>
        </div>
        <div className="products">
          {products.map(product => (
            <div key={product.id} className={`product ${filter !== 'all' && product.type !== filter ? 'hidden' : ''}`} data-type={product.type}>
              <img src={product.img} alt={product.title} />
              <h3>{product.title}</h3>
              <p><strong>{product.desc}</strong><br /><strong>{product.price} each</strong></p>
            </div>
          ))}
        </div>
      </section>
 
      <section id="services">
        <h2>⚙️ Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>🚚 Bulk Delivery</h3>
            <p>Fast delivery across Gaya, Patna, Bihar Sharif & all Bihar districts</p>
          </div>
          <div className="service-card">
            <h3>🏭 Factory Direct</h3>
            <p>Straight from our Panchubigha kiln - no middlemen, best prices</p>
          </div>
          <div className="service-card">
            <h3>📏 Custom Sizes</h3>
            <p>Standard 10x3.2x5 inches fiixed sizes available only </p>
          </div>
          <div className="service-card">
            <h3>✅ Quality Check</h3>
            <p>Every batch tested for strength, color, and uniformity</p>
          </div>
        </div>
      </section>

     
      <section id="gallery">
        <h2>🖼️ Gallery</h2>
        <div className="gallery-grid">
          <img src="/images/kiln.jpeg" alt="Kiln" />
          <img src="/images/bricks.jpg" alt="Bricks" />
          <img src="images/rawbricks.jpg" alt="raw bricks" />
          <img src="images/site.jpeg" alt="Site" />
          <img src="images/emptychamber.jpg" alt="chamber" />
          <img src="images/redbrick.jpg" alt="red brick" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about">
        <h2>ℹ️ About RD Bricks</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>🏭 Gaya's Trusted Brick Manufacturer</h3>
            <p><strong>30+ Years Experience</strong> - Established in Panchubigha Chakand, Gaya</p>
            <ul>
              <li>✅ 100% Pure clay red bricks</li>
              <li>✅ 10,000+ bricks daily capacity</li>
              <li>✅ Trusted by 100+ contractors</li>
              <li>✅ Same-day loading available</li>
            </ul>
            <p><strong>Our Promise:</strong> Quality bricks at factory prices!</p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <h4>10K+</h4>
              <p>Bricks Daily</p>
            </div>
            <div className="stat">
              <h4>30+</h4>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h4>1000+</h4>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP QUOTE FORM */}
      <section id="quote">
        <h2>💰 Instant Quote Calculator</h2>
        <div className="form-section">
          {formStatus && (
            <div className={formStatus.includes('✅') ? 'success-msg' : 'error-msg'}>
              {formStatus}
            </div>
          )}
          
          {/* Quote Preview */}
          <div className="quote-preview">
            <div className="quote-calc">
              <strong>📦 Your Quote Preview:</strong><br />
              <span id="quote-total">₹0</span> 
              <small>(Fill form → See live price)</small>
            </div>
          </div>

          {/* WhatsApp Form */}
          <form onSubmit={handleWhatsAppSubmit} id="quoteForm" className="whatsapp-form">
            <input ref={nameRef} name="name" placeholder="👤 Full Name *" required maxLength="50" />
            <input ref={phoneRef} name="phone" type="tel" placeholder="📱 WhatsApp Number *" 
                   required pattern="[0-9+]{10,15}" maxLength="15" />
            <input ref={emailRef} name="email" type="email" placeholder="📧 Email (optional)" />
            
            <input ref={quantityRef} name="quantity" type="number" placeholder="📦 Quantity" 
                   min="5" max="100000" step="5" required onChange={calculateQuote} />
            
            <select ref={brickRef} name="brick_type" required onChange={calculateQuote}>
              <option value="">🧱 Select Brick Type</option>
              <option value="type1">Type 1 Red Bricks (₹9.34/pc)</option>
              <option value="type2">Type 2 Red Bricks (₹7.6/pc)</option>
              <option value="type3">Type 4 Red Bricks (₹7.6/pc)</option>
              <option value="type4">Type 4 Red Bricks (₹7.6/pc)</option>
              <option value="type5">Tukda Bricks (₹2/pc)</option>
            </select>
            
            <input ref={locationRef} name="location" placeholder="🚚 Delivery Location *" required maxLength="100" />
            
            <button type="submit" className="whatsapp-submit">
              🚀 Send Quote to WhatsApp
            </button>
          </form>

          <div className="whatsapp-direct">
            <a href="https://wa.me/919771084122?text=Hello%20RD%20Bricks%20Quote" 
               className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
              💬 Direct WhatsApp Chat
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <h2>📍 Contact Us</h2>
        <div className="contact-details">
          <h3>🏭 RD Bricks Kiln</h3>
          <p><strong>📍 Location</strong><br />Panchubigha Chakand<br />Gaya, Bihar 823004</p>
          <div className="phone">📞 <strong>+91 92627 29850</strong></div>
          <a href="https://wa.me/919771084122" className="whatsapp-btn" target="_blank" rel="noreferrer">
            💬 WhatsApp Now
          </a>
        </div>
      </section>

      <footer>
        <p>© 2026 <strong>RD Bricks</strong> | Gaya's Trusted Bricks | <a href="#quote">Get Quote</a></p>
      </footer>
    </div>
  );
}

export default App;