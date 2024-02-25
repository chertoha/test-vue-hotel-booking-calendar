export const calcPopupPosition = (x, y) => {
  return {
    x,
    y,
    left: x <= window.innerWidth / 2,
    top: y <= window.innerHeight / 2,
  };
};
