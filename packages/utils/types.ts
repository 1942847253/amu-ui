export const isElement = (event: unknown): event is Element => {
  if (typeof Element === "undefined") return false;
  return event instanceof Element;
};
