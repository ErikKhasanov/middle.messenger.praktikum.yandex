import Handlebars from "handlebars";
import tpl from "./500.hbs";

export default () => {
  return Handlebars.compile(tpl())();
};
