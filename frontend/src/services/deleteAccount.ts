import axios from 'axios';

export async function deleteAccount({ id }: { id: number }) {
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/user/${id}`,
    });

    return data;
  } catch (error) {
    console.error('error: ', error);
  }
}
