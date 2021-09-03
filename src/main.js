import { createApp } from "vue";
import "@/assets/styles/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTwitter,
  faFacebookSquare,
  faLinkedin,
  faPinterestSquare,
  faVimeo,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPhone,
  faEnvelope,
  faBars,
  faTimes,
  faStar,
  faSort,
  faSortUp,
  faSortDown,
  faCaretUp,
  faCaretDown,
  faCaretLeft,
  faFileDownload,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { faFilePdf, faFileAlt } from "@fortawesome/free-regular-svg-icons";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";

library.add(
  faPhone,
  faEnvelope,
  faTwitter,
  faBars,
  faTimes,
  faFacebookSquare,
  faLinkedin,
  faPinterestSquare,
  faVimeo,
  faStar,
  faSort,
  faSortUp,
  faSortDown,
  faCaretUp,
  faCaretDown,
  faCaretLeft,
  faFileDownload,
  faFile,
  faFilePdf,
  faFileAlt
);

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);
const app = createApp(App);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  app.component(componentName, componentConfig.default || componentConfig);
});

app
  .use(store)
  .use(router)
  .use(library)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
