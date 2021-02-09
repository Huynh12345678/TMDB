//custom hook
import { WOW } from 'wowjs';
export const useWow = () => {
    const wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animate__animated',
        offset: 0,
        mobile: false,
        live: false
    })
    wow.init();
}