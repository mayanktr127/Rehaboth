import { useState, useEffect, useCallback } from 'react';
import { CustomerProfile, ProfileUpdateInput } from '../../domain';
import { apiService } from '../api';

export function useProfile() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (input: ProfileUpdateInput): Promise<CustomerProfile> => {
    const updated = await apiService.updateProfile(input);
    setProfile(updated);
    return updated;
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refresh: fetchProfile,
  };
}
