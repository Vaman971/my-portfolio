"use client";

import { toast } from "sonner";

export function confirmToast(
  message: string,
  onConfirm: () => void | Promise<void>,
  onCancel?: () => void
) {
  toast.custom(
    (t) => (
      <div className="w-full max-w-sm flex flex-col gap-3 p-3 rounded-lg bg-white shadow-md">
        <p className="text-sm text-gray-800">
          {message} <br />
          <span className="text-xs text-gray-500">(This action cannot be undone)</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            className="w-full sm:w-auto px-3 py-1.5 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              toast.dismiss(t);
              onCancel?.();
            }}
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-auto px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
            onClick={async () => {
              await onConfirm();
              toast.dismiss(t);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ),
    { duration: Infinity }
  );
}
