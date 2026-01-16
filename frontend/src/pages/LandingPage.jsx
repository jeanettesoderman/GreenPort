import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import './LandingPage.css';

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const codeSnippets = {
    audit: `@Scheduled(cron = "0 0 * * * *")
public void auditWebsites() {
  projects.forEach(project -> {
    CarbonMetric metric = 
      carbonApi.analyze(project);
    updateEcoRating(metric);
  });
}`,
    realtime: `public CarbonMetric 
  updateMetrics(Long projectId) {
  CarbonApiResponse data = 
    carbonApi.getCarbonData(url);
  return saveMetric(data);
}`,
    integration: `@RestController
@RequestMapping("/api/projects")
public class ProjectController {
  @GetMapping("/{id}/metrics")
  public List<CarbonMetric> 
    getMetrics(@PathVariable Long id) {
    return service.getMetrics(id);
  }
}`
  };

  return (
    <div className="landing-page">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="title-line">Green IT</span>
            <span className="title-line accent">Client Portal</span>
          </h1>
          <p className="hero-subtitle">
            Most tools today are either too basic or far too expensive. They might point out a problem, 
            but they rarely help you manage it. <strong>GreenPort bridges that gap.</strong> It is a dedicated 
            platform where developers and clients collaborate to solve performance and sustainability issues 
            as they happen.
          </p>
          <div className="hero-cta">
            <Link to="/login" className="btn-primary">Get Started</Link>
            <Link to="/dashboard" className="btn-secondary">Dashboard</Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="eco-badge">
            <div className="badge-ring"></div>
            <div className="badge-content">
              <span className="badge-rating">A+</span>
              <span className="badge-label">Eco Rating</span>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="section-divider"></div>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why GreenPort?</h2>
        
        <div className="features-grid">
          <motion.div 
            className="feature-card"
            onMouseEnter={() => setHoveredFeature('audit')}
            onMouseLeave={() => setHoveredFeature(null)}
            whileHover={{ y: -5 }}
          >
            <div className="feature-icon">🔄</div>
            <h3>Automated Audits</h3>
            <p>Scheduled carbon footprint analysis runs automatically, keeping your metrics up-to-date without manual intervention.</p>
            {hoveredFeature === 'audit' && (
              <motion.pre 
                className="code-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <code>{codeSnippets.audit}</code>
              </motion.pre>
            )}
          </motion.div>

          <motion.div 
            className="feature-card"
            onMouseEnter={() => setHoveredFeature('realtime')}
            onMouseLeave={() => setHoveredFeature(null)}
            whileHover={{ y: -5 }}
          >
            <div className="feature-icon">📊</div>
            <h3>Real-time Metrics</h3>
            <p>Live CO2 tracking with historical data visualization. See the impact of your optimizations immediately.</p>
            {hoveredFeature === 'realtime' && (
              <motion.pre 
                className="code-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <code>{codeSnippets.realtime}</code>
              </motion.pre>
            )}
          </motion.div>

          <motion.div 
            className="feature-card"
            onMouseEnter={() => setHoveredFeature('integration')}
            onMouseLeave={() => setHoveredFeature(null)}
            whileHover={{ y: -5 }}
          >
            <div className="feature-icon">🔌</div>
            <h3>API Integration</h3>
            <p>Built with Spring Boot and integrated with Website Carbon API for accurate, industry-standard measurements.</p>
            {hoveredFeature === 'integration' && (
              <motion.pre 
                className="code-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <code>{codeSnippets.integration}</code>
              </motion.pre>
            )}
          </motion.div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <span className="stat-number">2.5%</span>
          <span className="stat-label">of global CO2 emissions from internet</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">transparency with your clients</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">A+</span>
          <span className="stat-label">achievable eco-rating</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Built with Spring Boot & React • Powered by Website Carbon API</p>
        <p className="footer-tagline">Making the web greener, one site at a time 🌱</p>
      </footer>
    </div>
  );
};

export default LandingPage;
