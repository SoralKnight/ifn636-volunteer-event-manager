import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5001';

const styles = {
  page:    { maxWidth: 800, margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' },
  heading: { color: '#005EB8', borderBottom: '2px solid #005EB8', paddingBottom: '0.4rem' },
  subhead: { color: '#005EB8', marginTop: '2rem' },
  form:    { display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: 480 },
  label:   { fontSize: '0.9rem', fontWeight: 600 },
  input:   { padding: '0.45rem 0.6rem', border: '1px solid #ccc', borderRadius: 4, fontSize: '0.95rem' },
  btn:     { padding: '0.5rem 1.2rem', background: '#005EB8', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 },
  delBtn:  { padding: '0.3rem 0.7rem', background: '#c0392b', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', marginLeft: '1rem' },
  card:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 1rem', border: '1px solid #e0e0e0', borderRadius: 4, marginBottom: '0.5rem' },
  error:   { color: '#c0392b' },
};

function Events() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [form, setForm]       = useState({ title: '', description: '', location: '', startTime: '', endTime: '' });

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/events`)
      .then((r) => r.json())
      .then((data) => setEvents(data))
      .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const b = await res.json(); throw new Error(b.message); }
      const created = await res.json();
      setEvents((p) => [...p, created]);
      setForm({ title: '', description: '', location: '', startTime: '', endTime: '' });
    } catch (err) {
      setError(err.message || 'Failed to create event');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/events/${id}`, { method: 'DELETE' });
      setEvents((p) => p.filter((ev) => ev._id !== id));
    } catch {
      setError('Failed to delete event');
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Volunteer Events</h2>

      {error   && <p style={styles.error}>{error}</p>}
      {loading && <p>Loading…</p>}

      <h3 style={styles.subhead}>Create New Event</h3>
      <form onSubmit={handleCreate} style={styles.form}>
        <label style={styles.label}>Title *</label>
        <input style={styles.input} name="title"       value={form.title}       onChange={handleChange} required />

        <label style={styles.label}>Description</label>
        <input style={styles.input} name="description" value={form.description} onChange={handleChange} />

        <label style={styles.label}>Location *</label>
        <input style={styles.input} name="location"    value={form.location}    onChange={handleChange} required />

        <label style={styles.label}>Start Time *</label>
        <input style={styles.input} type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} required />

        <label style={styles.label}>End Time *</label>
        <input style={styles.input} type="datetime-local" name="endTime"   value={form.endTime}   onChange={handleChange} required />

        <button type="submit" style={styles.btn}>Create Event</button>
      </form>

      <h3 style={styles.subhead}>All Events</h3>
      {events.length === 0 ? (
        <p>No events yet. Create one above.</p>
      ) : (
        events.map((ev) => (
          <div key={ev._id} style={styles.card}>
            <div>
              <strong>{ev.title}</strong>
              <span style={{ marginLeft: '0.8rem', color: '#555', fontSize: '0.9rem' }}>
                {ev.location} &bull; {new Date(ev.startTime).toLocaleString()}
              </span>
              <span style={{ marginLeft: '0.8rem', fontSize: '0.8rem', color: ev.status === 'OPEN' ? 'green' : '#888' }}>
                [{ev.status}]
              </span>
            </div>
            <button style={styles.delBtn} onClick={() => handleDelete(ev._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Events;
