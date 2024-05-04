import axios from 'axios';

export async function getUser({ username }: { username: string }) {
  try {
    const { data } = await axios({
      url: `http://localhost:3000/api/user/name/${username}`,
    });
    return data;
  } catch (error) {
    console.error('error: ' + error);
    throw "oops";
  }
}
