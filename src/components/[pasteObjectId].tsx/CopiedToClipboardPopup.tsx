import { type Dispatch, type SetStateAction, useEffect } from "react";

interface CopiedToClipboardPopupProps {
  duration: number;
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

export const CopiedToClipboardPopup = ({
  duration,
  showPopup,
  setShowPopup,
}: CopiedToClipboardPopupProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [showPopup, setShowPopup, duration]);

  if (!showPopup) {
    return null;
  }

  return (
    <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/5 p-2 shadow-lg">
      <p className="text-xs font-bold">
        Copied to <span className="text-orange-400">clipboard</span>
      </p>
    </div>
  );
};
