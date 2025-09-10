export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_analytics: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          input_data: Json
          model_type: string
          output_data: Json
          processing_time_ms: number
          session_id: string
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          input_data: Json
          model_type: string
          output_data: Json
          processing_time_ms: number
          session_id: string
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          input_data?: Json
          model_type?: string
          output_data?: Json
          processing_time_ms?: number
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string | null
          id: string
          session_id: string
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          session_id: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          session_id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          confidence: number | null
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          intent: string | null
          sender: string
        }
        Insert: {
          confidence?: number | null
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          intent?: string | null
          sender: string
        }
        Update: {
          confidence?: number | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          intent?: string | null
          sender?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          ai_model: string | null
          context: Json | null
          created_at: string
          ended_at: string | null
          id: string
          session_type: string
          status: string
          user_id: string | null
        }
        Insert: {
          ai_model?: string | null
          context?: Json | null
          created_at?: string
          ended_at?: string | null
          id?: string
          session_type?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          ai_model?: string | null
          context?: Json | null
          created_at?: string
          ended_at?: string | null
          id?: string
          session_type?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      demo_requests: {
        Row: {
          company: string
          company_size: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          preferred_date: string | null
          status: string | null
          use_case: string | null
        }
        Insert: {
          company: string
          company_size?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          status?: string | null
          use_case?: string | null
        }
        Update: {
          company?: string
          company_size?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          status?: string | null
          use_case?: string | null
        }
        Relationships: []
      }
      document_analysis: {
        Row: {
          ai_confidence: number | null
          created_at: string
          document_type: string
          entities: Json | null
          extracted_data: Json | null
          file_url: string | null
          id: string
          processed_at: string | null
          processing_status: string | null
          sentiment_score: number | null
          user_id: string
        }
        Insert: {
          ai_confidence?: number | null
          created_at?: string
          document_type: string
          entities?: Json | null
          extracted_data?: Json | null
          file_url?: string | null
          id?: string
          processed_at?: string | null
          processing_status?: string | null
          sentiment_score?: number | null
          user_id: string
        }
        Update: {
          ai_confidence?: number | null
          created_at?: string
          document_type?: string
          entities?: Json | null
          extracted_data?: Json | null
          file_url?: string | null
          id?: string
          processed_at?: string | null
          processing_status?: string | null
          sentiment_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      fraud_ensemble_results: {
        Row: {
          behavioral_score: number | null
          confidence: number
          created_at: string
          ensemble_score: number
          id: string
          model_1_score: number
          model_2_score: number
          model_3_score: number
          prediction: string
          risk_factors: Json | null
          transaction_id: string
          user_id: string | null
        }
        Insert: {
          behavioral_score?: number | null
          confidence: number
          created_at?: string
          ensemble_score: number
          id?: string
          model_1_score: number
          model_2_score: number
          model_3_score: number
          prediction: string
          risk_factors?: Json | null
          transaction_id: string
          user_id?: string | null
        }
        Update: {
          behavioral_score?: number | null
          confidence?: number
          created_at?: string
          ensemble_score?: number
          id?: string
          model_1_score?: number
          model_2_score?: number
          model_3_score?: number
          prediction?: string
          risk_factors?: Json | null
          transaction_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      fraud_transactions: {
        Row: {
          amount: number
          analysis_time: number | null
          card_present: boolean | null
          created_at: string | null
          customer_ip: unknown | null
          device_id: string | null
          id: string
          location: string | null
          merchant_name: string
          risk_factors: string[] | null
          risk_score: number
          status: string | null
          transaction_id: string
          user_id: string | null
        }
        Insert: {
          amount: number
          analysis_time?: number | null
          card_present?: boolean | null
          created_at?: string | null
          customer_ip?: unknown | null
          device_id?: string | null
          id?: string
          location?: string | null
          merchant_name: string
          risk_factors?: string[] | null
          risk_score: number
          status?: string | null
          transaction_id: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          analysis_time?: number | null
          card_present?: boolean | null
          created_at?: string | null
          customer_ip?: unknown | null
          device_id?: string | null
          id?: string
          location?: string | null
          merchant_name?: string
          risk_factors?: string[] | null
          risk_score?: number
          status?: string | null
          transaction_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      investment_recommendations: {
        Row: {
          ai_model_used: string
          asset_type: string
          confidence_score: number
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          reasoning: Json | null
          recommendation_type: string
          symbol: string
          target_price: number | null
          user_id: string
        }
        Insert: {
          ai_model_used: string
          asset_type: string
          confidence_score: number
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          reasoning?: Json | null
          recommendation_type: string
          symbol: string
          target_price?: number | null
          user_id: string
        }
        Update: {
          ai_model_used?: string
          asset_type?: string
          confidence_score?: number
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          reasoning?: Json | null
          recommendation_type?: string
          symbol?: string
          target_price?: number | null
          user_id?: string
        }
        Relationships: []
      }
      ml_model_performance: {
        Row: {
          accuracy: number
          created_at: string
          f1_score: number
          id: string
          is_active: boolean | null
          model_name: string
          model_version: string
          precision_score: number
          recall: number
          training_date: string
        }
        Insert: {
          accuracy: number
          created_at?: string
          f1_score: number
          id?: string
          is_active?: boolean | null
          model_name: string
          model_version: string
          precision_score: number
          recall: number
          training_date: string
        }
        Update: {
          accuracy?: number
          created_at?: string
          f1_score?: number
          id?: string
          is_active?: boolean | null
          model_name?: string
          model_version?: string
          precision_score?: number
          recall?: number
          training_date?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_locked_until: string | null
          backup_codes: Json | null
          company: string | null
          compliance_training_completed: boolean | null
          created_at: string | null
          department: string | null
          employee_id: string | null
          failed_login_attempts: number | null
          full_name: string | null
          id: string
          last_login: string | null
          password_changed_at: string | null
          phone: string | null
          position: string | null
          privacy_accepted_at: string | null
          role: string | null
          security_clearance: string | null
          terms_accepted_at: string | null
          two_factor_enabled: boolean | null
          two_factor_secret: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_locked_until?: string | null
          backup_codes?: Json | null
          company?: string | null
          compliance_training_completed?: boolean | null
          created_at?: string | null
          department?: string | null
          employee_id?: string | null
          failed_login_attempts?: number | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          password_changed_at?: string | null
          phone?: string | null
          position?: string | null
          privacy_accepted_at?: string | null
          role?: string | null
          security_clearance?: string | null
          terms_accepted_at?: string | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_locked_until?: string | null
          backup_codes?: Json | null
          company?: string | null
          compliance_training_completed?: boolean | null
          created_at?: string | null
          department?: string | null
          employee_id?: string | null
          failed_login_attempts?: number | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          password_changed_at?: string | null
          phone?: string | null
          position?: string | null
          privacy_accepted_at?: string | null
          role?: string | null
          security_clearance?: string | null
          terms_accepted_at?: string | null
          two_factor_enabled?: boolean | null
          two_factor_secret?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      real_time_alerts: {
        Row: {
          alert_type: string
          created_at: string
          expires_at: string | null
          id: string
          is_dismissed: boolean | null
          is_read: boolean | null
          message: string
          metadata: Json | null
          severity: string
          title: string
          user_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          severity: string
          title: string
          user_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          severity?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      real_time_monitoring: {
        Row: {
          alert_sent: boolean | null
          created_at: string
          id: string
          metric_type: string
          metric_value: number
          status: string
          threshold_value: number | null
        }
        Insert: {
          alert_sent?: boolean | null
          created_at?: string
          id?: string
          metric_type: string
          metric_value: number
          status: string
          threshold_value?: number | null
        }
        Update: {
          alert_sent?: boolean | null
          created_at?: string
          id?: string
          metric_type?: string
          metric_value?: number
          status?: string
          threshold_value?: number | null
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          success: boolean
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          success: boolean
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          success?: boolean
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      spending_analytics: {
        Row: {
          actual_amount: number | null
          anomalies: Json | null
          category: string
          confidence_interval: Json | null
          created_at: string
          id: string
          predicted_amount: number
          time_period: string
          trends: Json | null
          user_id: string
        }
        Insert: {
          actual_amount?: number | null
          anomalies?: Json | null
          category: string
          confidence_interval?: Json | null
          created_at?: string
          id?: string
          predicted_amount: number
          time_period: string
          trends?: Json | null
          user_id: string
        }
        Update: {
          actual_amount?: number | null
          anomalies?: Json | null
          category?: string
          confidence_interval?: Json | null
          created_at?: string
          id?: string
          predicted_amount?: number
          time_period?: string
          trends?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      trading_data: {
        Row: {
          ask_price: number | null
          bid_price: number | null
          change_percent: number | null
          id: string
          market_status: string
          metadata: Json | null
          price: number
          symbol: string
          timestamp: string
          volume: number
        }
        Insert: {
          ask_price?: number | null
          bid_price?: number | null
          change_percent?: number | null
          id?: string
          market_status?: string
          metadata?: Json | null
          price: number
          symbol: string
          timestamp?: string
          volume: number
        }
        Update: {
          ask_price?: number | null
          bid_price?: number | null
          change_percent?: number | null
          id?: string
          market_status?: string
          metadata?: Json | null
          price?: number
          symbol?: string
          timestamp?: string
          volume?: number
        }
        Relationships: []
      }
      user_biometrics: {
        Row: {
          created_at: string
          device_fingerprint: Json | null
          geolocation: Json | null
          id: string
          is_verified: boolean | null
          keystroke_dynamics: Json | null
          mouse_patterns: Json | null
          risk_score: number | null
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_fingerprint?: Json | null
          geolocation?: Json | null
          id?: string
          is_verified?: boolean | null
          keystroke_dynamics?: Json | null
          mouse_patterns?: Json | null
          risk_score?: number | null
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_fingerprint?: Json | null
          geolocation?: Json | null
          id?: string
          is_verified?: boolean | null
          keystroke_dynamics?: Json | null
          mouse_patterns?: Json | null
          risk_score?: number | null
          session_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_failed_login: {
        Args: { user_email: string }
        Returns: boolean
      }
      is_account_locked: {
        Args: { user_email: string }
        Returns: boolean
      }
      reset_failed_attempts: {
        Args: { user_email: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
