"use client";

import { useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import IconKey from "../../components/icons/IconKey";

const API_URL = "http://localhost:8000/api/v1/auth";

interface Tokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export default function Topic1() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Password123");
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Step 1: Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // start global loader + local state
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:start'));
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      setTokens(response.data);
      setMessage("✓ Login successful! Tokens generated.");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:stop'));
    }
  };

  // Step 2: Get Current User
  const handleGetCurrentUser = async () => {
    if (!tokens) {
      setError("Please login first");
      return;
    }

    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:start'));
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      setCurrentUser(response.data);
      setMessage("✓ Successfully retrieved current user info!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to get user info");
    } finally {
      setLoading(false);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:stop'));
    }
  };

  // Step 3: Refresh Token
  const handleRefreshToken = async () => {
    if (!tokens) {
      setError("Please login first");
      return;
    }

    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:start'));
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/refresh`, {
        refresh_token: tokens.refresh_token,
      });

      setTokens(response.data);
      setMessage("✓ Access token refreshed successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Token refresh failed");
    } finally {
      setLoading(false);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:stop'));
    }
  };

  // Step 4: Logout
  const handleLogout = async () => {
    if (!tokens) {
      setError("Please login first");
      return;
    }

    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:start'));
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      setTokens(null);
      setCurrentUser(null);
      setMessage("✓ Logged out successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Logout failed");
    } finally {
      setLoading(false);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:stop'));
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex items-center gap-4">
          <IconKey className="w-8 h-8 text-primary-500" />
          <div>
            <h1 className="text-2xl font-semibold">Topic 1: JWT Authentication</h1>
            <p className="muted small">Access & refresh tokens, secure session handling.</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">How it works</h3>
            <ol className="text-sm muted list-decimal list-inside space-y-1">
              <li>User logs in with email & password</li>
              <li>Backend verifies password and issues tokens</li>
              <li>Access token used for API calls; refresh for new access</li>
            </ol>
          </div>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Login</h3>
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="label">Email</label>
                <select value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded">
                  <option value="admin@example.com">admin@example.com (Admin)</option>
                  <option value="manager@example.com">manager@example.com (Manager)</option>
                  <option value="user@example.com">user@example.com (User)</option>
                </select>
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
                <p className="small muted">(default: Password123)</p>
              </div>

              <div className="flex gap-3">
                <Button type="submit" loading={loading} className="w-full">{loading ? 'Logging in...' : 'Login'}</Button>
              </div>
            </form>
          </Card>

          {tokens && (
            <Card>
              <h3 className="font-semibold mb-2">Tokens</h3>
              <div className="space-y-2">
                <div>
                  <p className="label small">Access Token (truncated)</p>
                  <code className="block bg-gray-100 p-2 rounded text-xs overflow-auto">{tokens.access_token.substring(0,50)}...</code>
                </div>
                <div>
                  <p className="label small">Refresh Token (truncated)</p>
                  <code className="block bg-gray-100 p-2 rounded text-xs overflow-auto">{tokens.refresh_token.substring(0,50)}...</code>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>

      {message && <div className="p-4 bg-green-50 rounded border border-green-100">{message}</div>}
      {error && <div className="p-4 bg-red-50 rounded border border-red-100">Error: {error}</div>}
    </div>
  );
}
