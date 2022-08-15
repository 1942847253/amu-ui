module.exports = (plop) => {
  plop.setGenerator("createc", {
    description: "generate a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name: ",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{name}}/style/index.less",
        templateFile: "plop-template/component.less.hbs",
      },
      {
        type: "add",
        path: "src/{{name}}/style/index.ts",
        templateFile: "plop-template/component.less-index.hbs",
      },
      {
        type: "add",
        path: "src/{{name}}/{{name}}.vue",
        templateFile: "plop-template/component.hbs",
      },
      {
        type: "add",
        path: "src/{{name}}/index.ts",
        templateFile: "plop-template/component.index.hbs",
      },
      {
        type: "add",
        path: "src/{{name}}/types.ts",
        templateFile: "plop-template/component.types.hbs",
      },
    ],
  });
};
