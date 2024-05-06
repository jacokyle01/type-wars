import axios from 'axios';

export async function getResultFromUser({ uid }: { uid: number }) {
  try {
    const { data } = await axios({
      url: `http://localhost:3000/api/result/from/${uid}`,
    });
    return data;
  } catch (error) {
    console.error('error: ' + error);
    throw "oops";
  }
}