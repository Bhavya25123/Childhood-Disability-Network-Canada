import { PageLayout } from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { login } from "@/lib/auth";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getErrorMessage, logError } from "@/utils/error";
import { validateEmail, validatePassword } from "@/utils/validation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (name: keyof typeof fieldErrors, value: string) => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {
      email: validateField("email", email),
      password: validateField("password", password),
    };

    setFieldErrors(nextErrors);

    return Object.values(nextErrors).every((message) => message === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      toast({
        title: "Check your details",
        description: "Fix the highlighted fields before signing in.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("fullName", res.fullName);
      toast({
        title: "Login successful",
        description: `Welcome back to CDNC!`,
      });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      const message = getErrorMessage(err, "Invalid credentials");
      logError("SignIn", err);
      setFormError(message);
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (name: keyof typeof fieldErrors, value: string) => {
    setFieldErrors((prev) => ({
      ...prev,
      [name]: prev[name] ? validateField(name, value) : "",
    }));
  };

  return (
    <PageLayout>
      <section className="bg-purple-50 py-16 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Welcome Back</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Sign in to access your caregiver resources and community
          </p>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-purple-200 p-8">
            {formError ? (
              <Alert variant="destructive" className="mb-4 text-left">
                <AlertTitle>We couldn&apos;t sign you in</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (formError) {
                      setFormError(null);
                    }
                    setEmail(value);
                    handleFieldChange("email", value);
                  }}
                  onBlur={(e) =>
                    setFieldErrors((prev) => ({
                      ...prev,
                      email: validateField("email", e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {fieldErrors.email ? <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (formError) {
                      setFormError(null);
                    }
                    setPassword(value);
                    handleFieldChange("password", value);
                  }}
                  onBlur={(e) =>
                    setFieldErrors((prev) => ({
                      ...prev,
                      password: validateField("password", e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {fieldErrors.password ? (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Log In"}
              </Button>

              <p className="text-sm text-center mt-4">
                Don't have an account?{' '}
                <Link to="/sign-up" className="text-purple-600 font-medium">
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SignIn;
