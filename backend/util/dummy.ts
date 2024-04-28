export const dummyResult = () => {
  const random = Math.floor(Math.random() * 100) + 1; 
  const times = [15, 30, 60];
  return {
    uid: random % 20,
    wpm: random % 50 + 50,
    timeControl: (times[random % 3] || 0),
    createdAt: Date.now()
  }
}