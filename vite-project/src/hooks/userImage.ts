const useImage = (name: string) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
}
export default useImage