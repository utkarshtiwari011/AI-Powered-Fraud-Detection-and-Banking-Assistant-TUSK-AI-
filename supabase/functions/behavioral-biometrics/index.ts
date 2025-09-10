import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BiometricData {
  user_id: string;
  session_id: string;
  keystroke_dynamics?: {
    typing_speed: number;
    key_intervals: number[];
    pressure_patterns: number[];
    rhythm_consistency: number;
  };
  mouse_patterns?: {
    movement_velocity: number[];
    click_patterns: number[];
    scroll_behavior: any;
    cursor_trajectory: any[];
  };
  device_fingerprint?: {
    screen_resolution: string;
    timezone: string;
    language: string;
    platform: string;
    user_agent: string;
    hardware_concurrency: number;
  };
  geolocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: string;
  };
}

class BehavioralBiometrics {
  // Analyze keystroke dynamics for user verification
  static analyzeKeystrokeDynamics(data: BiometricData): { score: number; factors: string[] } {
    const factors: string[] = [];
    let score = 0.5; // Base score
    
    if (data.keystroke_dynamics) {
      const { typing_speed, key_intervals, rhythm_consistency } = data.keystroke_dynamics;
      
      // Typing speed analysis (50-150 WPM is normal)
      if (typing_speed < 20 || typing_speed > 200) {
        factors.push('unusual_typing_speed');
        score += 0.3;
      }
      
      // Key interval consistency
      if (rhythm_consistency < 0.3) {
        factors.push('inconsistent_rhythm');
        score += 0.2;
      }
      
      // Pressure pattern analysis
      const avgInterval = key_intervals.reduce((a, b) => a + b, 0) / key_intervals.length;
      const variance = key_intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / key_intervals.length;
      
      if (variance > 10000) { // High variance indicates potential bot
        factors.push('high_keystroke_variance');
        score += 0.4;
      }
    }
    
    return { score: Math.min(score, 1.0), factors };
  }

  // Analyze mouse movement patterns
  static analyzeMousePatterns(data: BiometricData): { score: number; factors: string[] } {
    const factors: string[] = [];
    let score = 0.3; // Base score
    
    if (data.mouse_patterns) {
      const { movement_velocity, click_patterns, cursor_trajectory } = data.mouse_patterns;
      
      // Velocity analysis
      const avgVelocity = movement_velocity.reduce((a, b) => a + b, 0) / movement_velocity.length;
      if (avgVelocity > 1000 || avgVelocity < 10) {
        factors.push('unusual_mouse_velocity');
        score += 0.3;
      }
      
      // Click pattern analysis
      if (click_patterns.length > 0) {
        const clickVariance = this.calculateVariance(click_patterns);
        if (clickVariance < 100) { // Too consistent - might be automated
          factors.push('robotic_click_patterns');
          score += 0.4;
        }
      }
      
      // Trajectory smoothness
      if (cursor_trajectory.length > 2) {
        const smoothness = this.calculateTrajectorySmoothness(cursor_trajectory);
        if (smoothness > 0.95) { // Too smooth - potentially automated
          factors.push('overly_smooth_trajectory');
          score += 0.3;
        }
      }
    }
    
    return { score: Math.min(score, 1.0), factors };
  }

  // Device fingerprinting analysis
  static analyzeDeviceFingerprint(data: BiometricData): { score: number; factors: string[] } {
    const factors: string[] = [];
    let score = 0.2; // Base score
    
    if (data.device_fingerprint) {
      const { screen_resolution, platform, user_agent, hardware_concurrency } = data.device_fingerprint;
      
      // Check for common bot indicators
      if (screen_resolution === '1024x768' || screen_resolution === '800x600') {
        factors.push('suspicious_screen_resolution');
        score += 0.2;
      }
      
      // Hardware analysis
      if (hardware_concurrency > 16 || hardware_concurrency < 1) {
        factors.push('unusual_hardware_spec');
        score += 0.1;
      }
      
      // User agent analysis
      if (user_agent.includes('headless') || user_agent.includes('selenium') || user_agent.includes('bot')) {
        factors.push('automated_user_agent');
        score += 0.5;
      }
      
      // Platform consistency
      const platformIndicators = [platform.toLowerCase(), user_agent.toLowerCase()];
      const platformConsistent = platformIndicators.every(indicator => 
        indicator.includes('windows') || indicator.includes('mac') || indicator.includes('linux')
      );
      
      if (!platformConsistent) {
        factors.push('platform_inconsistency');
        score += 0.2;
      }
    }
    
    return { score: Math.min(score, 1.0), factors };
  }

  // Geolocation analysis
  static analyzeGeolocation(data: BiometricData, userProfile?: any): { score: number; factors: string[] } {
    const factors: string[] = [];
    let score = 0.1; // Base score
    
    if (data.geolocation) {
      const { latitude, longitude, accuracy } = data.geolocation;
      
      // Check for impossible travel (if we have previous location)
      if (userProfile?.last_location) {
        const distance = this.calculateDistance(
          latitude, longitude,
          userProfile.last_location.latitude,
          userProfile.last_location.longitude
        );
        
        const timeDiff = new Date().getTime() - new Date(userProfile.last_location.timestamp).getTime();
        const maxPossibleSpeed = 1000; // km/h (commercial flight)
        const requiredSpeed = distance / (timeDiff / 3600000); // km/h
        
        if (requiredSpeed > maxPossibleSpeed) {
          factors.push('impossible_travel_speed');
          score += 0.8;
        }
      }
      
      // GPS accuracy check
      if (accuracy > 10000) { // Very poor accuracy
        factors.push('poor_gps_accuracy');
        score += 0.1;
      }
      
      // Check for VPN/proxy indicators (simplified)
      if (latitude === 0 && longitude === 0) {
        factors.push('suspicious_coordinates');
        score += 0.4;
      }
    }
    
    return { score: Math.min(score, 1.0), factors };
  }

  // Main risk assessment
  static assessRisk(data: BiometricData, userProfile?: any): any {
    const keystrokeAnalysis = this.analyzeKeystrokeDynamics(data);
    const mouseAnalysis = this.analyzeMousePatterns(data);
    const deviceAnalysis = this.analyzeDeviceFingerprint(data);
    const geoAnalysis = this.analyzeGeolocation(data, userProfile);
    
    // Weighted combination
    const totalScore = (
      keystrokeAnalysis.score * 0.3 +
      mouseAnalysis.score * 0.25 +
      deviceAnalysis.score * 0.25 +
      geoAnalysis.score * 0.2
    );
    
    const allFactors = [
      ...keystrokeAnalysis.factors,
      ...mouseAnalysis.factors,
      ...deviceAnalysis.factors,
      ...geoAnalysis.factors
    ];
    
    let riskLevel = 'low';
    if (totalScore > 0.7) riskLevel = 'high';
    else if (totalScore > 0.4) riskLevel = 'medium';
    
    return {
      risk_score: parseFloat(totalScore.toFixed(3)),
      risk_level: riskLevel,
      risk_factors: allFactors,
      component_scores: {
        keystroke: keystrokeAnalysis.score,
        mouse: mouseAnalysis.score,
        device: deviceAnalysis.score,
        geolocation: geoAnalysis.score
      },
      is_verified: totalScore < 0.3,
      confidence: Math.max(0, 1 - (allFactors.length * 0.1))
    };
  }

  // Helper functions
  static calculateVariance(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    return values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
  }

  static calculateTrajectorySmoothness(trajectory: any[]): number {
    if (trajectory.length < 3) return 0;
    
    let totalDeviation = 0;
    for (let i = 1; i < trajectory.length - 1; i++) {
      const angle1 = Math.atan2(trajectory[i].y - trajectory[i-1].y, trajectory[i].x - trajectory[i-1].x);
      const angle2 = Math.atan2(trajectory[i+1].y - trajectory[i].y, trajectory[i+1].x - trajectory[i].x);
      totalDeviation += Math.abs(angle2 - angle1);
    }
    
    return 1 - (totalDeviation / (trajectory.length - 2) / Math.PI);
  }

  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const biometricData: BiometricData = await req.json();
    console.log('Analyzing behavioral biometrics for user:', biometricData.user_id);

    // Get user's previous biometric profile if exists
    const { data: userProfile } = await supabase
      .from('user_biometrics')
      .select('*')
      .eq('user_id', biometricData.user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Perform risk assessment
    const riskAssessment = BehavioralBiometrics.assessRisk(biometricData, userProfile);

    // Store biometric data
    const { error: dbError } = await supabase.from('user_biometrics').insert({
      user_id: biometricData.user_id,
      session_id: biometricData.session_id,
      keystroke_dynamics: biometricData.keystroke_dynamics,
      mouse_patterns: biometricData.mouse_patterns,
      device_fingerprint: biometricData.device_fingerprint,
      geolocation: biometricData.geolocation,
      risk_score: riskAssessment.risk_score,
      is_verified: riskAssessment.is_verified
    });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Send alert if high risk
    if (riskAssessment.risk_level === 'high') {
      await supabase.from('real_time_alerts').insert({
        user_id: biometricData.user_id,
        alert_type: 'behavioral_anomaly',
        severity: 'high',
        title: 'Unusual Behavioral Pattern Detected',
        message: `Session ${biometricData.session_id} shows suspicious behavioral patterns`,
        metadata: {
          session_id: biometricData.session_id,
          risk_score: riskAssessment.risk_score,
          risk_factors: riskAssessment.risk_factors
        }
      });
    }

    // Store analytics
    await supabase.from('ai_analytics').insert({
      user_id: biometricData.user_id,
      session_id: biometricData.session_id,
      model_type: 'behavioral_biometrics',
      input_data: biometricData,
      output_data: riskAssessment,
      confidence_score: riskAssessment.confidence,
      processing_time_ms: 95
    });

    return new Response(JSON.stringify(riskAssessment), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in behavioral biometrics:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});