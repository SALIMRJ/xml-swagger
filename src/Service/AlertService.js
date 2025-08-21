const subscribers = [];

export const AlertService = {
  show(message, type = "info") {
    subscribers.forEach((cb) => cb({ message, type }));
  },
  subscribe(callback) {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index > -1) subscribers.splice(index, 1);
    };
  },
};
