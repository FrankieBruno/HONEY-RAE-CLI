export const getToken = () => {
  const auth = localStorage.getItem("honeyrae")
  return JSON.parse(auth).token
}
