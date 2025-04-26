
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Sample profile data (would come from Supabase in a real implementation)
const initialProfiles = [
  { id: 1, name: "User 1", avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop" },
  { id: 2, name: "User 2", avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
  { id: 3, name: "Kids", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop" },
];

const ProfileSelection = () => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState(initialProfiles);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<null | typeof profiles[0]>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      const newProfile = {
        id: profiles.length + 1,
        name: newProfileName,
        avatarUrl: `https://source.unsplash.com/random/100x100?face&${Date.now()}`,
      };
      
      setProfiles([...profiles, newProfile]);
      setNewProfileName("");
      setIsCreateOpen(false);
      
      toast({
        title: "Profile Created",
        description: `${newProfileName} profile has been created successfully.`
      });
    }
  };

  const handleUpdateProfile = () => {
    if (selectedProfile && newProfileName.trim()) {
      setProfiles(profiles.map(profile => 
        profile.id === selectedProfile.id 
          ? { ...profile, name: newProfileName }
          : profile
      ));
      setSelectedProfile(null);
      setNewProfileName("");
      setIsEditOpen(false);
      
      toast({
        title: "Profile Updated",
        description: `Profile has been updated successfully.`
      });
    }
  };

  const startEditMode = () => {
    setIsEditing(!isEditing);
  };

  const openEditDialog = (profile: typeof profiles[0]) => {
    setSelectedProfile(profile);
    setNewProfileName(profile.name);
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-10 text-white">Who's watching?</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex flex-col items-center">
            {isEditing ? (
              <button
                onClick={() => openEditDialog(profile)}
                className="group relative cursor-pointer transition-all"
              >
                <Avatar className="h-[100px] w-[100px] border-2 border-transparent group-hover:border-white overflow-hidden">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} className="object-cover" />
                  <AvatarFallback className="text-2xl bg-gray-700">{profile.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <Edit className="w-10 h-10 text-white" />
                </div>
              </button>
            ) : (
              <Link to="/">
                <Avatar className="h-[100px] w-[100px] border-2 border-transparent hover:border-white cursor-pointer">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} className="object-cover" />
                  <AvatarFallback className="text-2xl bg-gray-700">{profile.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            )}
            <span className="text-gray-400 mt-2 text-center">{profile.name}</span>
          </div>
        ))}
        
        {!isEditing && (
          <div className="flex flex-col items-center">
            <button 
              onClick={() => setIsCreateOpen(true)}
              className="h-[100px] w-[100px] rounded-full bg-gray-700/50 hover:bg-gray-600 flex items-center justify-center border-2 border-transparent hover:border-white"
            >
              <Plus className="w-14 h-14 text-gray-400" />
            </button>
            <span className="text-gray-400 mt-2">Add Profile</span>
          </div>
        )}
      </div>
      
      <div className="mt-12">
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)} variant="outline" className="px-10 border-gray-600 text-gray-300">
            Done
          </Button>
        ) : (
          <Button onClick={startEditMode} variant="outline" className="px-10 border-gray-600 text-gray-300">
            Manage Profiles
          </Button>
        )}
      </div>

      {/* Create Profile Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-netflix-black border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Create New Profile</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new profile for another person watching Netflix.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <Input
              placeholder="Name"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="border-gray-700 text-gray-300">
                Cancel
              </Button>
              <Button onClick={handleCreateProfile} disabled={!newProfileName.trim()}>
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-netflix-black border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-[60px] w-[60px]">
                <AvatarImage src={selectedProfile?.avatarUrl} />
                <AvatarFallback className="bg-gray-700">{selectedProfile?.name[0]}</AvatarFallback>
              </Avatar>
              <Input
                placeholder="Name"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditOpen(false)} className="border-gray-700 text-gray-300">
                Cancel
              </Button>
              <Button onClick={handleUpdateProfile} disabled={!newProfileName.trim()}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSelection;
