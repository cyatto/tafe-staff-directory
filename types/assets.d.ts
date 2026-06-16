// Lets TypeScript understand what require("./something.mp3") returns.
// Metro (React Native's bundler) turns an audio require into a plain
// number under the hood — an internal asset ID — which is exactly what
// expo-audio's useAudioPlayer() expects as a source.
declare module "*.mp3" {
  const value: number;
  export default value;
}