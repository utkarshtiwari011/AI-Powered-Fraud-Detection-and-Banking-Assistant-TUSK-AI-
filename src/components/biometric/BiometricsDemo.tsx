import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Fingerprint, Eye, MousePointer, Keyboard, Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BiometricData {
  keystroke_dynamics: {
    typing_speed: number;
    dwell_time: number[];
    flight_time: number[];
    rhythm_pattern: string;
  };
  mouse_patterns: {
    velocity: number;
    acceleration: number;
    click_pattern: string;
    movement_style: string;
  };
  device_fingerprint: {
    screen_resolution: string;
    timezone: string;
    browser: string;
    plugins: string[];
  };
  geolocation: {
    country: string;
    city: string;
    coordinates: [number, number];
  };
}

const BiometricsDemo = () => {
  const [isCollecting, setIsCollecting] = useState(false);
  const [biometricData, setBiometricData] = useState<Partial<BiometricData>>({});
  const [riskScore, setRiskScore] = useState(0);
  const [verification, setVerification] = useState<'pending' | 'verified' | 'suspicious'>('pending');
  const [keystrokeSample, setKeystrokeSample] = useState('');
  const [mouseMovements, setMouseMovements] = useState<number[]>([]);

  // Collect device fingerprint on component mount
  useEffect(() => {
    collectDeviceFingerprint();
  }, []);

  const collectDeviceFingerprint = () => {
    const deviceData = {
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      browser: navigator.userAgent.split(' ').pop() || 'Unknown',
      plugins: Array.from(navigator.plugins).map(p => p.name).slice(0, 5)
    };

    setBiometricData(prev => ({
      ...prev,
      device_fingerprint: deviceData
    }));
  };

  const startBiometricCollection = () => {
    setIsCollecting(true);
    setVerification('pending');
    
    // Simulate geolocation (in real app, use navigator.geolocation)
    const mockGeoLocation = {
      country: 'United States',
      city: 'New York',
      coordinates: [40.7128, -74.0060] as [number, number]
    };

    setBiometricData(prev => ({
      ...prev,
      geolocation: mockGeoLocation
    }));

    // Start mouse movement tracking
    trackMouseMovements();
    
    // Auto-complete after 10 seconds for demo
    setTimeout(() => {
      completeAnalysis();
    }, 10000);
  };

  const trackMouseMovements = () => {
    let movements: number[] = [];
    let lastX = 0, lastY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const velocity = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );
      movements.push(velocity);
      lastX = e.clientX;
      lastY = e.clientY;
      
      if (movements.length > 100) movements = movements.slice(-100);
      setMouseMovements([...movements]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    setTimeout(() => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      const avgVelocity = movements.reduce((a, b) => a + b, 0) / movements.length || 0;
      const mouseData = {
        velocity: avgVelocity,
        acceleration: Math.random() * 50 + 10,
        click_pattern: 'consistent',
        movement_style: avgVelocity > 50 ? 'aggressive' : 'smooth'
      };

      setBiometricData(prev => ({
        ...prev,
        mouse_patterns: mouseData
      }));
    }, 8000);
  };

  const handleKeystrokeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeystrokeSample(value);
    
    if (value.length >= 20) {
      // Simulate keystroke analysis
      const keystrokeData = {
        typing_speed: Math.random() * 100 + 50, // WPM
        dwell_time: Array.from({length: 10}, () => Math.random() * 200 + 50),
        flight_time: Array.from({length: 10}, () => Math.random() * 150 + 30),
        rhythm_pattern: 'consistent'
      };

      setBiometricData(prev => ({
        ...prev,
        keystroke_dynamics: keystrokeData
      }));
    }
  };

  const completeAnalysis = async () => {
    setIsCollecting(false);
    
    try {
      const { data, error } = await supabase.functions.invoke('behavioral-biometrics', {
        body: {
          session_id: `demo_${Date.now()}`,
          biometric_data: biometricData,
          user_id: null // Demo mode
        }
      });

      if (error) throw error;

      setRiskScore(data.risk_score);
      setVerification(data.is_verified ? 'verified' : 'suspicious');
      
    } catch (error) {
      console.error('Error analyzing biometrics:', error);
      
      // Fallback analysis for demo
      const mockRiskScore = Math.random() * 0.3 + 0.1; // Low risk for demo
      setRiskScore(mockRiskScore);
      setVerification(mockRiskScore < 0.3 ? 'verified' : 'suspicious');
    }
  };

  const getVerificationColor = () => {
    switch (verification) {
      case 'verified': return 'text-green-600 bg-green-50';
      case 'suspicious': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getVerificationIcon = () => {
    switch (verification) {
      case 'verified': return <Shield className="h-4 w-4" />;
      case 'suspicious': return <AlertTriangle className="h-4 w-4" />;
      default: return <Fingerprint className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5" />
            Behavioral Biometrics Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={startBiometricCollection}
              disabled={isCollecting}
              className="flex items-center gap-2"
            >
              {isCollecting ? 'Collecting...' : 'Start Biometric Analysis'}
            </Button>
            
            {verification !== 'pending' && (
              <Badge className={getVerificationColor()}>
                {getVerificationIcon()}
                {verification.toUpperCase()}
                {riskScore > 0 && ` (${(riskScore * 100).toFixed(1)}% risk)`}
              </Badge>
            )}
          </div>

          {isCollecting && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 mb-2">
                  Please interact with the page to collect biometric data...
                </div>
                <Progress value={Math.min((keystrokeSample.length / 20) * 50 + (mouseMovements.length / 100) * 50, 100)} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Collection Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keystroke Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Keyboard className="h-5 w-5" />
              Keystroke Dynamics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Type here to analyze your typing pattern:</label>
                <input
                  type="text"
                  value={keystrokeSample}
                  onChange={handleKeystrokeInput}
                  placeholder="Please type at least 20 characters..."
                  className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isCollecting}
                />
              </div>
              
              {biometricData.keystroke_dynamics && (
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="text-sm">
                    <strong>Typing Speed:</strong> {biometricData.keystroke_dynamics.typing_speed.toFixed(1)} WPM
                  </div>
                  <div className="text-sm">
                    <strong>Rhythm:</strong> {biometricData.keystroke_dynamics.rhythm_pattern}
                  </div>
                  <div className="text-sm">
                    <strong>Dwell Time Avg:</strong> {
                      (biometricData.keystroke_dynamics.dwell_time.reduce((a, b) => a + b, 0) / 
                       biometricData.keystroke_dynamics.dwell_time.length).toFixed(1)
                    }ms
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mouse Movement Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MousePointer className="h-5 w-5" />
              Mouse Behavior
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg h-32 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  {isCollecting ? (
                    <div>
                      <MousePointer className="h-8 w-8 mx-auto mb-2" />
                      Move your mouse around this area...
                      <div className="text-xs mt-1">Movements tracked: {mouseMovements.length}</div>
                    </div>
                  ) : (
                    <div>
                      <MousePointer className="h-8 w-8 mx-auto mb-2" />
                      Start analysis to track mouse patterns
                    </div>
                  )}
                </div>
              </div>
              
              {biometricData.mouse_patterns && (
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div className="text-sm">
                    <strong>Avg Velocity:</strong> {biometricData.mouse_patterns.velocity.toFixed(1)} px/movement
                  </div>
                  <div className="text-sm">
                    <strong>Movement Style:</strong> {biometricData.mouse_patterns.movement_style}
                  </div>
                  <div className="text-sm">
                    <strong>Click Pattern:</strong> {biometricData.mouse_patterns.click_pattern}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Device Fingerprint */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="h-5 w-5" />
              Device Fingerprint
            </CardTitle>
          </CardHeader>
          <CardContent>
            {biometricData.device_fingerprint && (
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm"><strong>Screen:</strong> {biometricData.device_fingerprint.screen_resolution}</div>
                  <div className="text-sm"><strong>Timezone:</strong> {biometricData.device_fingerprint.timezone}</div>
                  <div className="text-sm"><strong>Browser:</strong> {biometricData.device_fingerprint.browser}</div>
                  <div className="text-sm">
                    <strong>Plugins:</strong> {biometricData.device_fingerprint.plugins.slice(0, 3).join(', ')}
                    {biometricData.device_fingerprint.plugins.length > 3 && '...'}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Geolocation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Location Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {biometricData.geolocation && (
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm"><strong>Country:</strong> {biometricData.geolocation.country}</div>
                  <div className="text-sm"><strong>City:</strong> {biometricData.geolocation.city}</div>
                  <div className="text-sm">
                    <strong>Coordinates:</strong> {biometricData.geolocation.coordinates.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BiometricsDemo;