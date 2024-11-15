import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { PacmanLoader, PropagateLoader } from "react-spinners";

const ManageLinks = () => {
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
              {/* First component */}
              <CustomLinks />
            </TabsContent>
            <TabsContent value="social">
              {/* Second component */}
              <SocialLinks />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};
export default ManageLinks;

export interface LinkStateType {
  id: number;
  name: string;
  url: string;
}

const CustomLinks = () => {
  const [links, setLinks] = useState<LinkStateType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchData = async () => {
    new Promise(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
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
      {loading ? (
        <div className="flex justify-center items-center">
          <PropagateLoader size={20} />
        </div>
      ) : (
        <div className="w-[50%]">
          {links.map((value, index) => (
            <div key={index} className="grid grid-cols-2 gap-5 pb-5">
              <div>
                <Label htmlFor={`link-name-${index}`}>Link name</Label>
                <Input
                  type="text"
                  id={`link-name-${index}`}
                  value={value.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
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
                    onChange={(e) => handleChange(index, "url", e.target.value)}
                    autoComplete="off"
                    placeholder="https://www.instagram.com/"
                  />
                  <Button onClick={() => handleDelete(value.id)}>Delete</Button>
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
      )}
    </>
  );
};

export interface SocialStateType {
  instagramUrl: string;
  twitterUrl: string;
  tiktokUrl: string;
  telegramUrl: string;
  snapchatUrl: string;
  youtubeUrl: string;
}
const SocialLinks = () => {
  const [social, setSocial] = useState<SocialStateType[]>([
    {
      instagramUrl: "",
      twitterUrl: "",
      tiktokUrl: "",
      telegramUrl: "",
      snapchatUrl: "",
      youtubeUrl: "",
    },
  ]);

  const { toast } = useToast();

  const fetchData = async () => {
    const response = await axios.get("/api/social");
    setSocial(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const response = await axios.post("/api/social", { social });
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

  const handleCancel = () => {
    fetchData();
  };

  const handleChange = (field: keyof SocialStateType, value: string) => {
    if (social.length > 0) {
      const updatedLinks = [...social];
      updatedLinks[0] = { ...updatedLinks[0], [field]: value };
      setSocial(updatedLinks);
    }
  };

  return (
    <>
      <div className="w-2/4 ">
        {social.length > 0 && (
          <div className="grid grid-cols-2 gap-5  pb-5">
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="https://www.instagram.com/"
                autoComplete="off"
                value={social[0].instagramUrl}
                onChange={(e) => handleChange("instagramUrl", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="tiktok">Tiktok</Label>
              <Input
                id="tiktok"
                placeholder="https://www.tiktok.com/"
                autoComplete="off"
                value={social[0].tiktokUrl}
                onChange={(e) => handleChange("tiktokUrl", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                placeholder="https://www.twitter.com/"
                autoComplete="off"
                value={social[0].twitterUrl}
                onChange={(e) => handleChange("twitterUrl", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="snapchat">Snapchat</Label>
              <Input
                id="snapchat"
                placeholder="https://www.snapchat.com/"
                autoComplete="off"
                value={social[0].snapchatUrl}
                onChange={(e) => handleChange("snapchatUrl", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="telegram">Telegram</Label>
              <Input
                id="telegram"
                placeholder="https://www.telegram.com/"
                autoComplete="off"
                value={social[0].telegramUrl}
                onChange={(e) => handleChange("telegramUrl", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="youtube">Youtube</Label>
              <Input
                id="youtube"
                placeholder="https://www.youtube.com/"
                autoComplete="off"
                value={social[0].youtubeUrl}
                onChange={(e) => handleChange("youtubeUrl", e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex gap-5 justify-end ">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </>
  );
};
