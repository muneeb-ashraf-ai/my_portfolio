const PROFILE_IMAGE_SRC = '/assets/profile.webp';

let profileImagePreloaded = false;
let preloadPromise: Promise<boolean> | null = null;

const setImageFetchPriority = (image: HTMLImageElement) => {
  (image as HTMLImageElement & { fetchPriority?: 'high' | 'low' | 'auto' }).fetchPriority = 'high';
};

export const getProfileImageSrc = (): string => PROFILE_IMAGE_SRC;

export const isProfileImagePreloaded = (): boolean => profileImagePreloaded;

export const preloadProfileImage = (): Promise<boolean> => {
  if (profileImagePreloaded) {
    return Promise.resolve(true);
  }

  if (preloadPromise) {
    return preloadPromise;
  }

  preloadPromise = new Promise<boolean>((resolve) => {
    const image = new Image();
    let settled = false;

    const finalize = (loaded: boolean) => {
      if (settled) {
        return;
      }
      settled = true;
      if (loaded) {
        profileImagePreloaded = true;
      }
      resolve(loaded);
    };

    image.decoding = 'async';
    setImageFetchPriority(image);

    image.onload = () => finalize(true);
    image.onerror = () => finalize(false);

    image.src = PROFILE_IMAGE_SRC;

    if (image.complete) {
      if (typeof image.decode === 'function') {
        image.decode().then(
          () => finalize(image.naturalWidth > 0),
          () => finalize(image.naturalWidth > 0),
        );
      } else {
        finalize(image.naturalWidth > 0);
      }
    }
  }).finally(() => {
    if (!profileImagePreloaded) {
      preloadPromise = null;
    }
  });

  return preloadPromise;
};
