export function getDate() {
    const today = new Date();
    const sec = String(today.getUTCSeconds()).padStart(2, '0');
    const min = String(today.getUTCMinutes()).padStart(2, '0');
    const hour = String(today.getUTCHours()).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const mouth = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${mouth}-${day}T${hour}:${min}:${sec}+03:30`;
  }