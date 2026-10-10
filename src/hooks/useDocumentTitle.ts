import { useEffect } from "react";
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} — AgriSense`
      : "AgriSense — Smart farming starts here";
  }, [title]);
}
