
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, User, Crown } from "lucide-react";

interface ProfileData {
  username: string;
  bio: string;
  links: Array<{
    id: string;
    title: string;
    url: string;
  }>;
  is_premium?: boolean;
  created_at: string;
}

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const storedProfile = localStorage.getItem(`profile_${username}`);
        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profil introuvable</h2>
          <p className="text-gray-600 mb-6">
            Le profil @{username} n'existe pas ou a été supprimé.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Créer mon profil
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header du profil */}
        <Card className="p-6 text-center mb-6 bg-white/80 backdrop-blur-sm shadow-xl border-0 animate-fade-in">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            {profile.is_premium && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="h-3 w-3 text-yellow-800" />
              </div>
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            @{profile.username}
          </h1>
          
          {profile.bio && (
            <p className="text-gray-600 leading-relaxed">
              {profile.bio}
            </p>
          )}
        </Card>

        {/* Liste des liens */}
        <div className="space-y-3">
          {profile.links.length === 0 ? (
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm">
              <ExternalLink className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">Aucun lien disponible</p>
            </Card>
          ) : (
            profile.links.map((link, index) => (
              <Card 
                key={link.id}
                className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Button
                  onClick={() => handleLinkClick(link.url)}
                  variant="ghost"
                  className="w-full h-auto p-6 justify-between hover:bg-purple-50 transition-colors group"
                >
                  <div className="flex items-center flex-1">
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </Button>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm mb-4">
            Créé avec TinyBio.Link
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            size="sm"
            className="hover:bg-purple-50 hover:border-purple-300"
          >
            Créer mon profil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
