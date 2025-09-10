import zxcvbn from 'zxcvbn';

export interface PasswordStrengthResult {
  score: number; // 0-4 (weak to strong)
  feedback: string[];
  isValid: boolean;
  crackTimeDisplay: string;
}

export const validatePasswordStrength = (password: string): PasswordStrengthResult => {
  const result = zxcvbn(password);
  
  const feedback: string[] = [];
  
  // Basic requirements
  if (password.length < 12) {
    feedback.push("Password must be at least 12 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    feedback.push("Include at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    feedback.push("Include at least one lowercase letter");
  }
  
  if (!/[0-9]/.test(password)) {
    feedback.push("Include at least one number");
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push("Include at least one special character");
  }
  
  // Add zxcvbn feedback
  if (result.feedback.suggestions) {
    feedback.push(...result.feedback.suggestions);
  }
  
  if (result.feedback.warning) {
    feedback.push(result.feedback.warning);
  }
  
  // For enterprise fintech, require minimum score of 3
  const isValid = result.score >= 3 && password.length >= 12 && feedback.length <= result.feedback.suggestions.length + (result.feedback.warning ? 1 : 0);
  
  return {
    score: result.score,
    feedback,
    isValid,
    crackTimeDisplay: result.crack_times_display.offline_slow_hashing_1e4_per_second
  };
};

export const getPasswordStrengthColor = (score: number): string => {
  switch (score) {
    case 0:
    case 1:
      return 'text-destructive';
    case 2:
      return 'text-orange-500';
    case 3:
      return 'text-yellow-500';
    case 4:
      return 'text-primary';
    default:
      return 'text-muted-foreground';
  }
};

export const getPasswordStrengthText = (score: number): string => {
  switch (score) {
    case 0:
      return 'Very Weak';
    case 1:
      return 'Weak';
    case 2:
      return 'Fair';
    case 3:
      return 'Strong';
    case 4:
      return 'Very Strong';
    default:
      return 'Unknown';
  }
};