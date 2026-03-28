/**
 * App root – sets up routing and toast provider.
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ContactList from './pages/ContactList';
import ContactForm from './pages/ContactForm';
import ContactDetail from './pages/ContactDetail';
import './index.css';

function App() {
  return (
    <Router>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1e293b',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
            padding: '14px 20px',
            fontWeight: 500,
          },
          success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />

      {/* Nav */}
      <Navbar />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<ContactForm />} />
          <Route path="/edit/:id" element={<ContactForm />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
