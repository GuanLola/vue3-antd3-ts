import { createApp } from "vue";
import SvgIcon from "@/components/svg-icon/index.vue"; // svg component

const requireAll = function (requireContext: any) {
  return Object.values(requireContext);
};

// const req = require['context']('./svg', false, /\.svg$/)
const req = import.meta.globEager("./svg/*.svg");

const a = requireAll(req);

export default function (app: ReturnType<typeof createApp>) {
  app.component("SvgIcon", SvgIcon);
}
