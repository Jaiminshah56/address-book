/**
 * Netlify Serverless Function – wraps the Express API with serverless-http.
 * All /api/* requests are routed here via netlify.toml redirects.
 */
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');

// ── Mongoose model (inline to keep functions self-contained) ────────
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    phone: { type: String, required: [true, 'Phone is required'], trim: true },
    email: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

// Reuse model if already compiled (hot-reload safety)
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// ── MongoDB connection cache ────────────────────────────────────────
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI environment variable is not set');
  await mongoose.connect(uri);
  isConnected = true;
  console.log('✅ Connected to MongoDB');
}

// ── Express app ─────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// Middleware: ensure DB is connected before every request
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

const router = express.Router();

// GET /api/contacts – list all
router.get('/contacts', async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: err.message });
  }
});

// GET /api/contacts/:id – single
router.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact', error: err.message });
  }
});

// POST /api/contacts – create
router.post('/contacts', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create contact', error: err.message });
  }
});

// PUT /api/contacts/:id – update
router.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update contact', error: err.message });
  }
});

// DELETE /api/contacts/:id – delete
router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contact', error: err.message });
  }
});

// POST /api/seed – insert sample contacts (one-time use)
router.post('/seed', async (_req, res) => {
  try {
    const count = await Contact.countDocuments();
    if (count > 0) return res.json({ message: `Database already has ${count} contacts, skipping seed.` });

    const sampleContacts = [
      { name: 'Alice Johnson', phone: '+1 (555) 123-4567', email: 'alice.johnson@email.com', address: '123 Maple St, Springfield, IL 62704', notes: 'Met at the React conference 2024' },
      { name: 'Bob Williams', phone: '+1 (555) 234-5678', email: 'bob.williams@email.com', address: '456 Oak Ave, Austin, TX 73301', notes: 'College roommate' },
      { name: 'Charlie Brown', phone: '+1 (555) 345-6789', email: 'charlie.b@email.com', address: '789 Pine Rd, Denver, CO 80201', notes: 'Freelance designer – great for UI work' },
      { name: 'Diana Martinez', phone: '+1 (555) 456-7890', email: 'diana.m@email.com', address: '321 Elm Blvd, Miami, FL 33101', notes: 'Yoga instructor, available weekday mornings' },
      { name: 'Ethan Davis', phone: '+1 (555) 567-8901', email: 'ethan.davis@email.com', address: '654 Birch Ln, Seattle, WA 98101', notes: 'Backend engineer at TechCorp' },
      { name: 'Fiona Garcia', phone: '+1 (555) 678-9012', email: 'fiona.g@email.com', address: '987 Cedar Ct, New York, NY 10001', notes: 'Book club organizer' },
      { name: 'George Lee', phone: '+1 (555) 789-0123', email: 'george.lee@email.com', address: '159 Walnut Dr, Portland, OR 97201', notes: 'Neighbour, has golden retriever' },
      { name: 'Hannah Wilson', phone: '+1 (555) 890-1234', email: 'hannah.w@email.com', address: '753 Spruce Way, Chicago, IL 60601', notes: 'Marketing manager – possible collaboration' },
    ];

    await Contact.insertMany(sampleContacts);
    res.status(201).json({ message: `Seeded ${sampleContacts.length} contacts successfully!` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to seed', error: err.message });
  }
});

// Mount router on /api
app.use('/api', router);

// Health check
app.get('/', (_req, res) => {
  res.json({ message: 'Address Book API is running 🚀' });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// ── Export as Netlify serverless handler ─────────────────────────────
module.exports.handler = serverless(app);
