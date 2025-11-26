import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { generateRefinement } from "./ai.ts";
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

    // Generate signed URLs for images and gallery media
    const eventsWithUrls = await Promise.all(events.map(async (event: any) => {
      let imageUrl = event.imageUrl || event.image; // fallback
      let logoUrl = event.logoUrl || event.logo; // fallback
      let gallery = event.gallery || [];

      // Sign main image
      if (event.imagePath) {
        const { data } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(event.imagePath, 3600 * 24);
        if (data) imageUrl = data.signedUrl;
      }
      
      // Sign logo
      if (event.logoPath) {
        const { data } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(event.logoPath, 3600 * 24);
        if (data) logoUrl = data.signedUrl;
      }

      // Sign gallery items
      if (Array.isArray(gallery) && gallery.length > 0) {
        gallery = await Promise.all(gallery.map(async (item: any) => {
          if (item.path) {
            const { data } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(item.path, 3600 * 24);
            if (data) return { ...item, url: data.signedUrl };
          }
          return item;
        }));
      }

      return { ...event, imageUrl, logoUrl, image: imageUrl, logo: logoUrl, gallery };
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

// POST /refine - AI Refinement
app.post(`${BASE_PATH}/refine`, async (c) => {
  try {
    const { messages, currentDraft, event } = await c.req.json();
    const result = await generateRefinement(messages, currentDraft, event);
    return c.json(result);
  } catch (e) {
    console.error("Error in /refine:", e);
    return c.json({ error: e.message }, 500);
  }
});

// POST /signup - Create initial admin user
app.post(`${BASE_PATH}/signup`, async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
        return c.json({ error: "Email and password required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name: 'Admin User' },
      email_confirm: true
    });

    if (error) throw error;

    return c.json({ user: data.user });
  } catch (e) {
    console.error("Error creating user:", e);
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