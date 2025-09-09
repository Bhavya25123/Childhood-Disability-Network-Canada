import { PageLayout } from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { register } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Player");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, role);
      toast({ title: "Account created", description: "You can now sign in." });
      setEmail("");
      setPassword("");
      navigate("/sign-in");
    } catch (err) {
      toast({
        title: "Sign up failed",
        description: "Unable to create account",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout>
      <section className="bg-purple-light/30 py-16 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Create Account</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Join CDNC to access resources and community
          </p>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-purple/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    required
                  />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                    required
                  />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
                >
                  <option value="Player">Player</option>
                  <option value="Host">Host</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-purple hover:bg-purple-dark text-white">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SignUp;
