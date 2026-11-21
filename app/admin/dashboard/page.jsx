'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './Dashboard.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeLead, setActiveLead] = useState(null);

  // Pagination States (50 enquiries per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Fetch enquiries from MongoDB API
  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    }
  }, []);

  // Auth Guard & Live Auto Polling (Every 4 seconds)
  useEffect(() => {
    const isAuth = sessionStorage.getItem('vt_admin_auth');
    if (!isAuth) {
      router.replace('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchLeads();

      const interval = setInterval(() => {
        fetchLeads();
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [router, fetchLeads]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  if (!isAuthenticated) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#03130e' }} />;
  }

  // Update enquiry status via PUT API
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prevLeads) =>
          prevLeads.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      } else {
        alert('Could not update status: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Delete enquiry via DELETE API
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prevLeads) => prevLeads.filter((item) => item.id !== id));
        if (activeLead && activeLead.id === id) {
          setActiveLead(null);
        }
      } else {
        alert('Could not delete enquiry: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('vt_admin_auth');
    router.replace('/admin/login');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  // Filter and Search
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filter === 'All' || lead.status === filter;
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.destination.toLowerCase().includes(search.toLowerCase()) ||
      lead.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;

  return (
    <div className="vt-dash">
      <header className="vt-dash-nav">
        <div className="vt-dash-brand">
          <span className="vt-dash-logo">
            VAYUYATRA <span>INDIA</span>
          </span>
          <span className="vt-dash-tag">Flights • Volvo • Yatra Desk</span>
        </div>

        <div className="vt-dash-right">
          <Link href="/" className="vt-back-site-btn">
            ← View Live Website
          </Link>

          <button onClick={handlePrintPDF} className="vt-logout-btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            🖨️ Save PDF
          </button>

          <div className="vt-agent-pill">
            <span className="vt-agent-dot"></span>
            Travel Desk Admin
          </div>

          <button onClick={handleLogout} className="vt-logout-btn">
            Logout ⎋
          </button>
        </div>
      </header>

      <main className="vt-dash-body">
        <div className="vt-dash-header">
          <div>
            <h1>Customer Enquiries &amp; Bookings</h1>
            <p>Manage Indian flight bookings, Volvo transfers, and holiday package enquiries in real time.</p>
          </div>

          <input
            type="text"
            className="vt-search-input"
            placeholder="Search traveller, ID, or route..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="vt-stats-row">
          <div className="vt-stat-box">
            <span className="vt-stat-label">Total Enquiries</span>
            <strong className="vt-stat-num">{leads.length}</strong>
          </div>
          <div className="vt-stat-box">
            <span className="vt-stat-label">Pending Review</span>
            <strong className="vt-stat-num warn">
              {leads.filter((l) => l.status === 'Pending Review').length}
            </strong>
          </div>
          <div className="vt-stat-box">
            <span className="vt-stat-label">Quotes Sent</span>
            <strong className="vt-stat-num info">
              {leads.filter((l) => l.status === 'Proposal Sent').length}
            </strong>
          </div>
          <div className="vt-stat-box">
            <span className="vt-stat-label">Confirmed Trips</span>
            <strong className="vt-stat-num success">
              {leads.filter((l) => l.status === 'Confirmed').length}
            </strong>
          </div>
        </div>

        <div className="vt-filter-bar">
          {['All', 'Pending Review', 'Proposal Sent', 'Confirmed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`vt-tab-btn ${filter === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="vt-table-card">
          <table className="vt-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Details</th>
                <th>Route / Package</th>
                <th>Travellers</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.length > 0 ? (
                currentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong className="vt-id">{lead.id}</strong>
                      <span className="vt-date">{lead.date}</span>
                    </td>
                    <td>
                      <div className="vt-client-name">{lead.name}</div>
                      <div className="vt-client-sub">
                        {lead.phone} | {lead.email}
                      </div>
                    </td>
                    <td>
                      <span className="vt-dest-badge">{lead.destination}</span>
                    </td>
                    <td>{lead.guests}</td>
                    <td>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`vt-status-dropdown ${lead.status
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    </td>
                    <td>
                      <div className="vt-row-actions">
                        <button
                          className="vt-inspect-btn"
                          onClick={() => setActiveLead(lead)}
                        >
                          Details
                        </button>
                        <button
                          className="vt-del-btn"
                          onClick={() => handleDelete(lead.id)}
                          title="Delete Enquiry"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="vt-empty">
                    No customer enquiries found for this filter or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#8a9992', fontSize: '13px' }}>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredLeads.length)} of {filteredLeads.length} entries
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 14px',
                    background: currentPage === 1 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.08)',
                    color: currentPage === 1 ? '#4a5952' : '#fff',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  Previous
                </button>
                <span style={{ color: '#fff', alignSelf: 'center', fontSize: '13px', padding: '0 8px' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 14px',
                    background: currentPage === totalPages ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.08)',
                    color: currentPage === totalPages ? '#4a5952' : '#fff',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '4px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {activeLead && (
        <div className="vt-modal-overlay" onClick={() => setActiveLead(null)}>
          <div className="vt-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="vt-modal-head">
              <div>
                <span className="vt-modal-eyebrow">Customer Trip Details</span>
                <h3>{activeLead.id} — {activeLead.name}</h3>
              </div>
              <button className="vt-modal-close" onClick={() => setActiveLead(null)}>
                ✕
              </button>
            </div>

            <div className="vt-modal-content">
              <div className="vt-detail-grid">
                <div>
                  <span>Phone / WhatsApp</span>
                  <strong>{activeLead.phone}</strong>
                </div>
                <div>
                  <span>Email Address</span>
                  <strong>{activeLead.email}</strong>
                </div>
                <div>
                  <span>Selected Route / Package</span>
                  <strong>{activeLead.destination}</strong>
                </div>
                <div>
                  <span>Travellers</span>
                  <strong>{activeLead.guests}</strong>
                </div>
              </div>

              <div className="vt-notes-box">
                <span>Travel Dates &amp; Notes</span>
                <p>{activeLead.notes || 'No extra notes provided by customer.'}</p>
              </div>
            </div>

            <div className="vt-modal-foot">
              <a
                href={`https://wa.me/${activeLead.phone ? activeLead.phone.replace(/[^0-9]/g, '') : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="vt-wa-btn"
              >
                Chat on WhatsApp →
              </a>
              <button className="vt-close-btn" onClick={() => setActiveLead(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}