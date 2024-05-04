import axios from 'axios';

export async function changeEmail({ id, email }: { id: number; email: string }) {
  try {
    const { data } = await axios({
      data: { email },
      method: 'PUT',
      url: `http://localhost:3000/api/user/${id}`,
    });
    return data;
  } catch (error) {
    console.error('error: ' + error);
    throw 'oops';
  }
}
