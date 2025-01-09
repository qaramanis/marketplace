import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopService } from '../SupabaseClient';
import '../css/RegisterStore.css';

const RegisterShop = () => {
    const [formData, setFormData] = useState({
        name: '',
        webhook_url: ''
    });
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await shopService.registerShop(formData);
            setApiKey(result.api_key);
            // Store only returns a single time after registration
            alert('Please save your API key now. It won\'t be shown again.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="register-store">
            <h2 className="register-store-title">Register Your Shop</h2>
            <div className="register-content">
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Shop Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="webhook_url">Webhook URL</label>
                        <input
                            type="url"
                            id="webhook_url"
                            name="webhook_url"
                            value={formData.webhook_url}
                            onChange={handleChange}
                            placeholder="https://your-shop.com/webhooks/marketplace"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="register-button"
                    >
                        {loading ? 'Registering...' : 'Register Shop'}
                    </button>
                </form>

                {apiKey && (
                    <div className="api-key-container">
                        <h3>Your API Key (Save this securely)</h3>
                        <code className="api-key">{apiKey}</code>
                        <p className="api-key-warning">
                            This key will only be shown once. Please save it in a secure location.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterShop;