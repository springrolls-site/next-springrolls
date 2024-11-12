import { useSession } from "next-auth/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";

// Zod schema for validation, including `username`
const profileSchema = z.object({
  username: z
    .string()
    .min(2, "Username is required")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, hyphens, and underscores"
    ),
  name: z.string().min(2, "Name is required"),
  bio: z.string().max(500, "Bio can't exceed 500 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/login";
    },
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      name: "",
      bio: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/getProfile");
        if (response.ok) {
          const data = await response.json();
          if (data) {
            form.reset({
              username: data.username || "",
              name: data.name || "",
              bio: data.bio || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [form]);

  const onSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    setAlert(null);
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("name", values.name);
      formData.append("bio", values.bio || "");

      if (profileImage) formData.append("profileImage", profileImage);
      if (backgroundImage) formData.append("backgroundImage", backgroundImage);

      const response = await fetch("/api/updateProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setAlert({ type: "success", message: "Profile updated successfully!" });
      } else {
        setAlert({ type: "error", message: "Failed to update profile. Please try again." });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlert({ type: "error", message: "Failed to update profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      
      {alert && (
        <Alert className="mb-4" style={{ borderColor: alert.type === "success" ? "green" : "red" }}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="A short bio about yourself" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Profile Picture</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Background Image</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setBackgroundImage(e.target.files?.[0] || null)}
              />
            </FormControl>
          </FormItem>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Form>
    </DashboardLayout>
  );
};

export default Dashboard;