/**
 * Dashboard / Contact List page.
 * Displays all contacts with live search filtering.
 */
import { useEffect, useState, useMemo } from 'react';
import { Search, Users, SlidersHorizontal } from 'lucide-react';
import API from '../api';
import ContactCard from '../components/ContactCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  // Fetch all contacts on mount
  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      setLoading(true);
      const { data } = await API.get('/contacts');
      setContacts(data);
    } catch (err) {
      console.error('Failed to load contacts:', err);
    } finally {
      setLoading(false);
    }
  }

  // Live search – filters by name, phone, email, or address
  const filtered = useMemo(() => {
    if (!query.trim()) return contacts;
    const q = query.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.address && c.address.toLowerCase().includes(q))
    );
  }, [contacts, query]);

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Contacts
          </h1>
          <p className="text-gray-400 mt-1 flex items-center gap-2">
            <Users className="w-4 h-4" />
            {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, phone, email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-11 pr-4"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Loader text="Loading contacts…" />
      ) : contacts.length === 0 ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <SlidersHorizontal className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No contacts match "{query}"</p>
        </div>
      ) : (
        <div className="grid gap-3 stagger">
          {filtered.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}
