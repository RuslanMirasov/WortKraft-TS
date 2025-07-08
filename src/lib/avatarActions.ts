// import { fetcher } from '@/lib/fetcher';
// import { loadFirebase } from '@/lib/firebase/loadFirebase';
// import { authenticateWithFirebase } from '@/lib/firebase/authenticateWithFirebase';
// import { optimizeImage } from './optimizeImage';

// export const uploadAvatar = async (file: File, id: string) => {
//   const auth = await authenticateWithFirebase(id);
//   if (!auth) return;

//   const compressedFile = await optimizeImage(file);
//   const { storage, ref, uploadBytes, getDownloadURL } = await loadFirebase();
//   const storageRef = ref(storage, `avatars/avatar_${id}.webp`);

//   await uploadBytes(storageRef, compressedFile);
//   const downloadURL = await getDownloadURL(storageRef);

//   await fetcher('/api/auth/profile', {
//     method: 'PATCH',
//     data: { image: downloadURL },
//   });
// };

// export const deleteAvatar = async (id: string) => {
//   const { storage, ref, getMetadata, deleteObject } = await loadFirebase();
//   const storageRef = ref(storage, `avatars/avatar_${id}.webp`);

//   const fileExists = await getMetadata(storageRef)
//     .then(() => true)
//     .catch(() => false);

//   if (!fileExists) return;

//   const auth = await authenticateWithFirebase(id);
//   if (!auth) return;

//   await deleteObject(storageRef);
// };

export const avatarSignature = (name: string): string => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
