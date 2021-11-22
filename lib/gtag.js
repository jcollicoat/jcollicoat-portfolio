export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

// Pageviews
export const pageview = (url) => {
  window.gtag("config", "G-5XCP7HJZZ4", {
    page_path: url,
  });
};

// Events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
