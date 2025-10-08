import { PageLayout } from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { register } from "@/lib/auth";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getErrorMessage, logError } from "@/utils/error";
import {
  validateCityOrConstituency,
  validateEmail,
  validateMinLength,
  validatePassword,
  validatePostalCode,
} from "@/utils/validation";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    email: "",
    city: "",
    province: "",
    zipCode: "",
    description: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (name: keyof typeof fieldErrors, value: string) => {
    switch (name) {
      case "fullName":
        return validateMinLength(value, 2, "Full name");
      case "email":
        return validateEmail(value);
      case "city":
        return validateCityOrConstituency(value, "City");
      case "province":
        return validateMinLength(value, 2, "Province");
      case "zipCode":
        return validatePostalCode(value, "Postal code");
      case "description":
        return validateMinLength(value, 10, "Description");
      case "password":
        return validatePassword(value);
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {
      fullName: validateField("fullName", fullName),
      email: validateField("email", email),
      city: validateField("city", city),
      province: validateField("province", province),
      zipCode: validateField("zipCode", zipCode),
      description: validateField("description", description),
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
        title: "Check the highlighted fields",
        description: "Fix the validation errors before creating your account.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await register({ fullName, email, city, province, zipCode, description, password });
      toast({ title: "Account created", description: "You can now log in." });
      setFullName("");
      setEmail("");
      setCity("");
      setProvince("");
      setZipCode("");
      setDescription("");
      setPassword("");
      navigate("/sign-in");
    } catch (err) {
      const message = getErrorMessage(err, "Unable to create account");
      logError("SignUp", err);
      setFormError(message);
      toast({
        title: "Account creation failed",
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-900">Create Account</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Join CDNC to access resources and community
          </p>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-purple-200 p-8">
            {formError ? (
              <Alert variant="destructive" className="mb-4 text-left">
                <AlertTitle>We couldn&apos;t create your account</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (formError) {
                      setFormError(null);
                    }
                    setFullName(value);
                    handleFieldChange("fullName", value);
                  }}
                  onBlur={(e) =>
                    setFieldErrors((prev) => ({
                      ...prev,
                      fullName: validateField("fullName", e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {fieldErrors.fullName ? (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.fullName}</p>
                ) : null}
              </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (formError) {
                        setFormError(null);
                      }
                      setCity(value);
                      handleFieldChange("city", value);
                    }}
                    onBlur={(e) =>
                      setFieldErrors((prev) => ({
                        ...prev,
                        city: validateField("city", e.target.value),
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  {fieldErrors.city ? <p className="mt-1 text-sm text-red-600">{fieldErrors.city}</p> : null}
                </div>
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    id="province"
                    value={province}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (formError) {
                        setFormError(null);
                      }
                      setProvince(value);
                      handleFieldChange("province", value);
                    }}
                    onBlur={(e) =>
                      setFieldErrors((prev) => ({
                        ...prev,
                        province: validateField("province", e.target.value),
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  {fieldErrors.province ? (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.province}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      if (formError) {
                        setFormError(null);
                      }
                      setZipCode(value);
                      handleFieldChange("zipCode", value);
                    }}
                    onBlur={(e) =>
                      setFieldErrors((prev) => ({
                        ...prev,
                        zipCode: validateField("zipCode", e.target.value.toUpperCase()),
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                    inputMode="text"
                    autoCapitalize="characters"
                  />
                  {fieldErrors.zipCode ? <p className="mt-1 text-sm text-red-600">{fieldErrors.zipCode}</p> : null}
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (formError) {
                        setFormError(null);
                      }
                      setDescription(value);
                      handleFieldChange("description", value);
                    }}
                    onBlur={(e) =>
                      setFieldErrors((prev) => ({
                        ...prev,
                        description: validateField("description", e.target.value),
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  {fieldErrors.description ? (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
                  ) : null}
                </div>
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
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-sm text-center mt-4">
                Already have an account?{' '}
                <Link to="/sign-in" className="text-purple-600 font-medium">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SignUp;
