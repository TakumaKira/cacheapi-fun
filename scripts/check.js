export default function check() {
  const cacheAvailable = 'caches' in self;
  if (!cacheAvailable) {
    throw new Error("This browser doesn't support Cache API");
  }
  console.log("This browser supports Cache API!");
}
