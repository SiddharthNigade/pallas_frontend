import { FaStar, FaRegStar } from "react-icons/fa";

const RatingStars = ({ value = 0, onChange, readOnly = false }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        const Icon = filled ? FaStar : FaRegStar;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange(i + 1)}
            className={`h-5 w-5 ${
              filled ? "text-yellow-500" : "text-gray-300"
            } ${!readOnly && "hover:text-yellow-400"}`}
            aria-label={`${i + 1} star${i === 0 ? "" : "s"}`}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
