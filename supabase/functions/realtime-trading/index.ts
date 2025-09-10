import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  
  console.log("New WebSocket connection established for real-time trading");

  // Simulate real-time trading data
  let interval: number;
  
  socket.onopen = () => {
    console.log("WebSocket opened - starting real-time data stream");
    
    // Send initial data
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'META'];
    
    interval = setInterval(async () => {
      for (const symbol of symbols) {
        const basePrice = getBasePrice(symbol);
        const price = basePrice + (Math.random() - 0.5) * (basePrice * 0.02);
        const volume = Math.floor(Math.random() * 1000000) + 100000;
        const changePercent = (Math.random() - 0.5) * 10;
        
        const tradingData = {
          symbol,
          price: parseFloat(price.toFixed(2)),
          volume,
          timestamp: new Date().toISOString(),
          market_status: 'open',
          change_percent: parseFloat(changePercent.toFixed(2)),
          bid_price: parseFloat((price - 0.01).toFixed(2)),
          ask_price: parseFloat((price + 0.01).toFixed(2)),
          metadata: {
            high_24h: parseFloat((price * 1.05).toFixed(2)),
            low_24h: parseFloat((price * 0.95).toFixed(2)),
            volume_24h: volume * 24
          }
        };

        // Store in database
        try {
          await supabase.from('trading_data').insert(tradingData);
        } catch (error) {
          console.error('Error storing trading data:', error);
        }

        // Send to client
        socket.send(JSON.stringify({
          type: 'trading_update',
          data: tradingData
        }));
      }
    }, 1000); // Update every second
  };

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);
      
      if (message.type === 'subscribe') {
        socket.send(JSON.stringify({
          type: 'subscribed',
          symbols: message.symbols || ['AAPL', 'GOOGL', 'MSFT']
        }));
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
    if (interval) {
      clearInterval(interval);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    if (interval) {
      clearInterval(interval);
    }
  };

  return response;
});

function getBasePrice(symbol: string): number {
  const basePrices: { [key: string]: number } = {
    'AAPL': 150.00,
    'GOOGL': 2500.00,
    'MSFT': 300.00,
    'TSLA': 800.00,
    'AMZN': 3200.00,
    'NVDA': 450.00,
    'META': 280.00
  };
  return basePrices[symbol] || 100.00;
}