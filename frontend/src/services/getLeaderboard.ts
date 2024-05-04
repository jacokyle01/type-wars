import axios from 'axios';

export async function getLeaderboard({ words, limit }: { words: number; limit: number }) {
  try {
    const { data } = await axios({ url: `http://localhost:3000/api/leaderboard/?words=${words}&limit=${limit}` });
    return data;
  } catch (error) {
    console.error('error: ' + error);
  }
}
