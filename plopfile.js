module.exports = function (plop) {
  plop.load("plop-pack-remove")

  // controller generator
  plop.setGenerator("Router, Service and Repository", {
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Router, Service and Repository (eg: User -> UserRouter)",
      },
    ],
    actions: [
      {
        // delete all files in the plop/generated folder
        type: "removeMany",
        path: "plop/generated/**",
      },
      {
        type: "add",
        path: "plop/generated/{{name}}Router.ts",
        templateFile: "plop/templates/router.hbs",
      },
      {
        type: "add",
        path: "plop/generated/{{name}}Service.ts",
        templateFile: "plop/templates/service.hbs",
      },
      {
        type: "add",
        path: "plop/generated/{{name}}Repository.ts",
        templateFile: "plop/templates/repository.hbs",
      },
      {
        type: "add",
        path: "plop/generated/types/{{name}}Input.ts",
        templateFile: "plop/templates/input.hbs",
      },
      {
        type: "add",
        path: "plop/generated/types/{{name}}Output.ts",
        templateFile: "plop/templates/output.hbs",
      },
    ],
  })
}
