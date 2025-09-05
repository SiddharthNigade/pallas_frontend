import { useState } from "react";
import Dropdown from "../common/Dropdown";
import EditRatingDialog from "./EditRatingDialog";
import api from "../api/api";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";
import RatingStars from "../common/RatingStars";
import { HiDotsVertical } from "react-icons/hi";
import { FaUtensils } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const RestaurantCard = ({
  id,
  name,
  type_of_cuisine,
  location,
  description,
  rating,
  price,
  image_url,
  onDelete,
}) => {
  const priceDisplay = "$".repeat(price || 1);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleUpdateRating = async (newRating) => {
    try {
      const res = await api.patch(`/restaurants/${id}`, { rating: newRating });
      console.log("Res", res);
      if (res.status === 200) {
        setCurrentRating(res.data.rating);
        setEditOpen(false);
      } else {
        alert("Could not update rating. Please try again.");
      }
    } catch (e) {
      console.error("Something failed", e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/restaurants/${id}`);
      if (res.status === 204) {
        if (onDelete) onDelete(id);
      } else {
        alert("Failed to delete restaurant");
      }
    } catch (e) {
      console.error("Delete failed", e);
      alert("Error deleting restaurant");
    }
  };

  return (
    <div className="rounded-xl border bg-white/50 shadow-sm hover:shadow-2xl transition overflow-hidden flex flex-col">
      <div className="relative h-60 w-full">
        <img
          src={image_url}
          alt={name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Dropdown
            button={<HiDotsVertical className="h-5 w-5 text-gray-600" />}
            items={[
              { label: "Edit", onClick: () => setEditOpen(true) },
              {
                label: "Delete",
                danger: true,
                onClick: () => setDeleteModal(true),
              },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 ">
        <h3 className="text-base font-semibold truncate">{name}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-6 mt-1">
          <span className="flex items-center gap-1">
            <FaUtensils className="text-gray-600" />
            <span className="font-medium">{type_of_cuisine}</span>
          </span>

          <span className="flex items-center gap-1">
            <MdLocationOn className="text-gray-600" />
            <span>{location}</span>
          </span>
        </p>

        {description && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <RatingStars
              value={Math.round(currentRating)}
              onChange={() => {}}
              readOnly={true}
            />
            <span className="text-sm text-gray-700">
              {currentRating.toFixed(1)}
            </span>
          </div>

          <span className="text-sm font-medium text-gray-700">
            {priceDisplay}
          </span>
        </div>
      </div>
      {editOpen && (
        <EditRatingDialog
          initialRating={currentRating}
          onClose={() => setEditOpen(false)}
          onSave={handleUpdateRating}
        />
      )}
      {deleteModal && (
        <DeleteConfirmDialog
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            handleDelete();
            setDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};
export default RestaurantCard;
