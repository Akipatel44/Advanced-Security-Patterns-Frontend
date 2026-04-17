"use client";

import { useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import IconUsers from "../../components/icons/IconUsers";

const API_URL = "http://localhost:8000/api/v1/rbac";
const AUTH_URL = "http://localhost:8000/api/v1/auth";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export default function Topic2() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Password123");
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState<any>(null);

  // Login first
  const handleLogin = async () => {
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:start'));
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${AUTH_URL}/login`, {
        email,
        password,
      });
      setTokens(response.data);
      setMessage("✓ Logged in! Now test RBAC endpoints below.");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:stop'));
    }
  };

  // Test endpoint
  const testEndpoint = async (endpoint: string, description: string) => {
    if (!tokens) {
      setError("Please login first");
      return;
    }

    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:start'));
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      setData({ description, data: response.data });
      setMessage("✓ Request successful!");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        err.response?.status === 403
          ? "❌ Access Denied! You don't have permission."
          : "Request failed"
      );
      setData(null);
    } finally {
      setLoading(false);
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('app:loading:stop'));
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex items-center gap-4">
          <IconUsers className="w-8 h-8 text-primary-500" />
          <div>
            <h1 className="text-2xl font-semibold">RBAC & ACL</h1>
            <p className="muted small">Role-based and permission-based access control patterns.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-semibold">Select Role & Login</h3>
              <div className="mt-3 space-y-3">
              <label className="label">User Role</label>
              <select value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded">
                <option value="admin@example.com">Admin - Full access</option>
                <option value="manager@example.com">Manager - Team access</option>
                <option value="user@example.com">User - Basic access</option>
              </select>
              <Button className="w-full" loading={loading} onClick={handleLogin}>{loading ? 'Logging in...' : 'Login'}</Button>
            </div>
          </Card>

          {tokens && (
            <Card>
              <h3 className="font-semibold">RBAC Tests</h3>
              <div className="mt-3 grid grid-cols-1 gap-3">
                <Button loading={loading} onClick={() => testEndpoint('/my-permissions', 'My Permissions')}>View Permissions</Button>
                <Button loading={loading} onClick={() => testEndpoint('/user-data', 'User Data')}>Access User Data</Button>
                <Button loading={loading} onClick={() => testEndpoint('/admin-panel', 'Admin Panel')}>Admin Panel</Button>
                <Button loading={loading} onClick={() => testEndpoint('/permission-matrix', 'Permission Matrix')}>View Matrix</Button>
                <Button loading={loading} onClick={() => testEndpoint('/resource-access', 'Resource Access')}>Check ACL</Button>
                <Button loading={loading} onClick={() => testEndpoint('/permissions', 'All Permissions')}>View All Permissions</Button>
              </div>
            </Card>
          )}
        </div>
      </Card>

      {data && (
        <Card>
          <h3 className="font-semibold">Response: {data.description}</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm">{JSON.stringify(data.data, null, 2)}</pre>
        </Card>
      )}

      {message && <div className="p-4 bg-green-50 rounded border border-green-100">{message}</div>}
      {error && <div className="p-4 bg-red-50 rounded border border-red-100">{error}</div>}
    </div>
  );
}
