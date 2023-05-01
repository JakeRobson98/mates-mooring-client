export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
  console.log(localStorage.getItem("ACCESS_TOKEN"))
  if (token && token.accessToken) {
    // For Spring Boot back-end
    return { Authorization: `Bearer ${token.accessToken}` };

    // for Node.js Express back-end
    //return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
