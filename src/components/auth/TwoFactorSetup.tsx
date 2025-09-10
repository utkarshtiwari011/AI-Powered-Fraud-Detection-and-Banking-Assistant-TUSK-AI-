import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield, Copy, Check, Download, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface TwoFactorSetupProps {
  onComplete: () => void;
  onSkip: () => void;
}

const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState<'setup' | 'verify' | 'backup'>('setup');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    generateTwoFactorSecret();
  }, []);

  const generateTwoFactorSecret = async () => {
    try {
      setIsLoading(true);
      
      // Generate TOTP secret and QR code
      const response = await fetch('/api/auth/generate-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          userEmail: user?.email,
          serviceName: 'TUSK AI Fintech Platform'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate 2FA secret');
      }

      const data = await response.json();
      setSecret(data.secret);
      setQrCodeUrl(data.qrCodeUrl);
      
    } catch (error) {
      console.error('Error generating 2FA secret:', error);
      toast({
        title: "Setup Error",
        description: "Failed to generate 2FA setup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTwoFactor = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          secret,
          token: verificationCode
        })
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      
      if (data.verified) {
        // Generate backup codes
        const backupResponse = await fetch('/api/auth/generate-backup-codes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          }
        });
        
        const backupData = await backupResponse.json();
        setBackupCodes(backupData.codes);
        setStep('backup');
        
        toast({
          title: "2FA Verified",
          description: "Two-factor authentication has been successfully enabled.",
        });
      } else {
        toast({
          title: "Verification Failed",
          description: "Invalid verification code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      toast({
        title: "Verification Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: 'secret' | 'backup') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'secret') {
        setCopiedSecret(true);
        setTimeout(() => setCopiedSecret(false), 2000);
      } else {
        setCopiedBackup(true);
        setTimeout(() => setCopiedBackup(false), 2000);
      }
      toast({
        title: "Copied",
        description: `${type === 'secret' ? 'Secret key' : 'Backup codes'} copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadBackupCodes = () => {
    const content = `TUSK AI Fintech Platform - Backup Codes
Generated: ${new Date().toISOString()}
User: ${user?.email}

IMPORTANT: Store these codes securely. Each code can only be used once.

${backupCodes.join('\n')}

Instructions:
- Use these codes when you don't have access to your authenticator app
- Each code can only be used once
- Keep these codes in a secure location
- Generate new codes if these are compromised`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tusk-ai-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (step === 'setup') {
    return (
      <Card className="w-full max-w-md mx-auto bg-tusk-darkNavy/80 backdrop-blur-xl border border-tusk-teal/30">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-tusk-teal" />
            <CardTitle className="text-xl text-white">Enable Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription className="text-tusk-lightBlue">
            Secure your account with enterprise-grade 2FA protection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Step 1: Scan QR Code</h3>
            <p className="text-sm text-tusk-lightBlue mb-4">
              Use Google Authenticator, Authy, or any TOTP-compatible app
            </p>
            
            {isLoading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tusk-teal"></div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg inline-block">
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="2FA QR Code" className="w-40 h-40 mx-auto" />
                ) : (
                  <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                    Loading QR Code...
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Manual Entry Key:</h4>
            <div className="flex items-center gap-2 p-3 bg-black/30 rounded-md">
              <code className="text-tusk-teal text-sm flex-1 font-mono">{secret}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(secret, 'secret')}
                className="text-tusk-lightBlue hover:text-white"
              >
                {copiedSecret ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onSkip}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Skip for Now
            </Button>
            <Button
              onClick={() => setStep('verify')}
              disabled={!secret}
              className="flex-1 bg-tusk-teal hover:bg-tusk-accent text-black"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'verify') {
    return (
      <Card className="w-full max-w-md mx-auto bg-tusk-darkNavy/80 backdrop-blur-xl border border-tusk-teal/30">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">Verify Setup</CardTitle>
          <CardDescription className="text-tusk-lightBlue">
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <InputOTP
              maxLength={6}
              value={verificationCode}
              onChange={setVerificationCode}
              className="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="border-tusk-teal/30 text-white" />
                <InputOTPSlot index={1} className="border-tusk-teal/30 text-white" />
                <InputOTPSlot index={2} className="border-tusk-teal/30 text-white" />
                <InputOTPSlot index={3} className="border-tusk-teal/30 text-white" />
                <InputOTPSlot index={4} className="border-tusk-teal/30 text-white" />
                <InputOTPSlot index={5} className="border-tusk-teal/30 text-white" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep('setup')}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Back
            </Button>
            <Button
              onClick={verifyTwoFactor}
              disabled={verificationCode.length !== 6 || isLoading}
              className="flex-1 bg-tusk-teal hover:bg-tusk-accent text-black"
            >
              {isLoading ? "Verifying..." : "Verify & Enable"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'backup') {
    return (
      <Card className="w-full max-w-md mx-auto bg-tusk-darkNavy/80 backdrop-blur-xl border border-tusk-teal/30">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <CardTitle className="text-xl text-white">Save Backup Codes</CardTitle>
          </div>
          <CardDescription className="text-tusk-lightBlue">
            Store these codes securely. Each can only be used once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            {backupCodes.map((code, index) => (
              <div key={index} className="p-2 bg-black/30 rounded text-center">
                <code className="text-tusk-teal font-mono">{code}</code>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => copyToClipboard(backupCodes.join('\n'), 'backup')}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              {copiedBackup ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy
            </Button>
            <Button
              variant="outline"
              onClick={downloadBackupCodes}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          
          <Button
            onClick={onComplete}
            className="w-full bg-tusk-teal hover:bg-tusk-accent text-black"
          >
            Complete Setup
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default TwoFactorSetup;