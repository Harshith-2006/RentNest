import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { submitReport } from "@/services/api";
import { useToast } from "@/context/ToastContext";

export default function ReportListingModal({ open, onClose, listing }) {
  const { toast } = useToast();
  const [reason, setReason] = useState("misleading_photos");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitReport({
        listingId: listing?.id,
        reason,
        details,
      });
      toast({ message: "Thanks — your report was submitted.", type: "success" });
      setDetails("");
      onClose?.();
    } catch {
      toast({ message: "Could not submit report. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Report this listing" size="md">
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Flag suspicious or inaccurate listings. Our trust team reviews every report.
      </p>
      {listing && (
        <p className="mb-4 rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
          <span className="font-semibold text-slate-900 dark:text-white">{listing.title}</span>
          <span className="text-slate-500 dark:text-slate-400"> · {listing.location}</span>
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Reason</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="misleading_photos">Photos don’t match the home</option>
            <option value="scam">Suspected scam or fraud</option>
            <option value="wrong_price">Incorrect price or fees</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Details</label>
          <textarea
            required
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="What should we know?"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-brand-500/30 focus:border-brand-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit report"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
