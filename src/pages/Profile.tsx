import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Building, Phone, Edit, Save, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  full_name: string;
  company: string;
  position: string;
  phone: string;
}

const Profile = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    company: '',
    position: '',
    phone: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found error
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          company: data.company || '',
          position: data.position || '',
          phone: data.phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error loading profile",
        description: "There was a problem loading your profile data.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert([
          {
            user_id: user.id,
            full_name: profile.full_name,
            company: profile.company,
            position: profile.position,
            phone: profile.phone
          }
        ]);

      if (error) throw error;

      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
            <p className="text-tusk-lightBlue">Manage your account information and preferences</p>
          </div>

          <Card className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-tusk-teal text-black text-xl font-bold">
                    {getInitials(profile.full_name || user.email || 'U')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-white">
                {profile.full_name || 'Complete your profile'}
              </CardTitle>
              <CardDescription className="text-tusk-lightBlue">
                {user.email}
              </CardDescription>
              <div className="flex justify-center mt-2">
                <Badge variant="outline" className="border-tusk-teal text-tusk-teal">
                  Verified Account
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-tusk-teal hover:bg-tusk-accent text-black"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsEditing(false);
                        fetchProfile(); // Reset to original values
                      }}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={profile.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className="bg-black/30 border border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-3 bg-black/20 rounded-lg border border-white/10 text-white">
                      {profile.full_name || 'Not set'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <div className="p-3 bg-black/20 rounded-lg border border-white/10 text-white/80">
                    {user.email}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Company
                  </label>
                  {isEditing ? (
                    <Input
                      value={profile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="bg-black/30 border border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="Your company"
                    />
                  ) : (
                    <div className="p-3 bg-black/20 rounded-lg border border-white/10 text-white">
                      {profile.company || 'Not set'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white">Position</label>
                  {isEditing ? (
                    <Input
                      value={profile.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="bg-black/30 border border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="Your position"
                    />
                  ) : (
                    <div className="p-3 bg-black/20 rounded-lg border border-white/10 text-white">
                      {profile.position || 'Not set'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </label>
                  {isEditing ? (
                    <Input
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-black/30 border border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="Your phone number"
                    />
                  ) : (
                    <div className="p-3 bg-black/20 rounded-lg border border-white/10 text-white">
                      {profile.phone || 'Not set'}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Account Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <div className="text-sm text-tusk-lightBlue">Member Since</div>
                    <div className="text-white font-medium">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <div className="text-sm text-tusk-lightBlue">Account Type</div>
                    <div className="text-white font-medium">Free Plan</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;