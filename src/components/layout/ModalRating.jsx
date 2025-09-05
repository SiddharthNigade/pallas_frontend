const ModalDialog = ({
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Save",
  confirmColor = "blue",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <div className="mb-6">{children}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-lg bg-${confirmColor}-600 px-4 py-2 text-sm font-medium text-white hover:bg-${confirmColor}-700`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalDialog;
