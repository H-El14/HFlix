import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample profile data (would come from Supabase in a real implementation)
const initialProfiles = [
  { id: 1, name: "User 1", avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop" },
  { id: 2, name: "User 2", avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" },
  { id: 3, name: "Kids", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop" },
  { id: 4, name: "Admin", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", isAdmin: true },
];

const ProfileSelection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState(initialProfiles);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<null | typeof profiles[0]>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarOptions] = useState([
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  ]);
  
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
          ? { ...profile, name: newProfileName, avatarUrl: selectedProfile.avatarUrl }
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

  const handleDeleteProfile = () => {
    if (selectedProfile) {
      if (selectedProfile.name === "Admin") {
        toast({
          title: "Cannot Delete Admin",
          description: "The Admin profile cannot be deleted.",
          variant: "destructive"
        });
        setDeleteDialogOpen(false);
        return;
      }
      
      setProfiles(profiles.filter(profile => profile.id !== selectedProfile.id));
      setSelectedProfile(null);
      setDeleteDialogOpen(false);
      
      toast({
        title: "Profile Deleted",
        description: `Profile has been deleted.`
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

  const openAvatarDialog = (profile: typeof profiles[0]) => {
    setSelectedProfile(profile);
    setAvatarDialogOpen(true);
  };

  const openDeleteDialog = (profile: typeof profiles[0]) => {
    setSelectedProfile(profile);
    setDeleteDialogOpen(true);
  };

  const updateAvatar = (avatarUrl: string) => {
    if (selectedProfile) {
      setProfiles(profiles.map(profile => 
        profile.id === selectedProfile.id 
          ? { ...profile, avatarUrl }
          : profile
      ));
      setAvatarDialogOpen(false);
      
      toast({
        title: "Avatar Updated",
        description: "Profile avatar has been updated."
      });
    }
  };

  const handleProfileClick = (profile: typeof profiles[0]) => {
    navigate('/home', { state: { profileId: profile.id, profileName: profile.name, isAdmin: profile.isAdmin } });
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-10 text-white">Who's watching?</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex flex-col items-center">
            {isEditing ? (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => openAvatarDialog(profile)}
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
                <div className="flex flex-row gap-2">
                  <button 
                    onClick={() => openEditDialog(profile)}
                    className="p-1 text-white bg-gray-700 hover:bg-gray-600 rounded-full"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openDeleteDialog(profile)}
                    className="p-1 text-white bg-red-700 hover:bg-red-600 rounded-full"
                    disabled={profile.name === "Admin"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className={`mt-1 text-center ${profile.name === "Admin" ? "text-netflix-red font-semibold" : "text-gray-400"}`}>{profile.name}</span>
              </div>
            ) : (
              <button onClick={() => handleProfileClick(profile)} className="flex flex-col items-center">
                <Avatar className="h-[100px] w-[100px] border-2 border-transparent hover:border-white cursor-pointer">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} className="object-cover" />
                  <AvatarFallback className="text-2xl bg-gray-700">{profile.name[0]}</AvatarFallback>
                </Avatar>
                <span className={`mt-2 text-center ${profile.name === "Admin" ? "text-netflix-red font-semibold" : "text-gray-400"}`}>{profile.name}</span>
              </button>
            )}
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

      <Dialog open={avatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
        <DialogContent className="bg-netflix-black border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Choose Profile Avatar</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            {avatarOptions.map((avatar, index) => (
              <button 
                key={index}
                onClick={() => updateAvatar(avatar)}
                className="rounded-md overflow-hidden border-2 border-transparent hover:border-white"
              >
                <img src={avatar} alt={`Avatar option ${index + 1}`} className="w-full aspect-square object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-netflix-black border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Profile?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this profile? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-700 text-gray-300 bg-transparent">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProfile} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileSelection;
