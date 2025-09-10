import React from 'react';
import { validatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthText, type PasswordStrengthResult } from '@/utils/passwordStrength';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  password, 
  className = '' 
}) => {
  const strength: PasswordStrengthResult = validatePasswordStrength(password);
  
  if (!password) return null;

  const getIcon = () => {
    if (strength.score <= 1) {
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    } else if (strength.score <= 2) {
      return <Shield className="h-4 w-4 text-orange-500" />;
    } else {
      return <CheckCircle className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className={`text-sm font-medium ${getPasswordStrengthColor(strength.score)}`}>
            {getPasswordStrengthText(strength.score)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Crack time: {strength.crackTimeDisplay}
        </span>
      </div>
      
      <Progress 
        value={(strength.score + 1) * 20} 
        className="h-2"
      />
      
      {strength.feedback.length > 0 && (
        <div className="space-y-1">
          {strength.feedback.map((feedback, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{feedback}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        <span className={strength.isValid ? 'text-primary' : 'text-destructive'}>
          {strength.isValid ? '✓ Meets enterprise security requirements' : '✗ Does not meet security requirements'}
        </span>
      </div>
    </div>
  );
};