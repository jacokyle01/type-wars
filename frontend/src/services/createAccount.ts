import axios from 'axios';

export async function createAccount({
  username,
  forename,
  surname,
  email,
}: {
  username: string;
  forename: string;
  surname: string;
  email: string;
}) {
  try {
    const { data } = await axios({
      data: {
        username,
        forename,
        surname,
        email,
      },
      method: 'POST',
      url: `http://localhost:3000/api/user`,
    });

    return data;
  } catch (error) {
    console.error('error: ', error);
  }
}
