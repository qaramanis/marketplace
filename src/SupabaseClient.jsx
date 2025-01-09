import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)


export const productService = {
    // Get all products with shop information
    async getAllProducts() {
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                shop_products (
                    price,
                    stock,
                    shops (
                        name
                    )
                )
            `)
            .eq('shop_products.is_active', true);
        
        if (error) throw error;
        return data;
    },

    // Get a single product with all shop offerings
    async getProduct(productId) {
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                shop_products (
                    id,
                    price,
                    stock,
                    shops (
                        id,
                        name
                    )
                )
            `)
            .eq('id', productId)
            .single();

        if (error) throw error;
        return data;
    }
};

// Shop related functions
export const shopService = {
    // Register a new shop
    async registerShop(shopData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const apiKey = `sk_${uuidv4()}`; // Generate unique API key

        // Create shop entry
        const { data, error } = await supabase
            .from('shops')
            .insert({
                id: user.id, // Use the authenticated user's ID as shop ID
                name: shopData.name,
                api_key: apiKey,
                webhook_url: shopData.webhook_url,
                is_active: true
            })
            .select()
            .single();

        if (error) throw error;

        return {
            ...data,
            api_key: apiKey // Return the API key only once
        };
    },
    // Get shop profile
    async getShopProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
            .from('shops')
            .select('id, name, webhook_url, is_active, created_at')
            .eq('id', user.id)
            .single();

        if (error) throw error;
        return data;
    },

    // Update shop product
    async updateShopProduct(shopProductId, updates) {
        const { data, error } = await supabase
            .from('shop_products')
            .update(updates)
            .eq('id', shopProductId)
            .select();

        if (error) throw error;
        return data;
    }
};

// Order related functions
export const orderService = {
    // Create new order
    async createOrder(orderData, orderItems) {
        // Start a transaction
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        // Insert order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                ...orderData,
                user_id: user.id,
                status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // Insert order items
        const itemsWithOrderId = orderItems.map(item => ({
            ...item,
            order_id: order.id,
            status: 'pending'
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(itemsWithOrderId);

        if (itemsError) throw itemsError;

        return order;
    },

    // Get user orders
    async getUserOrders() {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    quantity,
                    unit_price,
                    status,
                    shop_products (
                        products (
                            name,
                            images
                        ),
                        shops (
                            name
                        )
                    )
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }
};

