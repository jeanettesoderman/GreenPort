import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { projectService } from '../services/api';
import ThemeToggle from '../components/ThemeToggle';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const [projectRes, metricsRes] = await Promise.all([
        projectService.getProjectById(id),
        projectService.getProjectMetrics(id)
      ]);
      setProject(projectRes.data);
      setMetrics(metricsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project data:', error);
      // Fallback demo data
      const demoProjects = {
        '1': {
          id: 1,
          name: 'E-commerce Store',
          url: 'https://example-ecommerce.com',
          status: 'ONLINE',
          ecoRating: 'A_PLUS',
          type: 'E-commerce'
        },
        '2': {
          id: 2,
          name: 'Customer Portal',
          url: 'https://portal.example.com',
          status: 'MAINTENANCE',
          ecoRating: 'B',
          type: 'Portal'
        },
        '3': {
          id: 3,
          name: 'Marketing Site',
          url: 'https://marketing.example.com',
          status: 'ONLINE',
          ecoRating: 'A',
          type: 'Marketing'
        }
      };
      
      const demoMetrics = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        co2Grams: 0.3 + Math.random() * 0.4,
        energyKwh: 0.0004 + Math.random() * 0.0002,
        pageWeight: 1024 * 1024 * (1.5 + Math.random() * 1.5),
        cleanerThanPercentage: 65 + Math.random() * 25,
        measuredAt: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString()
      }));
      
      setProject(demoProjects[id] || demoProjects['1']);
      setMetrics(demoMetrics);
      setLoading(false);
    }
  };

  const handleUpdateMetrics = async () => {
    try {
      await projectService.updateMetrics(id);
      fetchProjectData();
    } catch (error) {
      console.error('Error updating metrics:', error);
    }
  };

  const formatChartData = () => {
    return metrics
      .slice(0, 30)
      .reverse()
      .map(metric => ({
        date: new Date(metric.measuredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        co2: parseFloat(metric.co2Grams.toFixed(3)),
        energy: parseFloat((metric.energyKwh * 1000).toFixed(2))
      }));
  };

  const getLatestMetric = () => {
    return metrics.length > 0 ? metrics[0] : null;
  };

  const getEcoRatingColor = (rating) => {
    const colors = {
      'A_PLUS': '#00FF85',
      'A': '#00CC6A',
      'B': '#FFD700',
      'C': '#FFA500',
      'D': '#FF6B6B',
      'E': '#FF4444',
      'F': '#CC0000'
    };
    return colors[rating] || '#00FF85';
  };

  if (loading) {
    return (
      <div className="project-detail loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail">
        <p>Project not found</p>
      </div>
    );
  }

  const latestMetric = getLatestMetric();
  const chartData = formatChartData();

  return (
    <div className="project-detail">
      <ThemeToggle />
      
      <header className="detail-header">
        <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
        <div className="header-main">
          <div className="header-left">
            <h1>{project.name}</h1>
            <p className="project-type">{project.type}</p>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-url">
              {project.url} ↗
            </a>
          </div>
          <div className="header-right">
            <div 
              className="eco-rating-large"
              style={{ borderColor: getEcoRatingColor(project.ecoRating) }}
            >
              <span 
                className="rating-text"
                style={{ color: getEcoRatingColor(project.ecoRating) }}
              >
                {project.ecoRating.replace('_', '')}
              </span>
              <span className="rating-label">Eco Rating</span>
            </div>
          </div>
        </div>
      </header>

      <div className="detail-content">
        {/* Metrics Overview */}
        <section className="metrics-overview">
          <h2>Current Metrics</h2>
          {latestMetric ? (
            <div className="metrics-grid">
              <motion.div 
                className="metric-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="metric-icon">🌍</div>
                <div className="metric-value">{latestMetric.co2Grams.toFixed(3)}g</div>
                <div className="metric-label">CO2 per page view</div>
              </motion.div>

              <motion.div 
                className="metric-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="metric-icon">⚡</div>
                <div className="metric-value">{(latestMetric.energyKwh * 1000).toFixed(2)}Wh</div>
                <div className="metric-label">Energy consumption</div>
              </motion.div>

              <motion.div 
                className="metric-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="metric-icon">📦</div>
                <div className="metric-value">{(latestMetric.pageWeight / 1024 / 1024).toFixed(2)}MB</div>
                <div className="metric-label">Page weight</div>
              </motion.div>

              <motion.div 
                className="metric-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="metric-icon">🏆</div>
                <div className="metric-value">{latestMetric.cleanerThanPercentage.toFixed(0)}%</div>
                <div className="metric-label">Cleaner than</div>
              </motion.div>
            </div>
          ) : (
            <p>No metrics available</p>
          )}
          
          <button className="btn-primary" onClick={handleUpdateMetrics}>
            🔄 Update Metrics
          </button>
        </section>

        {/* CO2 Trend Chart */}
        <section className="chart-section">
          <h2>CO2 Emissions Trend (Last 30 Days)</h2>
          <div className="chart-container glass-card">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--text-color)"
                  style={{ fontSize: '0.85rem' }}
                />
                <YAxis 
                  stroke="var(--text-color)"
                  style={{ fontSize: '0.85rem' }}
                  label={{ value: 'CO2 (grams)', angle: -90, position: 'insideLeft', fill: 'var(--text-color)' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="co2" 
                  stroke="var(--accent)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--accent)', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Optimization Tips */}
        <section className="tips-section">
          <h2>Optimization Tips</h2>
          <div className="tips-grid">
            <div className="tip-card glass-card">
              <h3>🖼️ Image Optimization</h3>
              <p>Compress and convert images to modern formats like WebP. Use responsive images with srcset.</p>
            </div>
            <div className="tip-card glass-card">
              <h3>📦 Code Splitting</h3>
              <p>Split your JavaScript bundles and load only what's needed for each page.</p>
            </div>
            <div className="tip-card glass-card">
              <h3>🗄️ Database Queries</h3>
              <p>Optimize database queries and implement caching strategies to reduce server load.</p>
            </div>
            <div className="tip-card glass-card">
              <h3>🌐 CDN Usage</h3>
              <p>Use a Content Delivery Network to serve static assets from locations closer to users.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
