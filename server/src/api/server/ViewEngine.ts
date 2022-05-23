import * as Hapi from "hapi";
import * as Mustache from "mustache";
import * as Path from "path";

const ViewEngine = ({
  server,
  basePath
}: {
  server: Hapi.Server;
  basePath: string;
}) => {
  const partials: any = {};
  const layoutPath = Path.join(basePath, `templates`);
  const viewsPath = Path.join(basePath, `views`);
  return {
    register() {
      server.views({
        engines: {
          html: {
            compile: (template: string) => {
              Mustache.parse(template);

              return (context: any) => {
                return Mustache.render(template, context, partials);
              };
            },
            registerPartial: function (name, src) {
              partials[name] = src;
            }
          }
        },
        relativeTo: __dirname,
        path: [viewsPath],
        isCached: process.env.NODE_ENV === "production",
        layoutPath: [layoutPath],
        layout: true,
        context: (request: Hapi.Request) => {
          return request
            ? {
                title: "Bankonte Catalog",
                user: request.auth.credentials
              }
            : {};
        }
      });
    }
  };
};

export default ViewEngine;
