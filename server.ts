import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const todos = new Map<string, any>();
todos.set("1", {
    id: "1",
    title: "An todo",
    completed: false
});

const router = new Router();
router
    .get("/todos", (ctx) => {
        ctx.response.body = Array.from(todos.values());
    })
    .post("/todos", async (ctx) => {
        const result = await ctx.request.body({
            contentTypes: {
                text: ["application/json"],
            },
        });
        ctx.response.body = result.value;
    })
    .get("/todos/:id", (ctx) => {
        if (ctx.params && ctx.params.id && todos.has(ctx.params.id)) {
            ctx.response.body = todos.get(ctx.params.id);
        }
    });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());

console.info(`CORS-enabled web server listening on http://localhost:8888/`);
await app.listen({ port: 8888 });
