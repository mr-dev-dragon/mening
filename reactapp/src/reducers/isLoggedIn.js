export default function (isLoggedIn = false, action) {
  if (action.type === "setIsLoggedIn") {
    return true;
  } else if (action.type === "setIsLoggedOut") {
    return false;
  } else {
    return isLoggedIn;
  }
}
