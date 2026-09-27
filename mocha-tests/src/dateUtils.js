const formatDate = (date, sep = '-') => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${sep}${m}${sep}${day}`;
};

const daysBetween = (a, b) => {
  const ms = Math.abs(new Date(b) - new Date(a));
  return Math.floor(ms / (1000 * 60 * 60 * 24));
};

const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

const isWeekend = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
};

const startOfMonth = (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

const endOfMonth = (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
};

const isSameDay = (a, b) => formatDate(a) === formatDate(b);

const getQuarter = (date) => Math.ceil((new Date(date).getMonth() + 1) / 3);

module.exports = { formatDate, daysBetween, addDays, isWeekend, startOfMonth, endOfMonth, isSameDay, getQuarter };
