import { useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, FileText } from "lucide-react";
import servicesData from "../data/services.json";
import "../styles/ServiceArticle.css";
import { HashLink } from "react-router-hash-link";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FinalCTA from "./FinalCTA";

function ServiceArticle() {
  const { serviceId } = useParams();

  const service = servicesData.find((s) => s.id === serviceId);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [serviceId]);

  if (!service) {
    return (
      <div className="error-page">
        <div className="error-container">
          <div className="error-icon">
            <Sparkles size={48} />
          </div>
          <h2 className="error-title">Service Not Found</h2>
          <p className="error-description">
            The service you are looking for does not exist or may have been
            moved.
          </p>
          <HashLink smooth to="/#services" className="btn btn-primary">
            Return to Home
          </HashLink>
        </div>
      </div>
    );
  }

  return (
    <div className="service-article-page">
      <Helmet>
        <title>{`${service.title} | My Brand Name`}</title>
        <meta name="description" content={service.description} />
        {/* Add Open Graph tags for better social sharing */}
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="article" />
      </Helmet>

      <article className="service-article">
        {/* Hero Banner */}
        <div className="article-hero">
          <div className="container">
            <HashLink smooth to="/#services" className="back-link">
              <ArrowLeft size={18} />
              Back to Services
            </HashLink>

            <header className="article-header">
              <span className="article-label">
                <FileText size={14} />
                Service Details
              </span>
              <h1 className="article-title">{service.title}</h1>
              <p className="article-lead">{service.description}</p>
            </header>
          </div>

          <div className="article-hero-glow" />
        </div>

        {/* Main Content */}
        <div className="container">
          <div className="article-content">
            {service.sections.map((section, index) => (
              <section key={index} className="article-section">
                {section.heading && (
                  <h2 className="section-heading">{section.heading}</h2>
                )}

                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="article-paragraph">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <footer>
          <FinalCTA/>
        </footer>
      </article>
    </div>
  );
}

export default ServiceArticle;
