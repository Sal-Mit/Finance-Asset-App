import { useEffect } from 'react';

const useScrollLockHorizontally = (ref) => {
    useEffect(() => {
        if (ref.current) {
            const originalOverflowX = window.getComputedStyle(ref.current).overflowX;
            ref.current.style.overflowX = 'hidden';

            return () => {
                ref.current.style.overflowX = originalOverflowX;
            };
        }
    }, [ref]);
};

export default useScrollLockHorizontally;
