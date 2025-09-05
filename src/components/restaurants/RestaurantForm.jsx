import { useState } from "react";
import api from "../api/api";

const RestaurantForm = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    type_of_cuisine: "",
    location: "",
    image_url: "",
    description: "",
    rating: 0,
    price: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/restaurants/", form);
      console.log("Res", res);
      if (res.status === 201) {
        onAdd(res.data);
        onClose();
      } else {
        alert("Failed to add restaurant.");
      }
    } catch (err) {
      console.error("Add restaurant failed:", err);
      alert("Something went wrong.", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 sm:w-full sm:max-w-md  max-h-[90vh] overflow-y-auto rounded-xl bg-white px-4 py-3 sm:px-6 sm:py-4 shadow-lg space-y-3 "
      >
        <h2 className="text-lg font-semibold">Add Restaurant</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <select
          name="type_of_cuisine"
          value={form.type_of_cuisine}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="" hidden>
            Select Cuisine
          </option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinsese</option>
          <option value="Indian">India</option>
        </select>

        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select location
          </option>
          <option value="California">California</option>
          <option value="New York">New York</option>
          <option value="Texas">Texas</option>
        </select>

        <input
          type="url"
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        <select
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default RestaurantForm;
