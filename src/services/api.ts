export const fetchPujas = async () => {
  const res = await fetch('/api/pujas');
  return res.json();
};

export const createBooking = async (bookingData: any) => {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  return res.json();
};

export const initiatePayment = async (amount: number) => {
  const res = await fetch('/api/payments/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  return res.json();
};
