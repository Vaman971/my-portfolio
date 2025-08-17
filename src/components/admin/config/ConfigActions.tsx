"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Save } from "lucide-react";

type Props = {
  saving: boolean;
  onSave: () => void;
  onDelete?: () => void;
  hasConfig: boolean;
};

export default function ConfigActions({ saving, onSave, onDelete, hasConfig }: Props) {
  return (
    <div className="sticky bottom-4 z-10">
      <div className="mx-auto max-w-3xl rounded-xl border bg-card/80 backdrop-blur p-3 shadow-lg">
        <div className="flex items-center justify-end gap-3">
          {hasConfig && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
          <Button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : hasConfig ? "Update Config" : "Create Config"}
          </Button>
        </div>
      </div>
    </div>
  );
}
