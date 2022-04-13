export default function (user = {}, action) {
  if (action.type === "userInfo") {
    return action.user;
  } else {
    return user;
  }
}
