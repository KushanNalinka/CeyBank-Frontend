import axios from 'axios';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


const fetchFoods = async () => {
    try {
        // Fetch beverage data
        const response = await axios.get(`${API_URL}/beverages`);
        const data = response.data;

        // Map the API data to the desired structure
        return data.map(item => ({
            id: item.beverageId,
            code: item.code,
            name: item.name,
            image: item.image,
            description: item.description,
            slug: item.slug,
            price: item.price,
            portionType: item.portionType,
            itemCategory: item.itemCategory,
            availableForMeals: item.availableForMeals
        }));
    } catch (error) {
        console.error('Error fetching beverages:', error);
        return []; // Return an empty array in case of error
    }
};

export const products = await fetchFoods();
