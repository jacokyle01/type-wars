export const dummyResult = () => {
  const random = Math.floor(Math.random() * 100) + 1; 
  const names = ['Amy', 'Bender', 'Fry', 'Farnsworth', 'Scruffy'];
  const words = [25, 50, 100, 150, 200];
  return {
    uname: (names[random % 5] || 'Foo'),
    uid: random % 20,
    wpm: random % 50 + 50,
    words: (words[random % 5] || 0),
    createdAt: Date.now(),
  }
}