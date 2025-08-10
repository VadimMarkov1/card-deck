import { App} from "./core/App";
declare let __webpack_public_path__: string;
__webpack_public_path__ = process.env.NODE_ENV === 'production' ? '/card-deck/' : '/';


new App().init();
