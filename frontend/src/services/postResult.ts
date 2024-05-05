import axios from 'axios';

export async function postResult({
  uname,
  uid,
  wpm,
  words,
}: {
  uname: string;
  uid: number;
  wpm: number;
  words: number;
}) {
  try {
    console.log(wpm);
    const { data } = await axios({
      data: {
        uname,
        uid,
        wpm,
        words,
      },
      method: 'POST',
      url: `http://localhost:3000/api/result`,
    });

    return data;
  } catch (error) {
    console.error('error: ', error);
  }
}

// export default postComment;
