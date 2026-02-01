export const avatarSignature = (name: string | null): string | null => {
  if (!name) return null;
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
};
