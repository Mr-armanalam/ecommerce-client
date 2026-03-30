// d:\web development\project\e_commerce\ecommerce-front\hooks\useCart.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// --- Placeholder API Functions ---
// Replace these with your actual API calls to fetch/add cart items
const fetchCartItemsAPI = async (): Promise<string[]> => {
  // Simulate an API call
  console.log("Fetching cart items...");
  return new Promise((resolve) =>
    setTimeout(() => {
      // In a real app, this would fetch from your backend
      const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      resolve(storedCart);
    }, 300),
  );
};

const addProductToCartAPI = async (productId: string): Promise<void> => {
  // Simulate an API call
  console.log(`Adding product ${productId} to cart via API...`);
  return new Promise((resolve) =>
    setTimeout(() => {
      const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      storedCart.push(productId);
      localStorage.setItem("cartItems", JSON.stringify(storedCart));
      resolve();
    }, 500),
  );
};

const removeProductFromCartAPI = async (productId: string): Promise<void> => {
  // Simulate an API call
  console.log(
    `Removing one instance of product ${productId} from cart via API...`,
  );
  return new Promise((resolve) =>
    setTimeout(() => {
      const storedCart: string[] = JSON.parse(
        localStorage.getItem("cartItems") || "[]",
      );
      const pos = storedCart.indexOf(productId);
      if (pos !== -1) {
        storedCart.splice(pos, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(storedCart));
      resolve();
    }, 500),
  );
};

const clearCartAPI = async (): Promise<void> => {
  // Simulate an API call
  console.log(`Clearing cart via API...`);
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.setItem("cartItems", JSON.stringify([]));
      resolve();
    }, 500),
  );
};
// --- End Placeholder API Functions ---

export const useCart = () => {
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItemsAPI,
    initialData: [] as string[], // Provide an initial empty array to avoid undefined
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
  });

  const addProductMutation = useMutation<
    void,
    Error,
    string,
    { previousCart: string[] | undefined }
  >({
    mutationFn: addProductToCartAPI,
    onMutate: async (newProductId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<string[]>(["cart"]);

      // Optimistically update to the new value
      queryClient.setQueryData<string[]>(["cart"], (old) => [
        ...(old || []),
        newProductId,
      ]);

      return { previousCart };
    },
    onError: (err, newProductId, context) => {
      // If the mutation fails, use the context for a rollback
      queryClient.setQueryData(["cart"], context?.previousCart);
      console.error("Failed to add to cart:", err);
    },
    onSettled: () => {
      // Always refetch after error or success:
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeProductMutation = useMutation<
    void,
    Error,
    string,
    { previousCart: string[] | undefined }
  >({
    mutationFn: removeProductFromCartAPI,
    onMutate: async (productIdToRemove) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<string[]>(["cart"]);
      if (previousCart) {
        const pos = previousCart.indexOf(productIdToRemove);
        if (pos !== -1) {
          const newCart = [...previousCart];
          newCart.splice(pos, 1);
          queryClient.setQueryData<string[]>(["cart"], newCart);
        }
      }
      return { previousCart };
    },
    onError: (err, newProductId, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      console.error("Failed to remove from cart:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearCartMutation = useMutation<
    void,
    Error,
    void,
    { previousCart: string[] | undefined }
  >({
    mutationFn: clearCartAPI,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<string[]>(["cart"]);
      queryClient.setQueryData<string[]>(["cart"], []);
      return { previousCart };
    },
    onError: (err, newProductId, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
      console.error("Failed to clear cart:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const addProduct = (productId: string) => {
    addProductMutation.mutate(productId);
  };

  const removeProduct = (productId: string) => {
    removeProductMutation.mutate(productId);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  return {
    cartItems: cartItems,
    addProduct,
    removeProduct,
    clearCart,
    isCartLoading,
    isCartError,
    isAddingToCart: addProductMutation.isPending,
    isRemovingFromCart: removeProductMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
  };
};
