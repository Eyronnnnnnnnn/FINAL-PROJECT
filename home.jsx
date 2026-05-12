import { useRef } from "react";
import './home.css'
import videoFile from './assets/video/webvideo.mp4';

function Home() {
    const videoRef = useRef(null);

    const handlePlay = ()=>{
        if (videoRef.current) {
      videoRef.current.muted = false; // enable sound
      videoRef.current.play();        // start playing
    }
    };
  return (
    <>
      {/* Fullscreen video container */}
      <div
        className="video-container"
        style={{
          width: "100vw",      // full width of screen
          height: "100vh",     // full height of screen
          position: "relative",
          overflow: "hidden"
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onClick={handlePlay}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        >
          <source src={videoFile} type="video/mp4" />
        </video>

        {/* Gradient overlay (80% dark on the left side) */}
       <div
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, rgba(0, 0, 0, 1) 20%, rgba(0,0,0,0) 100%)",
    zIndex: 0
  }}
></div>


        {/* Content on top */}

        <h1 className="slide-text"
          style={{
            position: "absolute",
            top: "10%",
            left: "8%",
            
            color: "#feC301",
            zIndex: 1,
            fontSize : 90,
            textAlign : 'left',
            textShadow: "2px 9px 10px rgb(0, 0, 0)",
           
           
          }}
        >
          
          WHERE <br />RIDE MEETS<br /> STYLE
        </h1>
      </div>

      <section className="page-section" style={{ backgroundColor: '#000', color: '#fff', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div style={{ width: '100%', maxWidth: 1200, textAlign: 'center' }}>
            <h2 style={{ fontSize: 48, marginBottom: 16 }}>Shop Now</h2>
            <p style={{ color: '#ccc', fontSize: 20, lineHeight: 1.7 }}>Explore premium rides and electric style essentials built for the city and the open road.</p>
          </div>

          
          <div style={{ width: '100%', maxWidth: 1200, minHeight: 320, borderRadius: 28, backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            
            <div className="Logo-brands-container" style={{ height : 250 , width: 1200  , display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

             <img src="https://bio.linkcdn.cc/upload/2023051204/1683864258969.png" alt="Thailand" style={{ width: 150, height: 150, borderRadius: 12 , padding : 50}} />
             <img src="https://insideracing.com.ph/wp-content/uploads/2015/11/JVT.jpg" alt="Thailand" style={{ width: 130, height: 70, borderRadius: 12 , padding : 50 , }} />
             <img src="https://down-ph.img.susercontent.com/file/ph-11134216-7r98r-lzjzzyndh6gu80" alt="Thailand" style={{ width: 150, height: 150, borderRadius: 12 , padding : 50}} />
             <img src="https://nlkperformance.com/wp-content/uploads/2024/06/01-Copy.png#421" alt="Thailand" style={{ width: '10%', height: '20%', borderRadius: 12 , padding : 50}} />
             

            </div>
          </div>
        </div>
      </section>

      <section className="page-section product-selection" style={{ backgroundColor: '#070707', color: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>Different Concepts</h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: '#ccc' }}>Select the product category that fits your style and start shopping instantly.</p>
        </div>
        <div className="product-grid" style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
          <div className="product-card" style={{ backgroundColor: '#111', padding: '28px', borderRadius: 24, minHeight: 240 }}>
            <img className="product-image" src="https://cdn.britannica.com/38/4038-050-BDDBA6AB/Flag-Thailand.jpg" alt="Helmet" /> 
            <h3 style={{ color: '#feca03', marginBottom: 12 }}>Thailand</h3>
            <p style={{ color: '#ccc', lineHeight: 1.7 }}>High-impact helmets with fresh designs for safety and street style.</p>
          </div>
          <div className="product-card" style={{ backgroundColor: '#111', padding: '28px', borderRadius: 24, minHeight: 240 }}>
            <img className="product-image" src="https://country-flags.org/downloads/malaysia-flag/raster/malaysia-flag-1280px-640px.png" alt="Jackets" />
            <h3 style={{ color: '#feca03', marginBottom: 12 }}>Malaysia</h3>
            <p style={{ color: '#ccc', lineHeight: 1.7 }}>Durable jackets with bold textures built for rider comfort and fashion.</p>
          </div>
          <div className="product-card" style={{ backgroundColor: '#111', padding: '28px', borderRadius: 24, minHeight: 240 }}>
            <img className="product-image" src="https://thfvnext.bing.com/th/id/OIP.rfrIkx7yaRBTzCxaIKq1uAHaE9?o=7&cb=thfvnextrm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Shoes" />
            <h3 style={{ color: '#feca03', marginBottom: 12 }}>Vietnam</h3>
            <p style={{ color: '#ccc', lineHeight: 1.7 }}>Performance footwear with sleek silhouettes for the urban rider.</p>
          </div>
          <div className="product-card" style={{ backgroundColor: '#111', padding: '28px', borderRadius: 24, minHeight: 240 }}>
            <img className="product-image" src="https://static.vecteezy.com/system/resources/previews/023/833/021/original/flag-of-taiwan-taiwan-flag-vector.jpg" alt="Accessories" />
            <h3 style={{ color: '#feca03', marginBottom: 12 }}>Taiwan</h3>
            <p style={{ color: '#ccc', lineHeight: 1.7 }}>Gloves, bags, and accessories to complete your premium ride setup.</p>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ backgroundColor: '#feC301', color: '#000' }}>
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>Ride With Style</h2>
          <p style={{ fontSize: 20, lineHeight: 1.7 }}>A bold experience from landing to checkout with the full-screen energy you want.</p>
        </div>
      </section>

    </>
  );
}

export default Home;