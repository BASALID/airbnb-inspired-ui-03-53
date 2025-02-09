
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Listing } from "@/types/listing";
import { toast } from "sonner";

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Superbe villa avec vue",
    location: "Sant Miquel de Balansat, Espagne",
    price: 67,
    rating: 5.0,
    image: "/lovable-uploads/00196f15-e8ff-48fb-bf68-e133fa5e4064.png",
    dates: "15-20 févr.",
    description: "Une magnifique villa avec vue sur la mer...",
    images: ["/lovable-uploads/00196f15-e8ff-48fb-bf68-e133fa5e4064.png"],
    host: {
      name: "Bas",
      image: "/placeholder.svg",
    },
  },
  {
    id: "2",
    title: "Appartement moderne",
    location: "San Miguel, Pérou",
    price: 94,
    rating: 4.94,
    image: "https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg",
    dates: "17-22 févr.",
    description: "Un appartement moderne au cœur de la ville...",
    images: ["https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg"],
    host: {
      name: "Enrique",
      image: "/placeholder.svg",
    },
  },
];

export const useListings = () => {
  const queryClient = useQueryClient();

  const { data: listings = [], isLoading, error } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => MOCK_LISTINGS,
  });

  const addListing = useMutation({
    mutationFn: async (newListing: Omit<Listing, "id">) => {
      // Simuler l'ajout d'un listing
      const listing = {
        ...newListing,
        id: Math.random().toString(36).substr(2, 9),
      };
      return listing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Logement ajouté avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout du logement");
    },
  });

  const updateListing = useMutation({
    mutationFn: async (updatedListing: Listing) => {
      // Simuler la mise à jour d'un listing
      return updatedListing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Logement mis à jour avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du logement");
    },
  });

  const deleteListing = useMutation({
    mutationFn: async (listingId: string) => {
      // Simuler la suppression d'un listing
      return listingId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Logement supprimé avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la suppression du logement");
    },
  });

  return {
    listings,
    isLoading,
    error,
    addListing,
    updateListing,
    deleteListing,
  };
};
