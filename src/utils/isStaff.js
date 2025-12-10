export const isStaff = () => {
  const auth = localStorage.getItem("honeyrae")
  const userType = JSON.parse(auth)
  return userType?.staff
}
