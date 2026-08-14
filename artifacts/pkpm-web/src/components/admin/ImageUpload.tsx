import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  placeholder?: string;
  /** "image" | "file" — controls preview rendering */
  type?: "image" | "file";
}

export default function ImageUpload({
  value,
  onChange,
  label,
  accept = "image/*",
  placeholder = "https://... atau upload file",
  type = "image",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const isOwnUpload = value.startsWith("/uploads/");

  async function handleFile(file: File) {
    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal 5 MB");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${BASE}/api/admin/upload`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error((err as { error?: string }).error ?? res.statusText);
      }
      const { url } = (await res.json()) as { url: string };
      onChange(url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  const inp =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2558]/40";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* URL text input */}
      <div className="flex gap-2">
        <input
          className={inp + " flex-1"}
          value={value}
          onChange={(e) => { setUploadError(""); onChange(e.target.value); }}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-60 whitespace-nowrap"
          title="Upload file"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {uploading ? "Upload..." : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {uploadError && (
        <p className="text-red-600 text-xs bg-red-50 rounded px-2 py-1">{uploadError}</p>
      )}

      {/* Preview */}
      {value && type === "image" && (
        <div
          className="relative w-full h-32 border border-gray-100 rounded-lg overflow-hidden bg-gray-50 group"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <img
            src={isOwnUpload ? `${BASE}${value}` : value}
            alt="Preview"
            className="w-full h-full object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full p-0.5 shadow opacity-0 group-hover:opacity-100 transition-opacity"
            title="Hapus gambar"
          >
            <X className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      )}

      {value && type === "file" && (
        <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 rounded px-3 py-1.5">
          <span className="truncate">{value}</span>
          <button type="button" onClick={() => onChange("")} className="ml-auto flex-shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
