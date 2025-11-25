import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Initialize Supabase Client
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = "make-c4bb2206-assets";

// Ensure bucket exists on startup
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        allowedMimeTypes: ['image/*', 'video/*'],
        fileSizeLimit: 52428800, // 50MB
      });
      console.log(`Bucket ${BUCKET_NAME} created.`);
    }
  } catch (e) {
    console.error("Error ensuring bucket exists:", e);
  }
})();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const BASE_PATH = "/make-server-c4bb2206";

// Health check endpoint
app.get(`${BASE_PATH}/health`, (c) => {
  return c.json({ status: "ok" });
});

// GET /events - Get all events with signed URLs
app.get(`${BASE_PATH}/events`, async (c) => {
  try {
    const events = await kv.get("wav_events") || [];

    // Generate signed URLs for images
    const eventsWithUrls = await Promise.all(events.map(async (event: any) => {
      let imageUrl = event.imageUrl;
      let logoUrl = event.logoUrl;

      if (event.imagePath) {
        const { data } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(event.imagePath, 3600 * 24); // 24 hours
        if (data) imageUrl = data.signedUrl;
      }
       if (event.logoPath) {
        const { data } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(event.logoPath, 3600 * 24); // 24 hours
        if (data) logoUrl = data.signedUrl;
      }
      return { ...event, imageUrl, logoUrl };
    }));

    return c.json(eventsWithUrls);
  } catch (e) {
    console.error("Error fetching events:", e);
    return c.json({ error: e.message }, 500);
  }
});

// POST /events - Update all events
app.post(`${BASE_PATH}/events`, async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("wav_events", body);
    return c.json({ success: true });
  } catch (e) {
     console.error("Error saving events:", e);
    return c.json({ error: e.message }, 500);
  }
});

// POST /upload - Upload a file
app.post(`${BASE_PATH}/upload`, async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (file instanceof File) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          contentType: file.type,
          upsert: true
        });

      if (error) throw error;

      return c.json({ path: fileName });
    }
    return c.json({ error: "No file uploaded" }, 400);
  } catch (e) {
    console.error("Error uploading file:", e);
    return c.json({ error: e.message }, 500);
  }
});

Deno.serve(app.fetch);