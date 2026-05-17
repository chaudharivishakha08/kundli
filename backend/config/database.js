const mongoose = require("mongoose");

exports.connectDatabase = async () => {
  const rawUri = process.env.MONGO_URI || "";
  const uri = rawUri.trim();

  if (!uri) {
    console.error("MONGO_URI environment variable is missing or empty.");
    process.exit(1);
  }

  // console.log("Attempting MongoDB connection. SRV style:", uri.startsWith("mongodb+srv://"));

  try {
    const con = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`Database Connected: ${con.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);

    if (err && (err.code === 'ENOTFOUND' || (err.message && err.message.includes('ENOTFOUND')))) {
      console.error("DNS SRV lookup failed for the provided MongoDB+SRV host. Try:");
      console.error("  1) Run DNS check: nslookup -type=SRV _mongodb._tcp.<your-cluster-host>");
      console.error("     Example (PowerShell): nslookup -type=SRV _mongodb._tcp.cluster0.icxgk8v.mongodb.net");
      console.error("  2) Ensure your network/DNS allows SRV records and you have internet access.");
      console.error("  3) Verify the connection string in config/config.env matches the Atlas connection string (no typos).");
      console.error("  4) As a temporary workaround, get the standard (mongodb://) connection string from Atlas and try it.");
    }

    process.exit(1);
  }
};
