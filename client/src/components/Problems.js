import React, { useState, useEffect } from 'react';
import './Problems.css';

const Problems = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserQueries();
  }, []);

    const fetchUserQueries = async () => {
    try {
      const response = await fetch('/api/v1/queries', {
        method: 'GET',
        credentials: 'include', // required if backend uses cookies for auth
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setQueries(data);
      } else {
        console.error('Failed to fetch queries');
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      setLoading(false);
    }
  };

   const handleChangeStatus = async (queryId, currentStatus) => {
    const newStatus = currentStatus === 'done' ? 'in process' : 'done';
    try {
      const response = await fetch('/api/v1/change-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ queryId, status: newStatus })
      });
      if (response.ok) {
        fetchUserQueries();
      } else {
        alert('Failed to change status');
      }
    } catch (error) {
      alert('Error changing status');
    }
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

  return (
    <div className="user-queries-page">
      <h1>All Problems</h1>

      {loading ? (
        <p>Loading your queries...</p>
      ) : queries.length === 0 ? (
        <div className="no-queries">
          <p>📝 No Problems Submmited Yet.</p>
        </div>
      ) : (
        <div className="queries-list">
          {queries.map((query) => (
            <div key={query._id} className="query-card">
              <div className="query-card-header">
                <h5>Name : {query.name}</h5>
                <h5>Title : {query.title}</h5>
                <span className="query-date">{formatDate(query.createdAt)}</span>
              </div>
              <p className="query-description">Description: {query.desc}</p>
              <div className="query-meta">
                <span>Phone Number : {query.mobileNo}</span>
                <span className={`status-badge ${query.status === 'done' ? 'completed' : 'pending'}`}>
                 Status :  {query.status}
                </span>
                <button
                  style={{ marginLeft: '10px', padding: '4px 10px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}
                  onClick={() => handleChangeStatus(query._id, query.status)}
                  className={`status-badge ${query.status === 'done' ? 'pending' : 'completed'}`}
                >
                  {query.status === 'done' ? 'Change status to in process' : 'Change status to done'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Problems;
