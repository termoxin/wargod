export const SCALE = 2;

export const setupCanvas = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1100;
  canvas.height = 500;

  const pixelRatio = window.devicePixelRatio || 1;

  // lets scale the canvas and change its CSS width/height to make it high res.
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
  canvas.width *= pixelRatio;
  canvas.height *= pixelRatio;

  // Now that its high res we need to compensate so our images can be drawn as
  //normal, by scaling everything up by the pixelRatio.
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  ctx.scale(SCALE, SCALE);

  return { canvas, ctx };
};

export const { canvas, ctx } = setupCanvas();
