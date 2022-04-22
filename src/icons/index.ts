import { createApp } from "vue";
import SvgIcon from "@/components/svg-icon/index.vue"; // svg component

const requireAll = function (requireContext) {
  return Object.values(requireContext);
};

// const req = require['context']('./svg', false, /\.svg$/)
const req = import.meta.globEager("./svg/*.svg");

const a = requireAll(req);

export default function (app) {
  app.component("SvgIcon", SvgIcon);
}
