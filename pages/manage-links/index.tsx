import ManageLinks from "./ManageLinks";

const Page = () => {
  return (
    <>
      <ManageLinks />
    </>
  );
};

export default Page;

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import DashboardLayout from "@/layouts/DashboardLayout";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export interface LinkStateType {
//   id: number;
//   name: string;
//   url: string;
// }

// export interface SocialStateType {
//   id: number;
//   // name: string;
//   url: string;
// }

// const Page = () => {
//   const [links, setLinks] = useState<LinkStateType[]>([]);

//   const [social, setSocial] = useState([]);

//   const fetchData = async () => {
//     const response = await axios.get("/api/links");
//     setLinks(response.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleAdd = async () => {
//     // setLinks((prev) => [...prev, { name: "", url: ""}])
//     const response = await axios.post("/api/links");
//     fetchData();
//   };

//   const handleUpdate = async () => {
//     const response = await axios.put("/api/links", { links });
//     fetchData();
//   };

//   const handleDelete = async (id: number) => {
//     const response = await axios.delete("/api/links", { data: { id: id } });
//     fetchData();
//   };

//   const handleCancel = () => {
//     fetchData();
//   };
//   const handleChange = (
//     index: number,
//     field: "name" | "url",
//     value: string
//   ) => {
//     const updatedLinks = [...links];
//     updatedLinks[index] = { ...updatedLinks[index], [field]: value };
//     setLinks(updatedLinks);
//   };

//   return (
//     <>
//       <DashboardLayout>
//         {JSON.stringify(links)}
//         <div className="border border-black w-full">
//           <Tabs defaultValue="links" className="px-10 py-10">
//             <TabsList>
//               <TabsTrigger value="links">Links</TabsTrigger>
//               <TabsTrigger value="social">Socials</TabsTrigger>
//             </TabsList>

//             <TabsContent value="links">
//               <div className="w-[50%]">
//                 {links.map((value, index) => (
//                   <div
//                     key={index}
//                     className="flex gap-5 w-full border border-black"
//                   >
//                     <div>
//                       <Label htmlFor={`link-name-${index}`}>Link name</Label>
//                       <Input
//                         type="text"
//                         id={`link-name-${index}`}
//                         value={value.name}
//                         onChange={(e) =>
//                           handleChange(index, "name", e.target.value)
//                         }
//                         autoComplete="off"
//                         placeholder="Exclusive Content"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor={`link-url-${index}`}>Link URL</Label>
//                       <div className="flex items-center gap-5">
//                         <Input
//                           type="text"
//                           id={`link-url-${index}`}
//                           value={value.url}
//                           onChange={(e) =>
//                             handleChange(index, "url", e.target.value)
//                           }
//                           autoComplete="off"
//                           placeholder="https://www.instagram.com/"
//                         />
//                         <Button onClick={() => handleDelete(value.id)}>
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="flex justify-between">
//                   <Button onClick={handleAdd}>Add link</Button>
//                   <div className="flex gap-2">
//                     <Button onClick={handleCancel}>Cancel</Button>
//                     <Button onClick={handleUpdate}>Update</Button>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
//             <TabsContent value="social">
//               <div className="grid grid-cols-2 gap-5 w-2/4">
//                 <div>
//                   <Label htmlFor={``}>Instagram</Label>
//                   <Input placeholder="" />
//                 </div>

//                 <div>
//                   <Label htmlFor={``}>Tiktok</Label>
//                   <Input placeholder="" />
//                 </div>

//                 <div>
//                   <Label htmlFor={``}>Twitter</Label>
//                   <Input placeholder="" />
//                 </div>

//                 <div>
//                   <Label htmlFor={``}>Snapchat</Label>
//                   <Input placeholder="" />
//                 </div>

//                 <div>
//                   <Label htmlFor={``}>Telegram</Label>
//                   <Input placeholder="" />
//                 </div>

//                 <div>
//                   <Label htmlFor={``}>Youtube</Label>
//                   <Input placeholder="" />
//                 </div>
//               </div>
//               <Button onClick={handleUpdate}>Update</Button>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </DashboardLayout>
//     </>
//   );
// };

// export default Page;
