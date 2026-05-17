import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Query.css';

const Query = () => {
  const [queries, setQueries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [queriesLoading, setQueriesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserQueries();
  }, []);

  const fetchUserQueries = async () => {
    try {
      const response = await fetch('/api/v1/user-queries', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setQueries(data);
      } else {
        console.error('Failed to fetch queries');
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      setQueriesLoading(false);
    }
  };

  const validatePhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!phoneNumber || !title || !description || !name) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (title.trim().length < 5) {
      setError('Title must be at least 5 characters long.');
      return;
    }

    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/v1/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          phoneNumber: phoneNumber.replace(/\D/g, ''),
          title: title.trim(),
          description: description.trim(),
          name: name.trim(),
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError('Please login first to submit a query.');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setError(data.error || 'Failed to submit query. Please try again.');
        }
      } else {
        setSuccess('Your query has been submitted successfully! We will get back to you soon.');
        setPhoneNumber('');
        setTitle('');
        setDescription('');
        setShowForm(false);
        // Refresh the queries list
        fetchUserQueries();
      }
    } catch (err) {
      console.error('Query submission error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/[^\d\s\-\(\)]/g, '');
    setPhoneNumber(cleaned);
  };
 const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const QueryForm = () => (
    <div className="query-form-overlay">
      <div className="query-form-modal">
        <div className="form-header">
          <h2>Submit New Query</h2>
          <button 
            className="close-btn" 
            onClick={() => setShowForm(false)}
          >
            ×
          </button>
        </div>
        
        <form className="query-form" onSubmit={handleSubmit}>
          {error && <div className="query-error">{error}</div>}
          {success && <div className="query-success">{success}</div>}
          
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number</label>
            <div className="phone-input">
              <span className="phone-prefix">+91</span>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter your 10-digit phone number"
                autoComplete="tel"
                required
              />
            </div>
          </div>

            <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="name">
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="problem-title">Title of Problem</label>
            <input
              type="text"
              id="problem-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief title describing your issue"
              autoComplete="off"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="problem-description">Description of Problem</label>
            <textarea
              id="problem-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide a detailed description of your problem or question..."
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Query'}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="query-page">
      <div className="query-header">
        <h1>My Queries</h1>
        <button 
          className="add-query-btn"
          onClick={() => setShowForm(true)}
        >
          + Add New Query
        </button>
      </div>

      {queriesLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your queries...</p>
        </div>
      ) : queries.length === 0 ? (
        <div className="no-queries">
          <div className="no-queries-icon">📝</div>
          <h3>No queries yet</h3>
          <p>You haven't submitted any queries yet. Click the button above to submit your first query.</p>
        </div>
      ) : (
        <div className="queries-list">
          {queries.map((query) => (
            <div key={query._id} className="query-card">
              <div className="query-header">
                <h4>{query.name}</h4>
                <h3>{query.title}</h3>
                <span className="query-date">{formatDate(query.createdAt)}</span>
              </div>
              <div className="query-details">
                <p className="query-description">{query.desc}</p>
                <div className="query-meta">
                  <span className="query-phone">📱 {query.mobileNo}</span>
                  <span className="query-status">{query.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && <QueryForm />}
    </div>
  );
};

export default Query;
