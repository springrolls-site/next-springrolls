import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";

export interface SocialStateType {
  instagramUrl: string;
  twitterUrl: string;
  tiktokUrl: string;
  telegramUrl: string;
  snapchatUrl: string;
  youtubeUrl: string;
}
const SocialLinks = () => {
  const [social, setSocial] = useState<SocialStateType[]>([]);

  const fetchData = async () => {
    const response = await axios.get("/api/social");
    console.log("Response: ", response);
    setSocial(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    await axios.post("/api/social", { social });
    fetchData();
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
      {JSON.stringify(social)}
      {social.length > 0 && (
        <div className="grid grid-cols-2 gap-5 w-2/4">
          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              placeholder="https://www.instagram.com/"
              value={social[0].instagramUrl}
              onChange={(e) => handleChange("instagramUrl", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="tiktok">Tiktok</Label>
            <Input
              id="tiktok"
              placeholder="https://www.tiktok.com/"
              value={social[0].tiktokUrl}
              onChange={(e) => handleChange("tiktokUrl", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              placeholder="https://www.twitter.com/"
              value={social[0].twitterUrl}
              onChange={(e) => handleChange("twitterUrl", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="snapchat">Snapchat</Label>
            <Input
              id="snapchat"
              placeholder="https://www.snapchat.com/"
              value={social[0].snapchatUrl}
              onChange={(e) => handleChange("snapchatUrl", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="telegram">Telegram</Label>
            <Input
              id="telegram"
              placeholder="https://www.telegram.com/"
              value={social[0].telegramUrl}
              onChange={(e) => handleChange("telegramUrl", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="youtube">Youtube</Label>
            <Input
              id="youtube"
              placeholder="https://www.youtube.com/"
              value={social[0].youtubeUrl}
              onChange={(e) => handleChange("youtubeUrl", e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="flex gap-5">
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </>
  );
};

export default SocialLinks;
