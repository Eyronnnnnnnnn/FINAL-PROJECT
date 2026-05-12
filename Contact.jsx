function Contact() {
  return (
    <main className="page-section" style={{ backgroundColor: '#121212' }}>
      <section className="page-panel" style={{ maxWidth: 960 }}>
        <h1>Contact Us</h1>
        <p style={{ fontSize: 18, lineHeight: 1.8, margin: '1.5rem 0', color: '#ccc' }}>
          Have questions about Mon Rangsit? Reach out anytime and we’ll get back to you as soon as possible.
        </p>
        <div style={{ display: 'grid', gap: 18, maxWidth: 640 }}>
          <p style={{ fontSize: 18, margin: 0 }}>Email: <strong>libet@monrangsit.com</strong></p>
          <p style={{ fontSize: 18, margin: 0 }}>Phone: <strong>+65 1234 5678</strong></p>
          <p style={{ fontSize: 18, margin: 0 }}>Address: <strong>Batac, Ilocos Norte, Philippines   <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg" width="30"></img> </strong></p>
        
          
        </div>
      </section>
    </main>
  );
}

export default Contact;
