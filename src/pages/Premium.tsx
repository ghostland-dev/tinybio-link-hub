
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Check, BarChart3, Palette, Zap, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Premium = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      // Simulation de l'intégration Stripe
      toast({
        title: "Redirection vers Stripe...",
        description: "Vous allez être redirigé vers la page de paiement sécurisée"
      });

      // Simulation d'un délai de redirection
      setTimeout(() => {
        toast({
          title: "Fonctionnalité en développement",
          description: "L'intégration Stripe sera disponible prochainement"
        });
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'abonnement",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const viewProfile = () => {
    navigate(`/${username}`);
  };

  const goHome = () => {
    navigate('/');
  };

  const features = [
    {
      icon: BarChart3,
      title: "Statistiques avancées",
      description: "Suivez les clics et l'engagement de vos liens"
    },
    {
      icon: Palette,
      title: "Personnalisation",
      description: "Thèmes personnalisés et couleurs de marque"
    },
    {
      icon: Zap,
      title: "Liens prioritaires",
      description: "Mettez en avant vos liens les plus importants"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Button
            onClick={goHome}
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Félicitations ! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Votre profil <span className="font-semibold text-purple-600">@{username}</span> a été créé avec succès
          </p>
        </div>

        {/* Succès */}
        <Card className="p-6 mb-8 bg-green-50 border-green-200 animate-scale-in">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Votre lien est prêt !
            </h3>
            <p className="text-green-700 mb-4">
              <code className="bg-green-100 px-2 py-1 rounded text-sm">
                tinybio.link/{username}
              </code>
            </p>
            <Button 
              onClick={viewProfile}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Voir mon profil
            </Button>
          </div>
        </Card>

        {/* Offre Premium */}
        <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Passez Premium
            </h2>
            <p className="text-gray-600">
              Débloquez des fonctionnalités avancées pour optimiser votre présence en ligne
            </p>
          </div>

          {/* Prix */}
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              3€
              <span className="text-lg font-normal text-gray-600">/mois</span>
            </div>
            <p className="text-sm text-gray-600">
              Première semaine gratuite
            </p>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <feature.icon className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Redirection...
                </div>
              ) : (
                <div className="flex items-center">
                  <Crown className="h-4 w-4 mr-2" />
                  S'abonner Premium
                </div>
              )}
            </Button>
            
            <Button
              onClick={viewProfile}
              variant="outline"
              className="w-full hover:bg-gray-50"
            >
              Continuer avec la version gratuite
            </Button>
          </div>

          {/* Garantie */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>✨ Annulation possible à tout moment</p>
            <p>🔒 Paiement sécurisé par Stripe</p>
          </div>
        </Card>

        {/* Témoignage */}
        <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
          <div className="text-center">
            <p className="text-blue-800 italic mb-3">
              "TinyBio.Link Premium m'a permis d'augmenter mon engagement de 40% grâce aux statistiques détaillées !"
            </p>
            <p className="text-sm text-blue-600 font-medium">
              — Marie, Content Creator
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Premium;
