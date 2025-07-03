import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    console.log("📩 Clerk Webhook Triggered");

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;
    console.log(`📦 Webhook Type: ${type}`);
    console.log("🧾 Data:", data);

    if (type === "user.created") {
      const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: data.first_name + " " + data.last_name,
        image: data.image_url,
        resume: "",
      };
      await User.create(userData);
      console.log("✅ User created in MongoDB!");
    }

    res.json({});
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    res.json({ success: false, message: "Webhooks Error" });
  }
};
