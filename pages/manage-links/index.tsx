import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";

interface LinkStateType {
  id: number;
  name: string;
  url: string;
}

const Page = () => {
  const [temp, setTemp] = useState<LinkStateType[]>([]);

  // Fetch the existing links on component mount
  const trying = async () => {
    const response = await axios.get("/api/links");
    console.log("Frontend: ", response.data);
    console.log("LENGTH: ", response.data.length);
    for (let i in response.data) {
      setTemp((prev) => [
        ...prev,
        {
          id: response.data[i].id,
          name: response.data[i].name,
          url: response.data[i].url,
        },
      ]);
    }
  };

  useEffect(() => {
    trying();
  }, []);

  const handleUpdate = async () => {
    const response = await axios.post("/api/links", { temp });
  };

  const handleDelete = async (id: number) => {
    const response = await axios.delete("/api/links", { data: { id: id } });
    
  };

  const handleChange = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    const updatedLinks = [...temp];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setTemp(updatedLinks);
  };

  return (
    <>
      <DashboardLayout>
        {JSON.stringify(temp)}
        <div className="border border-black w-full">
          <Tabs defaultValue="links" className="px-10 py-10">
            <TabsList>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="social">Socials</TabsTrigger>
            </TabsList>

            <TabsContent value="links">
              <div className="">
                {temp.map((value, index) => (
                  <div
                    key={index}
                    className="flex gap-5 w-full border border-black"
                  >
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
                ))}

                <div className="flex justify-between">
                  <Button>Add link</Button>
                  <div className="flex gap-2">
                    <Button>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="social">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Page;
