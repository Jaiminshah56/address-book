/**
 * Add / Edit Contact form page.
 * When a route param :id is present it edits the existing contact,
 * otherwise it creates a new one.
 */
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, ArrowLeft, User, Phone, Mail, MapPin, StickyNote, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api';
import Loader from '../components/Loader';

const emptyForm = { name: '', phone: '', email: '', address: '', notes: '' };

export default function ContactForm() {
  const { id } = useParams(); // undefined when adding
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  // If editing, fetch existing data
  useEffect(() => {
    if (!isEditing) return;
    (async () => {
      try {
        const { data } = await API.get(`/contacts/${id}`);
        setForm({
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          notes: data.notes || '',
        });
      } catch {
        toast.error('Contact not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEditing, navigate]);

  // Validation
  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Invalid email address';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (isEditing) {
        await API.put(`/contacts/${id}`, form);
        toast.success('Contact updated!');
      } else {
        await API.post('/contacts', form);
        toast.success('Contact created!');
      }
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  if (loading) return <Loader text="Loading contact…" />;

  const fields = [
    { name: 'name', label: 'Full Name', icon: User, placeholder: 'John Doe', required: true },
    { name: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+1 (555) 123-4567', required: true },
    { name: 'email', label: 'Email Address', icon: Mail, placeholder: 'john@example.com' },
    { name: 'address', label: 'Address', icon: MapPin, placeholder: '123 Main St, City, State' },
    { name: 'notes', label: 'Notes', icon: StickyNote, placeholder: 'Any additional information…', textarea: true },
  ];

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to={isEditing ? `/contact/${id}` : '/'} className="btn-ghost !px-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {isEditing ? 'Edit Contact' : 'New Contact'}
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {isEditing ? 'Update contact information' : 'Fill in the details below'}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5 !hover:transform-none">
        {fields.map(({ name, label, icon: Icon, placeholder, required, textarea }) => (
          <div key={name}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Icon className="w-4 h-4 text-primary-400" />
              {label}
              {required && <span className="text-red-400">*</span>}
            </label>
            {textarea ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                rows={3}
                className="input-field resize-none"
              />
            ) : (
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`input-field ${errors[name] ? '!border-red-400 !ring-red-100' : ''}`}
              />
            )}
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link to={isEditing ? `/contact/${id}` : '/'} className="btn-ghost">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Contact' : 'Save Contact'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
