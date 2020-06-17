import { scrollTo } from 'scrollsnap-carousel';

export const useScroll = ({ ref }) => (index) =>
  scrollTo({ root: ref.current, index });
