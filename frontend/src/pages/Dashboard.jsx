import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAllProjects();
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Use demo data if API fails
      setProjects([
        {
          id: 1,
          name: 'E-commerce Store',
          description: 'Sustainable fashion marketplace with optimized images and lazy loading',
          url: 'https://example-ecommerce.com',
          status: 'ONLINE',
          ecoRating: 'A_PLUS',
          lastAudit: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Customer Portal',
          description: 'Client dashboard with real-time analytics and minimal JavaScript',
          url: 'https://portal.example.com',
          status: 'MAINTENANCE',
          ecoRating: 'B',
          lastAudit: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Marketing Site',
          description: 'Static site with CDN delivery and green hosting infrastructure',
          url: 'https://marketing.example.com',
          status: 'ONLINE',
          ecoRating: 'A',
          lastAudit: new Date().toISOString()
        }
      ]);
      setLoading(false);
    }
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

  const getStatusColor = (status) => {
    const colors = {
      'ONLINE': '#00FF85',
      'MAINTENANCE': '#FFD700',
      'OFFLINE': '#FF4444',
      'DEVELOPMENT': '#6B9FFF'
    };
    return colors[status] || '#00FF85';
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter.toUpperCase());

  if (loading) {
    return (
      <div className="dashboard loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <ThemeToggle />
      
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="back-link">← Back to Home</Link>
            <div>
              <h1>Project Dashboard</h1>
              <p className="header-subtitle">Monitor your projects' carbon footprint in real-time</p>
            </div>
          </div>
          <div className="header-right">
            {user && (
              <div className="user-info">
                <span className="user-name">👤 {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-controls">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={filter === 'online' ? 'active' : ''} 
            onClick={() => setFilter('online')}
          >
            Online
          </button>
          <button 
            className={filter === 'maintenance' ? 'active' : ''} 
            onClick={() => setFilter('maintenance')}
          >
            Maintenance
          </button>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="project-header">
              <h3>{project.name}</h3>
              <div className="project-badges">
                <span 
                  className="status-badge" 
                  style={{ 
                    background: `${getStatusColor(project.status)}20`,
                    color: getStatusColor(project.status),
                    border: `1px solid ${getStatusColor(project.status)}`
                  }}
                >
                  {project.status}
                </span>
                <span 
                  className="eco-badge-small" 
                  style={{ 
                    background: `${getEcoRatingColor(project.ecoRating)}20`,
                    color: getEcoRatingColor(project.ecoRating),
                    border: `1px solid ${getEcoRatingColor(project.ecoRating)}`
                  }}
                >
                  {project.ecoRating.replace('_', '')}
                </span>
              </div>
            </div>

            <div className="project-info">
              <div className="info-row">
                <span className="info-label">Type:</span>
                <span className="info-value">{project.type}</span>
              </div>
              <div className="info-row">
                <span className="info-label">URL:</span>
                <span className="info-value url">{project.url}</span>
              </div>
            </div>

            <div className="project-actions">
              <Link to={`/project/${project.id}`} className="btn-view">
                View Details →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <p>No projects found with the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
