import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily if key exists
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'CELINE STUDIO',
    location: 'Iyana-Isashi, La Clothine, Nigeria',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Celine AI Fashion Concierge API
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGenAI();

    // Fallback intelligent fashion concierge generator if no API key or in preview
    const generateFallbackResponse = (userMsg: string): string => {
      const lower = userMsg.toLowerCase();
      if (lower.includes('wedding') || lower.includes('aso ebi') || lower.includes('bride') || lower.includes('groom')) {
        return "At Celine Studio, wedding and occasion wear is our highest craft. For brides, grooms, and Aso Ebi guests, we create sculpted corseted gowns, royal Agbada, and bespoke Senator suits. We recommend scheduling a custom consultation or connecting directly on WhatsApp at 09124465224 to discuss fabric swatches and lead time.";
      }
      if (lower.includes('senator') || lower.includes('men') || lower.includes('suit') || lower.includes('agbada')) {
        return "Our men's collection features the Sovereign Senator Suit tailored with Super 160s Italian Cashmere wool and geometric chest embroidery, alongside grand 3-piece Swiss damask Agbada. Ready-to-wear and bespoke fits are available. Would you like to view our Senator designs or request a tailored measurement?";
      }
      if (lower.includes('ankara') || lower.includes('native') || lower.includes('fabric') || lower.includes('wax')) {
        return "We work with authentic 100% Cotton Dutch Hollandais wax prints, Swiss voile lace, duchess satin, and raw silk. We can craft contemporary two-piece sets, dramatic kimonos, or classic native outfits. You can also bring or upload your own fabric inspiration!";
      }
      if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
        return "Our ready-to-wear pieces generally range from ₦65,000 to ₦125,000, while bespoke custom gowns and elaborate three-piece Agbadas range from ₦140,000 upwards depending on fabric selection, corsetry, and hand-beading. For an exact quote, our team on WhatsApp (09124465224) will provide immediate pricing.";
      }
      if (lower.includes('location') || lower.includes('address') || lower.includes('visit') || lower.includes('where')) {
        return "Celine Studio is proudly located in Iyana-Isashi, La Clothine, Nigeria. We are open Monday to Friday from 9:00 AM to 7:00 PM, Saturday from 10:00 AM to 6:00 PM, and Sundays by appointment for private fittings.";
      }
      if (lower.includes('measurement') || lower.includes('fitting') || lower.includes('book')) {
        return "You can book a measurement or fitting appointment directly on our Bookings page. We offer in-studio fittings at Iyana-Isashi, as well as guidance for virtual measurements if you are outside Lagos or abroad.";
      }
      return "Welcome to Celine Studio. We specialize in bespoke custom couture and luxury ready-to-wear for men and women — from royal Senator attire to corseted evening gowns and contemporary Ankara. How may I assist your style journey today? You can also message our head stylist on WhatsApp at 09124465224.";
    };

    if (!ai) {
      return res.json({
        reply: generateFallbackResponse(message),
        suggestedActions: [
          { label: 'Start Custom Request', action: 'custom' },
          { label: 'Chat on WhatsApp', action: 'whatsapp', url: 'https://wa.me/2349124465224' }
        ]
      });
    }

    const systemPrompt = `You are Celine AI, the exclusive fashion concierge for CELINE STUDIO — a luxury Nigerian fashion house located at Iyana-Isashi, La Clothine, Nigeria (WhatsApp: 09124465224).
CELINE STUDIO specializes in custom-made fashion and ready-to-wear for both men and women:
- Custom dresses, gala gowns, corseted mermaid dresses, bridal reception outfits
- Men's Sovereign Senator suits, luxury Agbada 3-piece sets, corporate blazers
- Contemporary African wax Ankara wrap sets, kimonos, kaftans, and unisex minimal wear
- Occasion wear for Aso Ebi, birthdays, red carpet, and cultural milestones

Guidelines:
- Tone: Cultured, elegant, warm, respectful, concise (2-4 sentences max), editorial fashion magazine voice.
- Knowledgeable in Nigerian fashion culture (Aso Ebi, Agbada, Senator wear, Ankara, George, coral beadwork, bespoke fittings).
- DO NOT invent exact prices for unlisted items, stock quantities, or false delivery promises.
- Direct serious orders, quotes, and bespoke appointments to WhatsApp (09124465224).
- Keep replies punchy, inspiring, and always offer helpful direction.`;

    // Construct prompt
    const contents: any[] = [{ text: systemPrompt }];
    if (Array.isArray(conversationHistory)) {
      for (const item of conversationHistory.slice(-4)) {
        if (item.sender === 'user') {
          contents.push({ text: `Customer: ${item.text}` });
        } else if (item.sender === 'ai') {
          contents.push({ text: `Celine AI: ${item.text}` });
        }
      }
    }
    contents.push({ text: `Customer: ${message}\nCeline AI:` });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents.map(c => c.text).join('\n\n')
    });

    const replyText = response.text || generateFallbackResponse(message);

    res.json({
      reply: replyText,
      suggestedActions: [
        { label: 'Start Custom Request', action: 'custom' },
        { label: 'Chat on WhatsApp', action: 'whatsapp', url: 'https://wa.me/2349124465224' }
      ]
    });
  } catch (error: any) {
    console.error('AI Concierge Error:', error?.message || error);
    res.json({
      reply: "Thank you for reaching out to Celine Studio. Our master tailors are available on WhatsApp (+234 912 446 5224) to assist you with custom orders, fittings, and ready-to-wear selections.",
      suggestedActions: [
        { label: 'Chat on WhatsApp', action: 'whatsapp', url: 'https://wa.me/2349124465224' }
      ]
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Celine Studio server running on port ${PORT}`);
  });
}

startServer();
