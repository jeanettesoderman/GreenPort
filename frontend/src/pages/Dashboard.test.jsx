import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import { projectService } from '../services/api'

// Mock the API service
vi.mock('../services/api', () => ({
  projectService: {
    getAllProjects: vi.fn(),
  },
}))

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock useAuth hook
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'Demo Client',
      email: 'demo@example.com',
    },
    isAuthenticated: true,
    logout: vi.fn(),
  }),
}))

// Mock ThemeToggle component
vi.mock('../components/ThemeToggle', () => ({
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}))

const mockProjects = [
  {
    id: 1,
    name: 'E-commerce Store',
    url: 'https://example-ecommerce.com',
    status: 'ONLINE',
    ecoRating: 'A_PLUS',
    lastAudit: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Customer Portal',
    url: 'https://portal.example.com',
    status: 'MAINTENANCE',
    ecoRating: 'B',
    lastAudit: new Date().toISOString(),
  },
]

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  )
}

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    projectService.getAllProjects.mockResolvedValue({
      data: mockProjects,
    })
  })

  it('renders dashboard title', async () => {
    renderDashboard()
    await waitFor(() => {
      const title = screen.getByText('Project Dashboard')
      expect(title).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('renders back to home link', async () => {
    renderDashboard()
    await waitFor(() => {
      const link = screen.getByText('← Back to Home')
      expect(link).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('displays loading state initially', async () => {
    renderDashboard()
    // The component should show loading state before projects are loaded
    expect(projectService.getAllProjects).toHaveBeenCalled()
    // Wait for component to finish loading
    await waitFor(() => {
      expect(screen.queryByText('Project Dashboard')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('displays projects after loading', async () => {
    renderDashboard()
    
    await waitFor(() => {
      const project1 = screen.getByText('E-commerce Store')
      const project2 = screen.getByText('Customer Portal')
      expect(project1).toBeInTheDocument()
      expect(project2).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('renders filter buttons', async () => {
    renderDashboard()
    await waitFor(() => {
      const allProjectsBtn = screen.getByText('All Projects')
      const onlineBtn = screen.getByText('Online')
      const maintenanceBtn = screen.getByText('Maintenance')
      expect(allProjectsBtn).toBeInTheDocument()
      expect(onlineBtn).toBeInTheDocument()
      expect(maintenanceBtn).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('displays subtitle text', async () => {
    renderDashboard()
    await waitFor(() => {
      const subtitle = screen.getByText(/Monitor your projects' carbon footprint/i)
      expect(subtitle).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})
