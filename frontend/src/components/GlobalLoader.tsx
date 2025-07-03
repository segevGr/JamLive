import { useAppSelector } from "../store/storeHooks";
import LoadingSpinner from "./LoadingSpinner";

export default function GlobalLoader() {
  const isLoading = useAppSelector((s) => s.loading);
  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <LoadingSpinner size="lg" />
    </div>
  ) : null;
}
