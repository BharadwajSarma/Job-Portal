import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    console.log("📩 Clerk Webhook Triggered");

    // Create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verifying headers
    console.log("🔐 Verifying Webhook Headers...");
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });
    console.log("✅ Webhook verified!");

    // Getting data for request body
    const { data, type } = req.body;
    console.log(`📦 Webhook Type: ${type}`);
    console.log("🧾 Data:", data);

    // Switch Cases for different Events
    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + "" + data.last_name,
          image: data.image_url,
          resume: ''
        };

        console.log("🧑 Creating user in DB:", userData);
        await User.create(userData);
        console.log("✅ User created in MongoDB!");
        res.json({});
        break;
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };

        console.log("✏️ Updating user:", data.id, userData);
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case 'user.deleted': {
        console.log("🗑️ Deleting user:", data.id);
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        console.log("⚠️ Unknown event type:", type);
        res.json({});
        break;
    }
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    res.json({ success: false, message: "Webhooks Error" });
  }
};
