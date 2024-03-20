import { useState, useEffect } from "react";
type TimeLeftProps = {
  timeoutDate: Date;
};

export const TimeLeft = ({ timeoutDate }: TimeLeftProps) => {
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    const calculateDifference = () => {
      const now = new Date();
      const targetDate = new Date(timeoutDate);
      const diff = +targetDate - +now;
      setDifference(diff);
    };

    calculateDifference();

    const timer = setInterval(calculateDifference, 1000);

    return () => clearInterval(timer);
  }, [timeoutDate]);

  if (difference <= 0) {
    return null;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return (
    <span>
      {days}d {hours}h {minutes}m {seconds}s
    </span>
  );
};
