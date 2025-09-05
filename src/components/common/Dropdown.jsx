import { useState, useRef, useEffect } from "react";

const Dropdown = ({ button, items = [] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
        onClick={() => setOpen((o) => !o)}
      >
        {button}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-md border-s-black bg-white shadow-lg z-10">
          {items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className={`block w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-md ${
                item.danger ? "text-red-600" : "text-gray-700"
              }`}
              onClick={() => {
                setOpen(false);
                if (item.onClick) item.onClick();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
