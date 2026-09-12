/* Compatibility exports for older imports. The material curves are owned by
   @pathscale/ui; js.software must not carry a second implementation. */
export {
  GLASS_DEFAULTS,
  GLASS_LIMITS,
  resolveGlassThemeValues as resolveGlassCssVariables,
  tuningFromTheme,
} from "./glassTokens";
