function generateString(size: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resetCode = '';

  for (let i = 0; i < size; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    resetCode += characters.charAt(randomIndex);
  }
  return resetCode;
}

export default generateString
