export type TimeoutValue = {
  value: number;
  label: string;
};

export const timeoutValues: TimeoutValue[] = [
  {
    value: 60,
    label: "1 minute",
  },
  {
    value: 300,
    label: "5 minutes",
  },
  {
    value: 600,
    label: "10 minutes",
  },
  {
    value: 1800,
    label: "30 minutes",
  },
  {
    value: 3600,
    label: "1 hour",
  },
  {
    value: 21600,
    label: "6 hours",
  },
  {
    value: 43200,
    label: "12 hours",
  },
  {
    value: 86400,
    label: "1 day",
  },
  {
    value: 259200,
    label: "3 days",
  },
  {
    value: 604800,
    label: "1 week",
  },
  {
    value: 1209600,
    label: "2 weeks",
  },
  {
    label: "1 month",
    value: 2630000,
  },
];
