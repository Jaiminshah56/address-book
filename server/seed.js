/**
 * Seed script – populates the database with sample contacts.
 * Run: npm run seed
 */
const mongoose = require('mongoose');
require('dotenv').config();
const Contact = require('./models/Contact');

const sampleContacts = [
  {
    name: 'Alice Johnson',
    phone: '+1 (555) 123-4567',
    email: 'alice.johnson@email.com',
    address: '123 Maple St, Springfield, IL 62704',
    notes: 'Met at the React conference 2024',
  },
  {
    name: 'Bob Williams',
    phone: '+1 (555) 234-5678',
    email: 'bob.williams@email.com',
    address: '456 Oak Ave, Austin, TX 73301',
    notes: 'College roommate',
  },
  {
    name: 'Charlie Brown',
    phone: '+1 (555) 345-6789',
    email: 'charlie.b@email.com',
    address: '789 Pine Rd, Denver, CO 80201',
    notes: 'Freelance designer – great for UI work',
  },
  {
    name: 'Diana Martinez',
    phone: '+1 (555) 456-7890',
    email: 'diana.m@email.com',
    address: '321 Elm Blvd, Miami, FL 33101',
    notes: 'Yoga instructor, available weekday mornings',
  },
  {
    name: 'Ethan Davis',
    phone: '+1 (555) 567-8901',
    email: 'ethan.davis@email.com',
    address: '654 Birch Ln, Seattle, WA 98101',
    notes: 'Backend engineer at TechCorp',
  },
  {
    name: 'Fiona Garcia',
    phone: '+1 (555) 678-9012',
    email: 'fiona.g@email.com',
    address: '987 Cedar Ct, New York, NY 10001',
    notes: 'Book club organizer',
  },
  {
    name: 'George Lee',
    phone: '+1 (555) 789-0123',
    email: 'george.lee@email.com',
    address: '159 Walnut Dr, Portland, OR 97201',
    notes: 'Neighbour, has golden retriever',
  },
  {
    name: 'Hannah Wilson',
    phone: '+1 (555) 890-1234',
    email: 'hannah.w@email.com',
    address: '753 Spruce Way, Chicago, IL 60601',
    notes: 'Marketing manager – possible collaboration',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Contact.deleteMany({});
    console.log('🗑️  Cleared existing contacts');

    await Contact.insertMany(sampleContacts);
    console.log(`🌱 Inserted ${sampleContacts.length} sample contacts`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
