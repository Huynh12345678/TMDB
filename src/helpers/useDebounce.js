//custom hook
import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {  //cái này là setTimeout chứ éo phải Debounce thật đâu
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay])
    return debouncedValue;
};

export default useDebounce;