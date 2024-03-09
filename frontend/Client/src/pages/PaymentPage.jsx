import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';

const PaymentPage = () => {
  const { bookingId, amount } = useParams();
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.server}/order/payment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: bookingId,
          amount,
          card_number: cardNumber,
          name_on_card: nameOnCard,
          cvv,
        }),
      });

      if (response.ok) {
        // Payment successful, redirect to success page
        window.location.href = '/userbooking';
      } else {
        console.error('Payment failed:', response.statusText);

      }
    } catch (error) {
      console.error('Error processing payment:', error);
 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Payment Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="amountInput" className="form-label">Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amountInput"
            value={amount}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardNumberInput" className="form-label">Card Number:</label>
          <input
            type="text"
            className="form-control"
            id="cardNumberInput"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nameOnCardInput" className="form-label">Name on Card:</label>
          <input
            type="text"
            className="form-control"
            id="nameOnCardInput"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvvInput" className="form-label">CVV:</label>
          <input
            type="text"
            className="form-control"
            id="cvvInput"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
