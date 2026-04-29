import React from "react";
import "../styles/TrustBar.css";
import ascendLogo from "../assets/logos/ascend-logo.webp";
import astraLogo from "../assets/logos/astra-logo.webp";
import astriaLogo from "../assets/logos/astria-logo.webp";
import avarisLogo from "../assets/logos/avaris-logo.webp";
import axialLogo from "../assets/logos/axial-logo.webp";
import axisLogo from "../assets/logos/axis-logo.webp";
import iHubLogo from "../assets/logos/ihub-logo.webp";

const logos = [
  { name: "Ascend HR Solutions", src: ascendLogo },
  { name: "Astra Group of Companies INC.", src: astraLogo },
  { name: "Astria Insurance Solutions", src: astriaLogo },
  { name: "Avaris Sales Solutions", src: avarisLogo },
  { name: "Axial Real Estate Services", src: axialLogo },
  { name: "Axis Marketing Solutions", src: axisLogo },
  { name: "i-Hub Davao - CoWorking Space and Bistro", src: iHubLogo },
];

const TrustBar: React.FC = () => {
  return (
    <section className="trust-bar">
      <div className="trust-bar-inner">
        <p className="trust-bar-label">
          Trusted by startups & small businesses
        </p>

        <div className="trust-bar-logos">
          {logos.map((logo) => (
            <div key={logo.name} className="trust-logo">
              <img
                src={logo.src}
                alt={logo.name}
                className="trust-logo-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
