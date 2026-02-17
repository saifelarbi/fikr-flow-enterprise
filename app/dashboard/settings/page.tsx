'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Profile Information</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">Full Name</Label>
            <Input
              id="name"
              defaultValue={user?.name || ''}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user?.email || ''}
              className="bg-slate-700 border-slate-600 text-white"
              disabled
            />
            <p className="text-xs text-slate-400">Email cannot be changed</p>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Separator className="bg-slate-700" />

      {/* Security Settings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Security</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-2">Change Password</h3>
            <div className="space-y-2">
              <Label htmlFor="current" className="text-slate-200">Current Password</Label>
              <Input
                id="current"
                type="password"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="new" className="text-slate-200">New Password</Label>
                <Input
                  id="new"
                  type="password"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-slate-200">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <Button className="mt-4">Update Password</Button>
          </div>
        </CardContent>
      </Card>

      <Separator className="bg-slate-700" />

      {/* Danger Zone */}
      <Card className="bg-red-950/30 border-red-800">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription className="text-red-300/70">Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2">Delete Account</h3>
            <p className="text-slate-400 text-sm mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
