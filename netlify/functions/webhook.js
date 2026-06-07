export default async (req, context) => {
  try {
    // 1. Ambil data payload dari Midtrans
    const payload = await req.json();

    // 2. Teruskan payload ke Google Apps Script Anda (fetch otomatis mem-follow redirect 302 Google)
    const gasUrl = "https://script.google.com/macros/s/AKfycbzUskm8cETJfyhvA4z4eyfLqFrL3s4dm7SIAC7oDay6UqiI8kAUhARTmmogmnPKS8w8hg/exec";

    await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Successfully forwarded webhook payload to GAS.");

  } catch (error) {
    console.error("Error forwarding data to GAS:", error);
  }

  // 3. Langsung kembalikan respon 200 OK ke Midtrans
  return new Response(JSON.stringify({ status: "received" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

// Konfigurasi route endpoint agar bisa diakses di /api/webhook
export const config = {
  path: "/api/webhook"
};
