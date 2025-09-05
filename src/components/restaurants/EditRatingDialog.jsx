import { useState } from "react";
import RatingStars from "../common/RatingStars";

const EditRatingDialog = ({ initialRating, onClose, onSave }) => {
  const [rating, setRating] = useState(initialRating);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Rating</h2>

        <RatingStars value={rating} onChange={setRating} />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(rating)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditRatingDialog;
