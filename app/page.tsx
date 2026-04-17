import Link from "next/link";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import IconKey from "../components/icons/IconKey";
import IconUsers from "../components/icons/IconUsers";
import IconShield from "../components/icons/IconShield";

export default function Home() {
  return (
    <div className="space-y-8">
      <Card className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl title mb-1">Advanced Security Patterns</h1>
            <p className="label">Learn JWT Authentication, RBAC/ACL, and Secure APIs</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/topic1"><Button className="hidden md:inline-flex">Get Started</Button></Link>
            <Button variant="ghost" className="ml-2">Docs</Button>
          </div>
        </div>

        <div className="mt-8 card-grid cols-3">
          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <IconKey className="w-7 h-7 text-primary-500" />
              <h3 className="text-lg font-semibold">JWT Authentication</h3>
            </div>
            <p className="muted small mb-4">Access & refresh tokens, secure session handling, token rotation.</p>
            <ul className="text-sm muted mb-4 space-y-1">
              <li>Token creation</li>
              <li>Short & long lived tokens</li>
              <li>Session security</li>
            </ul>
            <Link href="/topic1"><Button variant="primary">Explore</Button></Link>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <IconUsers className="w-7 h-7 text-primary-500" />
              <h3 className="text-lg font-semibold">RBAC & ACL</h3>
            </div>
            <p className="muted small mb-4">Role hierarchies, permission matrices, ownership checks.</p>
            <ul className="text-sm muted mb-4 space-y-1">
              <li>Role-based access</li>
              <li>Permission checks</li>
              <li>Resource ACLs</li>
            </ul>
            <Link href="/topic2"><Button variant="primary">Explore</Button></Link>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <IconShield className="w-7 h-7 text-primary-500" />
              <h3 className="text-lg font-semibold">Secure APIs</h3>
            </div>
            <p className="muted small mb-4">Validation, rate limiting, and consistent error handling.</p>
            <ul className="text-sm muted mb-4 space-y-1">
              <li>Input validation</li>
              <li>Rate limiting</li>
              <li>Error handling</li>
            </ul>
            <Link href="/topic3"><Button variant="primary">Explore</Button></Link>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-3">Quick Start</h2>
        <p className="muted small mb-2">Backend Setup</p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm">
{`cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload`}
        </pre>
        <p className="label mt-3">API Docs: <a href="http://localhost:8000/docs" className="text-primary-500 hover:underline">http://localhost:8000/docs</a></p>
      </Card>
    </div>
  );
}
