export function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
}
