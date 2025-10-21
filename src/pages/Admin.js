import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    fetchOrders();
    fetchContacts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      await fetch(`http://localhost:3001/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      fetchContacts();
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5" style={{color: '#8b5a3c', fontFamily: 'Playfair Display, serif'}}>
        Admin Dashboard
      </h1>
      
      <div className="row">
        <div className="col-12">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders ({orders.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'contacts' ? 'active' : ''}`}
                onClick={() => setActiveTab('contacts')}
              >
                Contact Messages ({contacts.length})
              </button>
            </li>
          </ul>
        </div>
      </div>

      {activeTab === 'orders' && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Recent Orders</h5>
              </div>
              <div className="card-body">
                {orders.length === 0 ? (
                  <p className="text-muted">No orders found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Order Details</th>
                          <th>Pickup Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={order.id || index}>
                            <td>#{order.id || index + 1}</td>
                            <td>{order.orderName}</td>
                            <td>{order.orderEmail}</td>
                            <td>{order.orderPhone}</td>
                            <td>
                              {order.orderQuantity}x {order.orderType} ({order.orderSize})
                              {order.orderMilk !== 'regular' && <br />}
                              {order.orderMilk !== 'regular' && `Milk: ${order.orderMilk}`}
                              {order.orderSugar !== 'normal' && <br />}
                              {order.orderSugar !== 'normal' && `Sugar: ${order.orderSugar}`}
                              {order.orderNotes && <br />}
                              {order.orderNotes && `Notes: ${order.orderNotes}`}
                            </td>
                            <td>{order.pickupTime}</td>
                            <td>
                              <span className={`badge ${
                                order.status === 'pending' ? 'bg-warning' :
                                order.status === 'preparing' ? 'bg-info' :
                                order.status === 'ready' ? 'bg-success' :
                                'bg-secondary'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                                  disabled={order.status !== 'pending'}
                                >
                                  Preparing
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => updateOrderStatus(order.id, 'ready')}
                                  disabled={order.status === 'ready'}
                                >
                                  Ready
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Contact Messages</h5>
              </div>
              <div className="card-body">
                {contacts.length === 0 ? (
                  <p className="text-muted">No contact messages found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact, index) => (
                          <tr key={contact.id || index}>
                            <td>#{contact.id || index + 1}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone || 'N/A'}</td>
                            <td>{contact.subject}</td>
                            <td>
                              <div style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                {contact.message}
                              </div>
                            </td>
                            <td>{new Date(contact.date).toLocaleDateString()}</td>
                            <td>
                              <span className={`badge ${
                                contact.status === 'new' ? 'bg-primary' :
                                contact.status === 'read' ? 'bg-info' :
                                contact.status === 'replied' ? 'bg-success' :
                                'bg-secondary'
                              }`}>
                                {contact.status}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-sm btn-outline-info"
                                  onClick={() => updateContactStatus(contact.id, 'read')}
                                  disabled={contact.status !== 'new'}
                                >
                                  Mark Read
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => updateContactStatus(contact.id, 'replied')}
                                  disabled={contact.status === 'replied'}
                                >
                                  Replied
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
