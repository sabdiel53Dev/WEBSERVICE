import type { Elysia } from "elysia";
import type { CustomerController } from "../controllers/customer.controller.ts";

export const customerRoutes = (
    app: Elysia,
    controller: CustomerController
) => {
    return app.group("/customers", (app) =>
        app
            .get("/", () => controller.getAll())
            .get("/:id", ({ params }) => controller.getById(params.id))
            .post("/", ({ body }) => controller.create(body))
            .put("/:id", ({ params, body }) =>
                controller.update(params.id, body)
            )
            .delete("/:id", ({ params }) =>
                controller.delete(params.id)
            )
    );
};