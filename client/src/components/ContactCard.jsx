/**
 * Individual contact card used in the list view.
 */
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

/**
 * Returns a deterministic pastel-gradient class pair based on the contact name.
 */
const avatarGradients = [
  'from-violet-400 to-purple-500',
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-500',
  'from-cyan-400 to-sky-500',
  'from-lime-400 to-green-500',
  'from-fuchsia-400 to-pink-500',
];

function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getGradient(name) {
  let hash = 0;
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
  return avatarGradients[Math.abs(hash) % avatarGradients.length];
}

export default function ContactCard({ contact }) {
  return (
    <Link to={`/contact/${contact._id}`} className="block group">
      <div className="glass-card p-5 flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${getGradient(
            contact.name
          )} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
        >
          {getInitials(contact.name)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
            {contact.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            {contact.phone && (
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <Phone className="w-3.5 h-3.5" />
                <span className="truncate">{contact.phone}</span>
              </span>
            )}
            {contact.email && (
              <span className="flex items-center gap-1.5 text-sm text-gray-400 hidden sm:flex">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{contact.email}</span>
              </span>
            )}
            {contact.address && (
              <span className="flex items-center gap-1.5 text-sm text-gray-400 hidden lg:flex">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate max-w-[180px]">{contact.address}</span>
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
      </div>
    </Link>
  );
}
