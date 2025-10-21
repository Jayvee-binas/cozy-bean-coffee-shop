const API_BASE_URL = 'http://localhost:3001';

export const api = {
  // Orders
  getOrders: () => fetch(`${API_BASE_URL}/orders`).then(res => res.json()),
  createOrder: (order) => fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  }),
  updateOrder: (id, updates) => fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  }),

  // Contacts
  getContacts: () => fetch(`${API_BASE_URL}/contacts`).then(res => res.json()),
  createContact: (contact) => fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  }),
  updateContact: (id, updates) => fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  }),

  // Reservations
  getReservations: () => fetch(`${API_BASE_URL}/reservations`).then(res => res.json()),
  createReservation: (reservation) => fetch(`${API_BASE_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation)
  }),
  updateReservation: (id, updates) => fetch(`${API_BASE_URL}/reservations/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
};
