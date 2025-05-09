import { useState, useEffect } from 'react';

function ShopsPage() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    // Fetch all shops from backend
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:5000/allShops');
        const data = await response.json();

        if (response.ok) {
          setShops(data.data); // Setting the fetched shops to state
        } else {
          console.error('Failed to fetch shops:', data.message);
        }
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="shopsPage">
      <h1 style={{color:"black"}}>All Shops</h1>
      <div className="shopCardsContainer">
        {shops.map((shop) => (
          <div className="shopCard" key={shop._id}>
            <h2>{shop.shopName}</h2>
            <p><strong>Owner:</strong> {shop.name}</p>
            <p><strong>Address:</strong> {shop.shopAddress}</p>
            <p><strong>Status:</strong> {shop.status || 'Not updated'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopsPage;
