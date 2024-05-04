import axios from "axios";

async function userSignUp({ username, email, forename, surname } : 
                          { username: string, email: string, forename: string, surname: string}) {
  try {
    const { data } = await axios({
      data: { user: { username, email, forename, surname } },
      method: "POST",
      url: "http://localhost:3000/api/user",
    });

    const { user } = data;


    return user;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default userSignUp;