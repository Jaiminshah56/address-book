/**
 * Empty state placeholder.
 */
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
      {/* Decorative circle */}
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-6">
        <UserPlus className="w-10 h-10 text-primary-500" />
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">No contacts yet</h3>
      <p className="text-gray-400 mb-6 text-center max-w-sm">
        Start building your address book by adding your first contact.
      </p>

      <Link to="/add" className="btn-primary">
        <UserPlus className="w-4 h-4" />
        Add First Contact
      </Link>
    </div>
  );
}
