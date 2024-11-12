// pages/chinessecook/index.tsx
import { useSession } from "next-auth/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";

// Zod schema for validation
const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().max(500, "Bio can't exceed 500 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/login";
    },
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  // Initialize form with react-hook-form and zodResolver
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  // Fetch profile data and populate form if data exists
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/getProfile");
        if (response.ok) {
          const data = await response.json();
          if (data) {
            form.reset({
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

  // Handle form submission
  const onSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("bio", values.bio || "");

      if (profileImage) formData.append("profileImage", profileImage);
      if (backgroundImage) formData.append("backgroundImage", backgroundImage);

      const response = await fetch("/api/updateProfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
