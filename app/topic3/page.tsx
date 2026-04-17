"use client";

import { useState } from "react";
import axios from "../../lib/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import IconShield from "../../components/icons/IconShield";

const API_URL = "http://localhost:8000/api/v1/posts";
const AUTH_URL = "http://localhost:8000/api/v1/auth";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export default function Topic3() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Password123");
  const [tokens, setTokens] = useState<Tokens | null>(null);
  // Per-action loading states so actions don't interfere visually
  const [loginLoading, setLoginLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState<any>(null);

  // Form data
  const [title, setTitle] = useState("My Amazing Blog Post");
  const [content, setContent] = useState("This is a really interesting blog post about security patterns.");
  const [tags, setTags] = useState("security,fastapi,api");
  const [skip, setSkip] = useState("0");
  const [limit, setLimit] = useState("10");

  // Login first
  const handleLogin = async () => {
    setLoginLoading(true);
    setError("");

    try {
      const response = await axios.post(`${AUTH_URL}/login`, {
        email,
        password,
      });
      setTokens(response.data);
      setMessage("✓ Logged in! Now test secure API endpoints below.");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // Test create post
  const testCreatePost = async () => {
    if (!tokens) {
      setError("Please login first");
      return;
    }

    setCreateLoading(true);
    setError("");
    setMessage("");

    try {
      const tagsArray = tags.split(",").map((t) => t.trim()).filter((t) => t);
      
      const response = await axios.post(
        `${API_URL}/`,
        {
          title,
          content,
          tags: tagsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      setData({ description: "Create Post", data: response.data });
      setMessage("✓ Post created successfully!");
    } catch (err: any) {
      const errorData = err.response?.data;
      setError(
        errorData?.detail ||
        (errorData?.detail && JSON.stringify(errorData.detail)) ||
        "Creation failed"
      );
      setData(null);
    } finally {
      setCreateLoading(false);
    }
  };

  // Test get post
  const testGetPost = async () => {
    if (!tokens) {
      setError("Please login first");
      return;
    }

    setGetLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/1`, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      setData({ description: "Get Post", data: response.data });
      setMessage("✓ Post retrieved successfully!");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        (err.response?.status === 404 ? "Post not found" : "Failed to get post")
      );
      setData(null);
    } finally {
      setGetLoading(false);
    }
  };

  // Test list posts
  const testListPosts = async () => {
    if (!tokens) {
      setError("Please login first");
      return;
    }

    setListLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/`, {
        params: {
          skip: parseInt(skip),
          limit: parseInt(limit),
        },
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      setData({ description: "List Posts", data: response.data });
      setMessage("✓ Posts listed successfully!");
    } catch (err: any) {
      const errors = err.response?.data?.detail;
      setError(
        Array.isArray(errors)
          ? errors.map((e: any) => `${e.loc.join(".")}: ${e.msg}`).join(", ")
          : errors ||
          "Failed to list posts"
      );
      setData(null);
    } finally {
      setListLoading(false);
    }
  };

  // Test publish post
  const testPublishPost = async () => {
    if (!tokens) {
      setError("Please login first");
      return;
    }

    setPublishLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/1/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      setData({ description: "Publish Post", data: response.data });
      setMessage("✓ Post published successfully!");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to publish post");
      setData(null);
    } finally {
      setPublishLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex items-center gap-4">
          <IconShield className="w-8 h-8 text-primary-500" />
          <div>
            <h1 className="text-2xl font-semibold">Secure APIs</h1>
            <p className="muted small">Validation, rate limiting, and error handling best practices.</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Card>
            <h3 className="font-semibold">Login</h3>
            <div className="mt-3 space-y-3">
              <label className="label">Select Role</label>
              <select value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded">
                <option value="admin@example.com">Admin</option>
                <option value="manager@example.com">Manager</option>
                <option value="user@example.com">User</option>
              </select>
              <Button onClick={handleLogin} loading={loginLoading}>{loginLoading ? 'Logging in...' : 'Login'}</Button>
            </div>
          </Card>

          {tokens && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <h3 className="font-semibold">Create Post</h3>
                <div className="space-y-3 mt-3">
                  <label className="label">Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded" />
                  <label className="label">Content</label>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border rounded" />
                  <label className="label">Tags</label>
                  <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-3 py-2 border rounded" />
                  <Button onClick={testCreatePost} loading={createLoading}>{createLoading ? 'Creating...' : 'Create Post'}</Button>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold">Other Tests</h3>
                <div className="mt-3 space-y-3">
                  <Button onClick={testGetPost} loading={getLoading}>{getLoading ? 'Getting...' : 'Get Post #1'}</Button>
                  <div className="flex gap-2">
                    <input value={skip} onChange={(e) => setSkip(e.target.value)} className="px-2 py-1 border rounded w-1/2" />
                    <input value={limit} onChange={(e) => setLimit(e.target.value)} className="px-2 py-1 border rounded w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={testListPosts} loading={listLoading}>{listLoading ? 'Listing...' : 'List Posts'}</Button>
                    <Button onClick={testPublishPost} loading={publishLoading}>{publishLoading ? 'Publishing...' : 'Publish Post #1'}</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Card>

      {data && (
        <Card>
          <h3 className="font-semibold">Response: {data.description}</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm max-h-96">{JSON.stringify(data.data, null, 2)}</pre>
        </Card>
      )}

      {message && <div className="p-4 bg-green-50 rounded border border-green-100">{message}</div>}
      {error && <div className="p-4 bg-red-50 rounded border border-red-100"><p className="font-semibold">Error:</p><p className="small">{error}</p></div>}
    </div>
  );
}
