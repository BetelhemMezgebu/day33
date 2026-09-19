import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === dish.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: dish.id,
                name: dish.name,
                price: dish.price,
                image: dish.image,
                quantity: 1,
              },
            ],
          };
        }),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== id
          ),
        })),

      clear: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "addis-eats-cart",
    }
  )
);

export default useCartStore;