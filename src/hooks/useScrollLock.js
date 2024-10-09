import { useEffect } from 'react';

const useScrollLock = (ref) => {
  useEffect(() => {
    const handleScroll = (event) => {
      if (ref.current) {
        ref.current.scrollTop += event.deltaY;
        event.preventDefault();
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('wheel', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('wheel', handleScroll);
      }
    };
  }, [ref]);
};

export default useScrollLock;