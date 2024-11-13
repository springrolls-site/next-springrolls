import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import SocialLinks from "@/components/SocialLinks";
import { useToast } from "@/hooks/use-toast";

export interface LinkStateType {
  id: number;
  name: string;
  url: string;
}

const ManageLinks = () => {
  const [links, setLinks] = useState<LinkStateType[]>([]);

  const { toast } = useToast();

  const fetchData = async () => {
    const response = await axios.get("/api/links");
    setLinks(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    // setLinks((prev) => [...prev, { name: "", url: ""}])
    const response = await axios.post("/api/links");
    fetchData();
  };

  const handleUpdate = async () => {
    const response = await axios.put("/api/links", { links });
    if (response.data.msg === "Update successful!") {
      toast({
        title: "Update successful!",
      });
    }

    new Promise(() => {
      setTimeout(() => {
        fetchData();
      }, 1000);
    });
  };

  const handleDelete = async (id: number) => {
    const response = await axios.delete("/api/links", { data: { id: id } });

    if (response.data.msg === "Delete successful!") {
      toast({
        title: "Delete successful!",
      });
    }
    fetchData();
  };

  const handleCancel = () => {
    fetchData();
  };
  const handleChange = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);
  };

  return (
    <>
      <DashboardLayout>
        <div className="w-full">
          <Tabs defaultValue="links" className="px-10 py-10">
            <TabsList>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="social">Socials</TabsTrigger>
            </TabsList>

            <TabsContent value="links">
              <div className="w-[50%]">
                {links.map((value, index) => (
                  <div key={index} className="grid grid-cols-2 gap-5 pb-5">
                    <div>
                      <Label htmlFor={`link-name-${index}`}>Link name</Label>
                      <Input
                        type="text"
                        id={`link-name-${index}`}
                        value={value.name}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                        autoComplete="off"
                        placeholder="Exclusive Content"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`link-url-${index}`}>Link URL</Label>
                      <div className="flex items-center gap-5">
                        <Input
                          type="text"
                          id={`link-url-${index}`}
                          value={value.url}
                          onChange={(e) =>
                            handleChange(index, "url", e.target.value)
                          }
                          autoComplete="off"
                          placeholder="https://www.instagram.com/"
                        />
                        <Button onClick={() => handleDelete(value.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between">
                  <Button onClick={handleAdd}>Add link</Button>
                  <div className="flex gap-2">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="social">
              <SocialLinks />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ManageLinks;
