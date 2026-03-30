// d:\web development\project\e_commerce\ecommerce-front\hooks\useWishlist.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// --- Placeholder API Functions ---
// Replace these with your actual API calls to fetch/add wishlist items
const fetchWishlistItemsAPI = async (): Promise<string[]> => {
  // Simulate an API call
  console.log("Fetching wishlist items...");
  return new Promise((resolve) =>
    setTimeout(() => {
      // In a real app, this would fetch from your backend
      const storedWishlist = JSON.parse(
        localStorage.getItem("wishlistItems") || "[]",
      );
      resolve(storedWishlist);
    }, 300),
  );
};

const toggleProductInWishlistAPI = async (productId: string): Promise<void> => {
  // Simulate an API call
  console.log(`Toggling product ${productId} in wishlist via API...`);
  return new Promise((resolve) =>
    setTimeout(() => {
      const storedWishlist = JSON.parse(
        localStorage.getItem("wishlistItems") || "[]",
      );
      const index = storedWishlist.indexOf(productId);
      if (index > -1) {
        storedWishlist.splice(index, 1); // Remove if already present
      } else {
        storedWishlist.push(productId); // Add if not present
      }
      localStorage.setItem("wishlistItems", JSON.stringify(storedWishlist));
      resolve();
    }, 500),
  );
};

const clearWishlistAPI = async (): Promise<void> => {
  // Simulate an API call
  console.log(`Clearing wishlist via API...`);
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.setItem("wishlistItems", JSON.stringify([]));
      resolve();
    }, 500),
  );
};

// --- End Placeholder API Functions ---

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const {
    data: wishlistItems,
    isLoading: isWishlistLoading,
    isError: isWishlistError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlistItemsAPI,
    initialData: [] as string[], // Provide an initial empty array to avoid undefined
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
  });

  const toggleWishlistMutation = useMutation<
    void,
    Error,
    string,
    { previousWishlist: string[] | undefined }
  >({
    mutationFn: toggleProductInWishlistAPI,
    onMutate: async (newProductId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previousWishlist = queryClient.getQueryData<string[]>(["wishlist"]);

      if (previousWishlist) {
        const newWishlist = previousWishlist.includes(newProductId)
          ? previousWishlist.filter((id) => id !== newProductId)
          : [...previousWishlist, newProductId];
        queryClient.setQueryData<string[]>(["wishlist"], newWishlist);
      }

      return { previousWishlist };
    },
    onError: (err, newProductId, context) => {
      queryClient.setQueryData(["wishlist"], context?.previousWishlist);
      console.error("Failed to toggle wishlist item:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const clearWishlistMutation = useMutation<
    void,
    Error,
    void,
    { previousWishlist: string[] | undefined }
  >({
    mutationFn: clearWishlistAPI,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previousWishlist = queryClient.getQueryData<string[]>(["wishlist"]);
      queryClient.setQueryData<string[]>(["wishlist"], []);
      return { previousWishlist };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["wishlist"], context?.previousWishlist);
      console.error("Failed to clear wishlist:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const toggleWishlist = (productId: string) => {
    toggleWishlistMutation.mutate(productId);
  };

  const clearWishlist = () => {
    clearWishlistMutation.mutate();
  };

  return {
    wishlistItems: wishlistItems,
    toggleWishlist,
    clearWishlist,
    isWishlistLoading,
    isWishlistError,
    isTogglingWishlist: toggleWishlistMutation.isPending,
    isClearingWishlist: clearWishlistMutation.isPending,
  };
};
