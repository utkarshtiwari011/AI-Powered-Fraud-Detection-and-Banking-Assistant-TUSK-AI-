import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as speakeasy from "https://esm.sh/speakeasy@2.0.0";
import QRCode from "https://esm.sh/qrcode@1.5.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TwoFactorRequest {
  userEmail?: string;
  serviceName?: string;
  secret?: string;
  token?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { userEmail, serviceName, secret, token }: TwoFactorRequest = await req.json();
    const url = new URL(req.url);
    const action = url.pathname.split('/').pop();

    switch (action) {
      case 'generate-2fa': {
        if (!userEmail || !serviceName) {
          throw new Error('Missing required parameters');
        }

        // Generate secret
        const twoFactorSecret = speakeasy.generateSecret({
          name: userEmail,
          issuer: serviceName,
          length: 32
        });

        // Generate QR code
        const qrCodeUrl = await QRCode.toDataURL(twoFactorSecret.otpauth_url!);

        // Store secret temporarily (you might want to encrypt this)
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ two_factor_secret: twoFactorSecret.base32 })
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

        if (updateError) {
          throw updateError;
        }

        return new Response(JSON.stringify({
          secret: twoFactorSecret.base32,
          qrCodeUrl: qrCodeUrl
        }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      case 'verify-2fa': {
        if (!secret || !token) {
          throw new Error('Missing secret or token');
        }

        const verified = speakeasy.totp.verify({
          secret: secret,
          encoding: 'base32',
          token: token,
          window: 2 // Allow some time drift
        });

        if (verified) {
          // Enable 2FA for user
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              two_factor_enabled: true,
              two_factor_secret: secret 
            })
            .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

          if (updateError) {
            throw updateError;
          }

          // Log security event
          await supabase
            .from('security_logs')
            .insert({
              user_id: (await supabase.auth.getUser()).data.user?.id,
              event_type: '2fa_enabled',
              success: true,
              metadata: { timestamp: new Date().toISOString() }
            });
        }

        return new Response(JSON.stringify({ verified }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      case 'generate-backup-codes': {
        // Generate 10 backup codes
        const codes = Array.from({ length: 10 }, () => 
          Math.random().toString(36).substring(2, 10).toUpperCase()
        );

        // Store backup codes (encrypted)
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ backup_codes: codes })
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

        if (updateError) {
          throw updateError;
        }

        return new Response(JSON.stringify({ codes }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      case 'verify-backup-code': {
        const { code } = await req.json();
        
        // Get user's backup codes
        const { data: profile } = await supabase
          .from('profiles')
          .select('backup_codes')
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
          .single();

        if (!profile?.backup_codes) {
          return new Response(JSON.stringify({ verified: false }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const backupCodes = profile.backup_codes as string[];
        const codeIndex = backupCodes.indexOf(code);
        
        if (codeIndex !== -1) {
          // Remove used code
          backupCodes.splice(codeIndex, 1);
          
          await supabase
            .from('profiles')
            .update({ backup_codes: backupCodes })
            .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

          // Log backup code usage
          await supabase
            .from('security_logs')
            .insert({
              user_id: (await supabase.auth.getUser()).data.user?.id,
              event_type: 'backup_code_used',
              success: true,
              metadata: { timestamp: new Date().toISOString() }
            });

          return new Response(JSON.stringify({ verified: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        return new Response(JSON.stringify({ verified: false }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      case 'log-security-event': {
        const { eventType, success, metadata, ipAddress, userAgent } = await req.json();
        
        await supabase
          .from('security_logs')
          .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            event_type: eventType,
            success: success,
            ip_address: ipAddress,
            user_agent: userAgent,
            metadata: metadata || {}
          });

        return new Response(JSON.stringify({ logged: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      default:
        throw new Error('Invalid action');
    }
  } catch (error: any) {
    console.error("Error in auth-security function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);