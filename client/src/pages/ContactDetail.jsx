/**
 * Contact Detail page – shows full info with edit & delete actions.
 */
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Phone,
  Mail,
  MapPin,
  StickyNote,
  Calendar,
} from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';

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

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get(`/contacts/${id}`);
        setContact(data);
      } catch {
        toast.error('Contact not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  async function handleDelete() {
    try {
      await API.delete(`/contacts/${id}`);
      toast.success('Contact deleted');
      navigate('/');
    } catch {
      toast.error('Failed to delete contact');
    }
  }

  if (loading) return <Loader text="Loading contact…" />;
  if (!contact) return null;

  const infoItems = [
    { icon: Phone, label: 'Phone', value: contact.phone },
    { icon: Mail, label: 'Email', value: contact.email },
    { icon: MapPin, label: 'Address', value: contact.address },
    { icon: StickyNote, label: 'Notes', value: contact.notes },
    {
      icon: Calendar,
      label: 'Added',
      value: new Date(contact.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={showDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete ${contact.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />

      {/* Back */}
      <Link to="/" className="btn-ghost mb-6 inline-flex">
        <ArrowLeft className="w-4 h-4" />
        Back to Contacts
      </Link>

      {/* Card */}
      <div className="glass-card overflow-hidden !hover:transform-none">
        {/* Header gradient band */}
        <div className={`h-28 bg-gradient-to-r ${getGradient(contact.name)} relative`}>
          <div className="absolute -bottom-10 left-6 sm:left-8">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getGradient(
                contact.name
              )} flex items-center justify-center text-white text-2xl font-bold shadow-xl ring-4 ring-white`}
            >
              {getInitials(contact.name)}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-14 pb-8 px-6 sm:px-8">
          {/* Name & actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">{contact.name}</h1>
            <div className="flex items-center gap-2">
              <Link to={`/edit/${contact._id}`} className="btn-ghost text-sm">
                <Pencil className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={() => setShowDelete(true)}
                className="btn-ghost text-sm !text-red-500 hover:!bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Detail rows */}
          <div className="space-y-4">
            {infoItems.map(({ icon: Icon, label, value }) =>
              value ? (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/60 hover:bg-gray-100/60 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <p className="text-gray-800 font-medium leading-relaxed">{value}</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
