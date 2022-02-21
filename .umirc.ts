import { defineConfig } from 'umi';
import routes from "./src/routes"


export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'React 进阶实战',
  layout: {
    title: 'React 进阶实战',
  },
  routes: routes,
  fastRefresh: {},
});
