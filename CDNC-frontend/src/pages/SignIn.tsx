import { PageLayout } from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sign in successful",
      description: "Welcome back to CDNC!",
    });
    setEmail("");
    setPassword("");
  };

  return (
    <PageLayout>
      <section className="bg-purple-light/30 py-16 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Welcome Back</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Sign in to access your caregiver resources and community
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-purple-900 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-purple-900 hover:text-purple-900">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple hover:bg-purple-dark text-white"
              >
                Sign In
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <a href="#" className="text-purple-900 hover:text-purple-900 font-medium">
                  Create one now
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SignIn;
