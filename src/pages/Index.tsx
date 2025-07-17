
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, ExternalLink, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Link {
  id: string;
  title: string;
  url: string;
}

const Index = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addLink = () => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: "",
      url: ""
    };
    setLinks([...links, newLink]);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (id: string, field: 'title' | 'url', value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom d'utilisateur est requis",
        variant: "destructive"
      });
      return;
    }

    // Validation des liens
    const validLinks = links.filter(link => link.title.trim() && link.url.trim());
    
    setIsLoading(true);
    
    try {
      // Simulation de création du profil
      const profileData = {
        username: username.toLowerCase().replace(/[^a-z0-9]/g, ''),
        bio: bio.trim(),
        links: validLinks,
        created_at: new Date().toISOString()
      };

      // Stocker localement pour la démo
      localStorage.setItem(`profile_${profileData.username}`, JSON.stringify(profileData));
      
      toast({
        title: "Profil créé avec succès !",
        description: `Votre lien : tinybio.link/${profileData.username}`
      });

      // Rediriger vers la page premium
      setTimeout(() => {
        navigate(`/premium/${profileData.username}`);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <ExternalLink className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            TinyBio.Link
          </h1>
          <p className="text-gray-600 text-lg">
            Créez votre page de liens personnalisée en quelques clics
          </p>
        </div>

        {/* Formulaire principal */}
        <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom d'utilisateur */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Nom d'utilisateur *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  tinybio.link/
                </span>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="votrenom"
                  className="pl-24 h-12 border-gray-200 focus:border-purple-400 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Bio (optionnelle)
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Parlez-nous de vous en quelques mots..."
                className="min-h-[80px] border-gray-200 focus:border-purple-400 transition-colors resize-none"
                maxLength={200}
              />
              <p className="text-xs text-gray-500">{bio.length}/200 caractères</p>
            </div>

            {/* Section des liens */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Vos liens
                </label>
                <Button
                  type="button"
                  onClick={addLink}
                  variant="outline"
                  size="sm"
                  className="hover:bg-purple-50 hover:border-purple-300"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter un lien
                </Button>
              </div>

              {links.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ExternalLink className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun lien ajouté pour le moment</p>
                  <p className="text-sm">Cliquez sur "Ajouter un lien" pour commencer</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div key={link.id} className="flex gap-2 items-start animate-fade-in">
                      <div className="flex-1 space-y-2">
                        <Input
                          type="text"
                          value={link.title}
                          onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                          placeholder="Titre du lien"
                          className="border-gray-200 focus:border-purple-400"
                        />
                        <Input
                          type="url"
                          value={link.url}
                          onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                          placeholder="https://..."
                          className="border-gray-200 focus:border-purple-400"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeLink(link.id)}
                        variant="outline"
                        size="icon"
                        className="mt-2 hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bouton de soumission */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Création en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Générer mon lien
                </div>
              )}
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Gratuit pour toujours • Premium à partir de 3€/mois</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
