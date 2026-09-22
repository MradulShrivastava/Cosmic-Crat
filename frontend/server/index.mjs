import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const storePath = join(__dirname, "orders-store.json");
const port = Number(process.env.PORT || 3001);

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  });
  response.end(JSON.stringify(payload));
};

const readOrders = async () => {
  try {
    const fileContents = await readFile(storePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
};

const writeOrders = async (orders) => {
  await mkdir(__dirname, { recursive: true });
  await writeFile(storePath, JSON.stringify(orders, null, 2));
};

const parseBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON payload."));
      }
    });

    request.on("error", reject);
  });

const validateOrderPayload = (payload) => {
  if (!payload?.requestId) {
    return "Missing request identifier.";
  }

  if (!payload?.customer?.fullName?.trim()) {
    return "Full name is required.";
  }

  if (!/^[6-9]\d{9}$/.test(payload?.customer?.mobileNumber?.trim?.() ?? "")) {
    return "A valid 10-digit mobile number is required.";
  }

  if (!payload?.customer?.city?.trim()) {
    return "City is required.";
  }

  if (!payload?.product?.id || !payload?.product?.name || !payload?.product?.variantName) {
    return "Product information is incomplete.";
  }

  if (payload?.product?.stockStatus === "Out of Stock") {
    return "This product is currently out of stock.";
  }

  if (!Number.isInteger(payload?.order?.quantity) || payload.order.quantity < 1) {
    return "Quantity must be at least 1.";
  }

  return null;
};

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === "GET" && request.url === "/api/health") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "POST" && request.url === "/api/orders") {
    try {
      const payload = await parseBody(request);
      const validationError = validateOrderPayload(payload);

      if (validationError) {
        sendJson(response, 400, { message: validationError });
        return;
      }

      const existingOrders = await readOrders();
      const duplicateOrder = existingOrders.find((order) => order.requestId === payload.requestId);

      if (duplicateOrder) {
        sendJson(response, 409, { message: "This order has already been submitted." });
        return;
      }

      const createdOrder = {
        id: randomUUID(),
        requestId: payload.requestId,
        customer: payload.customer,
        product: payload.product,
        order: {
          ...payload.order,
          totalPrice: payload.order.quantity * payload.order.unitPrice,
        },
        status: "received",
        createdAt: new Date().toISOString(),
      };

      existingOrders.unshift(createdOrder);
      await writeOrders(existingOrders);

      sendJson(response, 201, {
        message: "Order received successfully.",
        orderId: createdOrder.id,
      });
    } catch (error) {
      sendJson(response, 500, {
        message: error.message || "Something went wrong while saving the order.",
      });
    }

    return;
  }

  sendJson(response, 404, { message: "Not found." });
});

server.listen(port, () => {
  console.log(`Order API running on http://localhost:${port}`);
});
