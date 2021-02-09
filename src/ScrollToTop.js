import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
// quay về đầu trang mỗi khi pathname thay đổi (component Link)
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
