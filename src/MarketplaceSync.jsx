// marketplaceSync.js
import { supabase } from './SupabaseClient';

export const marketplaceSync = {
    // Sync all products from all active shops
    async syncAllShops() {
        try {
            // Get all active shops
            const { data: shops, error: shopsError } = await supabase
                .from('shops')
                .select('*')
                .eq('is_active', true);

            if (shopsError) throw shopsError;

            console.log(`Starting sync for ${shops.length} shops`);

            for (const shop of shops) {
                await this.syncShop(shop.id);
            }

            console.log('Full marketplace sync completed');
        } catch (error) {
            console.error('Error in full marketplace sync:', error);
            throw error;
        }
    },

    // Sync a specific shop's products
    async syncShop(shopId) {
        try {
            console.log(`Syncing shop ${shopId}`);

            // Get shop products from shop's API
            const shopProducts = await this.fetchShopProducts(shopId);

            // Update products and their availability in marketplace
            for (const product of shopProducts) {
                await this.upsertProduct(shopId, product);
            }

            // Mark products not in the current sync as inactive
            await this.deactivateStaleProducts(shopId, shopProducts);

            console.log(`Shop ${shopId} sync completed`);
        } catch (error) {
            console.error(`Error syncing shop ${shopId}:`, error);
            throw error;
        }
    },

    // Fetch products from a shop's API
    async fetchShopProducts(shopId) {
        try {
            // Get shop details including API key
            const { data: shop, error: shopError } = await supabase
                .from('shops')
                .select('api_key, webhook_url')
                .eq('id', shopId)
                .single();

            if (shopError) throw shopError;

            // Make API call to shop's endpoint
            const response = await fetch(`${shop.webhook_url}/products`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${shop.api_key}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const products = await response.json();
            return products;
        } catch (error) {
            console.error(`Error fetching products from shop ${shopId}:`, error);
            throw error;
        }
    },

    // Update or insert a product and its shop-specific details
    async upsertProduct(shopId, shopProduct) {
        try {
            // First, upsert the base product
            const { data: product, error: productError } = await supabase
                .from('products')
                .upsert({
                    name: shopProduct.name,
                    description: shopProduct.description,
                    brand: shopProduct.manufacturer,
                    model: shopProduct.name,
                    images: [shopProduct.image_url],
                    category: shopProduct.category,
                    specifications: shopProduct.specifications || {}
                }, {
                    onConflict: 'name',
                    returning: true
                });

            if (productError) throw productError;

            // Then, update the shop-specific product details
            const { error: shopProductError } = await supabase
                .from('shop_products')
                .upsert({
                    product_id: product[0].id,
                    shop_id: shopId,
                    shop_product_id: shopProduct.id.toString(),
                    price: shopProduct.price,
                    stock: shopProduct.quantity,
                    is_active: true,
                    last_sync: new Date().toISOString()
                }, {
                    onConflict: 'shop_id,shop_product_id',
                    returning: true
                });

            if (shopProductError) throw shopProductError;
        } catch (error) {
            console.error(`Error upserting product from shop ${shopId}:`, error);
            throw error;
        }
    },

    // Mark products that weren't updated in this sync as inactive
    async deactivateStaleProducts(shopId, currentProducts) {
        try {
            const currentProductIds = currentProducts.map(p => p.id.toString());

            const { error } = await supabase
                .from('shop_products')
                .update({ is_active: false })
                .eq('shop_id', shopId)
                .not('shop_product_id', 'in', `(${currentProductIds.join(',')})`)
                .eq('is_active', true);

            if (error) throw error;
        } catch (error) {
            console.error(`Error deactivating stale products for shop ${shopId}:`, error);
            throw error;
        }
    },

    // Handle real-time updates from shops
    async handleShopUpdate(shopId, updateData) {
        try {
            const { type, product_id, updates } = updateData;

            switch (type) {
                case 'stock_update':
                    await this.updateProductStock(shopId, product_id, updates.stock);
                    break;
                case 'price_update':
                    await this.updateProductPrice(shopId, product_id, updates.price);
                    break;
                case 'product_update':
                    await this.upsertProduct(shopId, updates);
                    break;
                case 'product_delete':
                    await this.deactivateProduct(shopId, product_id);
                    break;
                default:
                    console.warn(`Unknown update type: ${type}`);
            }
        } catch (error) {
            console.error(`Error handling shop update for shop ${shopId}:`, error);
            throw error;
        }
    },

    // Update product stock
    async updateProductStock(shopId, productId, newStock) {
        const { error } = await supabase
            .from('shop_products')
            .update({ 
                stock: newStock,
                last_sync: new Date().toISOString()
            })
            .eq('shop_id', shopId)
            .eq('shop_product_id', productId);

        if (error) throw error;
    },

    // Update product price
    async updateProductPrice(shopId, productId, newPrice) {
        const { error } = await supabase
            .from('shop_products')
            .update({ 
                price: newPrice,
                last_sync: new Date().toISOString()
            })
            .eq('shop_id', shopId)
            .eq('shop_product_id', productId);

        if (error) throw error;
    },

    // Deactivate a product
    async deactivateProduct(shopId, productId) {
        const { error } = await supabase
            .from('shop_products')
            .update({ 
                is_active: false,
                last_sync: new Date().toISOString()
            })
            .eq('shop_id', shopId)
            .eq('shop_product_id', productId);

        if (error) throw error;
    }
};

// Set up periodic sync (e.g., every hour)
export const initializeSync = () => {
    // Initial sync
    marketplaceSync.syncAllShops();

    // Set up periodic sync
    setInterval(() => {
        marketplaceSync.syncAllShops();
    }, 60 * 60 * 1000); // Every hour
};