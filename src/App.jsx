import React, { useState, useEffect } from "react";
import api from "./components/api/api";
import Navbar from "./components/layout/Navbar";
import PageShell from "./components/layout/PageShell";
import RestaurantGrid from "./components/restaurants/RestaurantGrid";
import RestaurantCard from "./components/restaurants/RestaurantCard";
import RestaurantForm from "./components/restaurants/RestaurantForm";
import Pagination from "./components/layout/Pagination";
const App = () => {
  const [data, setData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const res = await api.get("/restaurants/", {
        params: { page, size: 6 },
      });
      setData(res.data || []);
    } catch (e) {
      console.error("Error fetching data", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDeleteFromList = (id) => {
    setData((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddRestaurant = (newRestaurant) => {
    setData((prev) => [newRestaurant, ...prev]);
  };

  return (
    <>
      <Navbar onAddClick={() => setOpenForm(true)} />
      <PageShell>
        <RestaurantGrid>
          {data.map((r) => (
            <RestaurantCard
              key={r.id}
              id={r.id}
              name={r.name}
              type_of_cuisine={r.type_of_cuisine}
              location={r.location}
              description={r.description}
              rating={r.rating}
              price={r.price}
              image_url={r.image_url}
              onDelete={handleDeleteFromList}
            />
          ))}
        </RestaurantGrid>
        <Pagination page={page} setPage={setPage} />
      </PageShell>
      {openForm && (
        <RestaurantForm
          onClose={() => setOpenForm(false)}
          onAdd={handleAddRestaurant}
        />
      )}
    </>
  );
};

export default App;
