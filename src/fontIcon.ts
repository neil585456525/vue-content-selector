import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGripVertical,
  faChevronLeft,
  faArrowsAlt,
  faArrowUp,
  faArrowDown,
  faSpinner,
  faCrosshairs,
  faPaintBrush
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faGripVertical,
  faChevronLeft,
  faPaintBrush,
  faArrowsAlt,
  faArrowUp,
  faArrowDown,
  faSpinner,
  faCrosshairs
);

export { FontAwesomeIcon };
