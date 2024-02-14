export const trimstring=(str)=> {
    // Trim whitespace from left and right, then replace consecutive whitespace between words with a single space
    return str.trim().replace(/\s+/g, ' ');
  }