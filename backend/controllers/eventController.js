const Event = require('../models/Event');

// GET /api/events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ startTime: 1 });
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, startTime, endTime } = req.body;
    if (!title || !location || !startTime || !endTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const event = new Event({
      title,
      description,
      location,
      startTime,
      endTime,
      createdBy: req.user ? req.user._id : null, // ถ้ามี auth
    });

    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/events/:id
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, location, startTime, endTime, status } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.title = title ?? event.title;
    event.description = description ?? event.description;
    event.location = location ?? event.location;
    event.startTime = startTime ?? event.startTime;
    event.endTime = endTime ?? event.endTime;
    event.status = status ?? event.status;

    const updated = await event.save();
    res.json(updated);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Server error' });
  }
};